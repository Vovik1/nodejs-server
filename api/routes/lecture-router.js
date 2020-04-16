const express = require('express');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');

const lectureController = require('../controllers/lecture-controller');
const messagesController = require('../controllers/messages-controller');

//lectures
router
    .route('/')
    .get(authCheck, lectureController.getAllUsersLectures)
    .post(authCheck, lectureController.create);
    
router
    .route('/all')
    .get(lectureController.getAll)

// router
//     .route('/:categoryid')
//     .get(lectureController.getLecturesByCategory);




router
    .route('/:lectureid')
    .get(authCheck, lectureController.getOne)    
    .put(authCheck, lectureController.update)
    .delete(authCheck, lectureController.remove);

// messages
router
  .route('/:lectureid/messages')
  .post(authCheck, messagesController.messagesCreate);

module.exports = router;
