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
    return res.status(401).json(info);
  })(req, res);
  return null;
};

module.exports = { signUp, signIn };
