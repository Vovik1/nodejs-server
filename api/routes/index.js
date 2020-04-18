const express = require('express');
const passport = require('passport');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const lectureRouter = require("./lecture-router")

const authController = require('../controllers/auth-controller');
const awsController = require('../controllers/aws-controller');
const editProfileController = require('../controllers/edit-profile-controller');
const categoryController = require('../controllers/category-controller');
const reviewController = require('../controllers/review-controller');


const mongoose = require('mongoose');
const User = mongoose.model('User');


// router
//   .route('/lectures/:lecturesid/messages/:messageid')
//   .get(ctrlReviews.reviewsReadOne)
//   .put(ctrlReviews.reviewsUpdateOne)
//   .delete(ctrlReviews.reviewsDeleteOne);

// reviews
router
    .route('/reviews')
    .get(reviewController.getReviews);


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
        if(req.err){
            res.json(err);
        }

        if(req.user.hasOwnProperty(`token`)){
            res.setHeader('Access-Token', req.user.token);
        }
        res.status(200).json({
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
    if(req.err){
        res.json(err);
    }
        res.setHeader('Access-Token', req.user.token);
        res.status(200).json({
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
            surName: req.user.surName
        });
    });

// profile updating

router
    .route('/editName')
    .put(authCheck, editProfileController.updateName);

router
    .route('/editEmail')
    .put(authCheck, editProfileController.updateEmail);

router.use('/lectures', lectureRouter)
module.exports = router;
