const express = require('express');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const lectureController = require('../controllers/lecture-controller');

router.get('/', lectureController.getAll);

router.post('/create', authCheck, lectureController.create);


router.put('/update', authCheck, lectureController.update);


router.delete('/delete', authCheck, lectureController.remove);

module.exports = router;