// appointment.js routes
const express = require('express');
const appointmentController = require('../controllers/appointment.js');
const appointmentModel = require('../models/appointment.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.use(authController.authorizeUser);
router
.route('/')
.get(appointmentController.getAppointments)
.post(appointmentController.addAppointment);

router
.route('/:id')
.get(appointmentController.getAppointmentById)
.delete(appointmentController.deleteAppointment)
.patch(appointmentController.updateAppointment);


module.exports = router;