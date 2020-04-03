const express = require('express');
const router = new express.Router();
const lectureController = require('../controllers/lecture-controller');

router.get('/', lectureController.getAll);


router.post('/create', lectureController.create);


module.exports = router;