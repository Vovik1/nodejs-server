const express = require('express');
const passport = require('passport');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');

const authController = require('../controllers/auth-controller');
const lectureController = require('../controllers/lecture-controller');
const awsController = require('../controllers/aws-controller');
const messagesController = require('../controllers/messages-controller');
const editProfileController = require('../controllers/edit-profile-controller');
const categoryController = require('../controllers/category-controller');


const mongoose = require('mongoose');
const User = mongoose.model('User');


//lectures
router
    .route('/lectures/all')
    .get(lectureController.getAll)

router
    .route('/lectures/:categoryid')
    .get(lectureController.getLecturesByCategory);

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

// categories
router
    .route('/categories/all')
    .get(categoryController.getAllCategories);



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
        res.setHeader('Access-Token', req.user.token);
        res.json({
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin
        });
    });

router.get('/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

router.get(`/facebook/callback`,
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    (req, res)  => {
        res.setHeader('Access-Token', req.user.token);
        res.json({
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
            surName: req.user.surName
        });
    });

// profile updating

router
    .route('/editProfile')
    .put(authCheck, editProfileController.updateProfile);

module.exports = router;
