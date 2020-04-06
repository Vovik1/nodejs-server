const express = require('express');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const lectureController = require('../controllers/lecture-controller');

router.get('/', authCheck, lectureController.getAll);

router.post('/create', authCheck, lectureController.create);


router.put('/update', lectureController.update);


router.delete('/delete', lectureController.remove);

module.exports = router;