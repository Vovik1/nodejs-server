const express = require('express');

const router = new express.Router();
const authCheck = require('../middleware/auth-check');
const usersController = require('../controllers/users-controller');

router
  .route('/all')
  .get(authCheck, usersController.getAllUsers)
  .post(authCheck, usersController.addUser);
router
  .route('/:id')
  .delete(authCheck, usersController.removeUser)
  .put(authCheck, usersController.updateUser);

module.exports = router;
