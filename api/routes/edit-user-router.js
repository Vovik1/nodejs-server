const express = require('express');

const router = new express.Router();
const authCheck = require('../middleware/auth-check');

const editProfileController = require('../controllers/edit-profile-controller');

router.route('/editName').put(authCheck, editProfileController.updateName);

router.route('/editEmail').put(authCheck, editProfileController.updateEmail);

router
  .route('/deleteAvatar')
  .delete(authCheck, editProfileController.deleteAvatar);

router
  .route('/editPassword')
  .put(authCheck, editProfileController.updatePassword);

module.exports = router;
