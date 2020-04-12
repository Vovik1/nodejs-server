const express = require('express');
const passport = require('passport');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const authController = require('../controllers/auth-controller');
const lectureController = require('../controllers/lecture-controller');
const awsController = require('../controllers/aws-controller');


//lectures
router
    .route('/lecture')
    .get(lectureController.getAll)
    .post(authCheck, lectureController.create)
    .put(authCheck, lectureController.update)
    .delete(authCheck, lectureController.remove);

//aws-s3
router
    .route('/aws/upload-avatar')
    .post(awsController.uploadAvatar)

//auth
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

router.get('/signin/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res)  => {
        res.json(req.user);
    });

router.get('/signin/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

router.get(`/facebook/callback`,
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    (req, res)  => {
        res.json(req.user);
    });

router.post(`/isAdmin`, (req, res) => {
    try{
        const user = new User();
        user.email = req.body.email;
        const role = user.isAdmin();
        console.log(role);
        //res.json({role:role});
    }catch (err) {
        res.json(err);
    }
})

module.exports = router;
