const express = require('express');
const passport = require('passport');
const router = new express.Router();
const authController = require('../controllers/auth-controller');

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

router.get('/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res)  => {
        res.json(req.user);
    });

router.get('/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

router.get(`/facebook/callback`,
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    (req, res)  => {
        res.json(req.user);
    });


module.exports = router;