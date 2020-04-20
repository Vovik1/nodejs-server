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
        if(req.err){
            res.json(err);
        }

        if(req.user.hasOwnProperty(`token`)){
            res.setHeader('Access-Token', req.user.token);
        }
        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            surName: req.user.surName,
            email: req.user.email,
            role: req.user.role
        });
    });

router.get('/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

router.get(`/facebook/callback`,
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    (req, res)  => {
        if(req.err){
            res.json(err);
        }
        res.setHeader('Access-Token', req.user.token);
        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            surName: req.user.surName,
            email: req.user.email,
            role: req.user.role
        });
    });


module.exports = router;