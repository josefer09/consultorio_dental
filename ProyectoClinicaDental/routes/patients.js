// patients.js routes
const express = require('express');
const patientController = require('../controllers/patients.js');
const patientsModel = require('../models/patients.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.use(authController.authorizeUser);
router
.route('/')
.get(patientController.getPatients)
.post(patientController.addPatients);

router
.route('/:id')
.get(patientController.getPatientById)
.delete(patientController.deletePatient)
.patch(patientController.updatePatient);

router
.route('/name/:name')
.get(patientController.getPatientByName)
.delete(patientController.deletePatientByName);

router
.route('/idUser/:id')
.get(patientController.getPatientByIdUser)
.delete(patientController.deletePatientByIdUser);

module.exports = router;