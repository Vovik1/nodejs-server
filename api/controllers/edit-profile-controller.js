const mongoose = require('mongoose');
const awsController = require('./aws-controller');

const User = mongoose.model('User');

const updateName = async (req, res) => {
  if (!req.body.oldData.email)
    return res.status(422).json({ message: 'Email address is required' });
  if (!req.body.newData.first_name || !req.body.newData.surName)
    return res
      .status(422)
      .json({ message: 'First name and surname are required' });
  try {
    const user = await User.findOne({ email: req.body.oldData.email });
    if (!user) {
      return res.json({ message: 'user does not exist' });
    }
    user.name = req.body.newData.first_name;
    user.surName = req.body.newData.surName;
    const response = await user.save();
    return res.status(200).json({
      message: 'user updated',
      data: {
        email: response.email,
        name: response.name,
        surName: response.surName,
        role: response.role,
      },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateEmail = async (req, res) => {
  if (!req.body.oldData.email)
    return res
      .status(422)
      .json({ message: 'Current email address is required' });
  if (!req.body.newData.email)
    return res.status(422).json({ message: 'Email address is required' });
  try {
    const userExist = await User.findOne({ email: req.body.newData.email });
    if (userExist) {
      return res.json({ message: 'Email is already used' });
    }
    const user = await User.findOne({ email: req.body.oldData.email });
    if (!user) {
      return res.json({ message: 'User was not found' });
    }
    user.email = req.body.newData.email;
    const response = await user.save();
    return res.status(200).json({
      message: 'user updated',
      data: {
        email: response.email,
        name: response.name,
        surName: response.surName,
        role: response.role,
      },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updatePassword = async (req, res) => {
  if (!req.body.oldData.email || !req.body.oldData.password)
    return res
      .status(422)
      .json({ message: 'Current email and password are required' });
  if (!req.body.newData.password)
    return res.status(422).json({ message: 'New password is required' });
  if (req.body.newData.password === req.body.oldData.password)
    return res
      .status(422)
      .json({ message: 'New password can not be the same as old password' });
  try {
    const user = await User.findOne({ email: req.body.oldData.email });
    if (!user) {
      return res.status(422).json({ message: 'User was not found' });
    }
    if (!user.validatePassword(req.body.oldData.password)) {
      return res.status(422).json({ message: 'Incorrect current password' });
    }
    user.setPassword(req.body.newData.password);
    user.save();
    return res.status(200).json({
      message: 'User updated',
      data: {
        email: user.email,
        name: user.name,
        surName: user.surName,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteAvatar = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.userData._id },
    { imageUrl: null }
  );
  const avatarId = user.imageUrl.split('/').splice(-1)[0];
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: avatarId,
  };

  awsController.s3.deleteObject(params, (err, data) => {
    if (data) {
      res.status(204).json(null);
    } else {
      res.status(422).json(err);
    }
  });
};

module.exports = { updateName, updateEmail, updatePassword, deleteAvatar };
