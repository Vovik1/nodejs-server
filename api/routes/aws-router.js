const express = require('express');
const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const awsController = require('../controllers/aws-controller');

router.post('/upload-url', awsController.uploadAvatar)

module.exports = router;