// role.js routes
const express = require('express');
const roleController = require('../controllers/role.js');
const roleModel = require('../models/role.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.use(authController.authorizeUser);
router
.route('/')
.get(roleController.getRoles)
.post(roleController.addRole);

router
.route('/:id')
.get(roleController.getRoleById)
.delete(roleController.deleteRole)
.patch(roleController.updateRole);


module.exports = router;