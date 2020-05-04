const express = require('express');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');

const lectureController = require('../controllers/lecture-controller');
const messagesController = require('../controllers/messages-controller');

//lectures
router
    .route('/')
    // .get(authCheck, lectureController.getAllUsersLectures)
    .post(authCheck, lectureController.lectureCreate);

router
    .route('/by_user')
    .get(authCheck, lectureController.getUserFavouriteLectures);
    
router
    .route('/all')
    .get(lectureController.getAll)

router
    .route('/:lectureid')
    .get(authCheck, lectureController.getOne)    
    .put(authCheck, lectureController.lectureUpdate)
    .delete(authCheck, lectureController.lectureRemove);

router
    .route('/:lectureid/add_to_favs')
    .put(authCheck, lectureController.userAddFavourites);

router
    .route('/user/favourite')
    .get(authCheck, lectureController.getUserFavouriteLectures);



router
    .route('/bycategory/:categoryid')
    .get(authCheck, lectureController.getLecturesByCategory)

// router
//     .route('/bycategory/:categoryid')
//     .get(authCheck, lectureController.getLecturesByCategory)

// messages
router
  .route('/:lectureid/messages')
  .post(authCheck, messagesController.messagesCreate);

module.exports = router;
