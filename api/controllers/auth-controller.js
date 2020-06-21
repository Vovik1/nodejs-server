const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const signUp = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(422).json({ message: 'Email and password are required' });
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res
        .status(422)
        .json({ email: 'User with this email is already exist' });
    const user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.role = 'student';
    user.surName = '';
    user.setPassword(req.body.password);
    const response = await user.save();
    return res.status(201).json({
      message: 'user created',
      user: {
        _id: response._id,
        name: response.name,
        surName: response.surName,
        email: response.email,
        role: response.role,
        imageUrl: '',
      },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const signIn = (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(422).json({ message: 'email and password are required' });
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json(err);
    if (user) {
      res.setHeader('Access-Token', user.generateJwt());
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        surName: user.surName,
        role: user.role,
        imageUrl: user.imageUrl,
      });
    }
    return res.status(401).json({password: 'Email or password is invalid'});
  })(req, res);
  return null;
};

const googleFacebookSignIn = async (req, res) => {
  const {
    body: { email, name, surName, imageUrl },
  } = req;
  if (!email || !name || !surName || !imageUrl)
    return res.status(422).json({ message: 'You have missed some fields' });
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.setHeader('Access-Token', userExist.generateJwt());
      return res.status(200).json({
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        surName: userExist.surName,
        role: userExist.role,
        imageUrl: userExist.imageUrl,
      });
    }
    const user = new User();
    user.email = email;
    user.name = name;
    user.role = 'student';
    user.surName = surName;
    user.imageUrl = imageUrl;
    const response = await user.save();
    res.setHeader('Access-Token', user.generateJwt());
    return res.status(201).json({
      _id: response._id,
      name: response.name,
      surName: response.surName,
      email: response.email,
      role: response.role,
      imageUrl: response.imageUrl,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { signUp, signIn, googleFacebookSignIn };
