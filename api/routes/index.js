const express = require('express');
const passport = require('passport');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');

const authController = require('../controllers/auth-controller');
const lectureController = require('../controllers/lecture-controller');
const awsController = require('../controllers/aws-controller');
const messagesController = require('../controllers/messages-controller');

const mongoose = require('mongoose');
const User = mongoose.model('User');


//lectures
router
    .route('/lectures/all')
    .get(lectureController.getAll)

router
    .route('/lectures')
    .get(authCheck, lectureController.getAllUsersLectures)
    .post(authCheck, lectureController.create);


router
    .route('/lectures/:lectureid')
    .get(authCheck, lectureController.getOne)    
    .put(authCheck, lectureController.update)
    .delete(authCheck, lectureController.remove);

// messages
router
  .route('/lectures/:lectureid/messages')
  .post(authCheck, messagesController.messagesCreate);

// router
//   .route('/lectures/:lecturesid/messages/:messageid')
//   .get(ctrlReviews.reviewsReadOne)
//   .put(ctrlReviews.reviewsUpdateOne)
//   .delete(ctrlReviews.reviewsDeleteOne);


//aws-s3
router
    .route('/aws/upload-avatar')
    .post(authCheck, awsController.uploadAvatar);

//auth
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

router.post(`/isAdmin`, (req, res) => {
    const user = new User();
    user.email = req.body.email;
    user.isAdmin(res);
})

module.exports = router;
