const express = require('express');
const passport = require('passport');

const router = new express.Router();

const authController = require('../controllers/auth-controller');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/googlefacebook', authController.googleFacebookSignIn);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

function googleFacebookCallback(req, res) {
  if (req.err) {
    return res.status(500).json(req.err);
  }

  res.setHeader('Access-Token', req.user.token);

  return res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    surName: req.user.surName,
    email: req.user.email,
    role: req.user.role,
  });
}

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleFacebookCallback
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  `/facebook/callback`,
  passport.authenticate('facebook', {
    failureRedirect: '/',
  }),
  googleFacebookCallback
);

module.exports = router;
