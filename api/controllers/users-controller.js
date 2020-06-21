const mongoose = require('mongoose');

const User = mongoose.model('User');

async function getAllUsers(req, res) {
  if (req.userData.role !== 'admin') {
    res.status(401).json({ message: 'Only for admin' });
  }
  try {
    const docs = await User.find();
    const users = docs.map((doc) => {
      return {
        id: doc._id,
        email: doc.email,
        name: doc.name,
        surName: doc.surName,
        role: doc.role,
        imageUrl: doc.image,
      };
    });
    res.status(200).json(users);
  } catch (err) {
    await res.json(err);
  }
}

async function removeUser(req, res) {
  if (req.userData.role === 'admin' || req.userData._id === req.params.id) {
    try {
      await User.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) {
          return res.send({ message: 'Delete failed' });
        } else {
          return res.send({ message: 'Deleted', id: req.params.id });
        }
      });
    } catch (err) {
      await res.json(err);
    }
  } else {
    return res.status(403).json({ message: 'You dont have permissions' });
  }
}

async function updateUser(req, res) {
  if (req.userData.role !== 'admin') {
    res.status(401).json({ message: 'Only for admin' });
  }
  await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body.user,
    { new: true },
    async (err, doc) => {
      if (err) {
        const userExist = await User.findOne({ email: req.body.user.email });
        if (userExist) {
          return res
            .status(422)
            .json({ email: 'User with this email is already exist' });
        } else {
          return res.send({ message: 'Update failed' });
        }
      } else {
        res.send({
          message: 'Updated',
          user: {
            id: doc._id,
            email: doc.email,
            name: doc.name,
            surName: doc.surName,
            role: doc.role,
          },
        });
      }
    }
  );
}

async function addUser(req, res) {
  const userExist = await User.findOne({ email: req.body.user.email });
  if (userExist) {
    return res
      .status(422)
      .json({ email: 'User with this email is already exist' });
  }

  if (req.userData.role !== 'admin') {
    res.status(401).json({ message: 'Only for admin' });
  }
  const { name, surName, email, role } = req.body.user;
  const user = new User({ name, surName, email, role });
  user.setPassword(req.body.user.password);
  await user.save().then((userData) => {
    res.send({
      message: 'Added',
      user: {
        id: userData._id,
        email: userData.email,
        name: userData.name,
        surName: userData.surName,
        role: userData.role,
      },
    });
  });
}

module.exports = { getAllUsers, removeUser, updateUser, addUser };
