const express = require('express');
const passport = require('passport');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const lectureRouter = require('./lecture-router');
const userRouter = require('./user-router');
const editUserRouter = require('./edit-user-router');

const awsController = require('../controllers/aws-controller');
const awsVideoController = require('../controllers/aws-video-controller');
const categoryController = require('../controllers/category-controller');
const reviewController = require('../controllers/review-controller');



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

router
    .route('/aws/upload-video')
    .post(authCheck, awsVideoController.uploadVideo);


router.use('/lectures', lectureRouter);
router.use('/user', userRouter);
router.use('/edit', editUserRouter);
module.exports = router;
