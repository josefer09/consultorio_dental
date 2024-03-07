const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');


router.
route('/')
.post(authController.authenticateUser);

module.exports = router;
