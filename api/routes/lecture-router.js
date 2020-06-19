const express = require('express');

const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const awsDeleteFile = require('../middleware/delete-aws-file');

const lectureController = require('../controllers/lecture-controller');
const messagesController = require('../controllers/messages-controller');

// lectures
router.route('/').post(authCheck, lectureController.lectureCreate);

router
  .route('/by_user')
  .get(authCheck, lectureController.getUserFavouriteLectures);

router.route('/all').get(lectureController.getAll);

router
  .route('/:lectureid')
  .get(authCheck, lectureController.getOne)
  .put(authCheck, lectureController.lectureUpdate)
  .delete(authCheck, lectureController.lectureRemove, awsDeleteFile);

router
  .route('/:lectureid/fav_lectures')
  .put(authCheck, lectureController.userAddFavourites)
  .delete(authCheck, lectureController.userDeleteFavourites);

router
  .route('/user/favourite')
  .get(authCheck, lectureController.getUserFavouriteLectures);

router
  .route('/bycategory/:categoryid')
  .get(authCheck, lectureController.getLecturesByCategory);

// messages
router
  .route('/:lectureid/messages')
  .post(authCheck, messagesController.messagesCreate);

module.exports = router;
