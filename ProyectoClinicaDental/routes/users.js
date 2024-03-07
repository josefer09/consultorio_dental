// user.js routes
const express = require('express');
const userController = require('../controllers/user.js');
const userModel = require('../models/user.js');
const authController = require('../controllers/auth.js');

const router = express.Router();
router.route('/').post(userController.addUser);

router.use(authController.authorizeUser);
router
.route('/')
.get(userController.getUsers)

router
.route('/:id')
.get(userController.getUserById)
.delete(userController.deleteUser)
.patch(userController.updateUser);

router
.route('/email/:email')
.get(userController.getUserByEmail)


module.exports = router;