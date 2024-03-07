// medicalRecords.js routes
const express = require('express');
const medialRecordController = require('../controllers/medicalRecords.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.use(authController.authorizeUser);
router
.route('/')
.get(medialRecordController.getMedicalRecord)
.post(medialRecordController.addMedicalRecord);

router
.route('/:id')
.get(medialRecordController.getMedicalRecordById)
.delete(medialRecordController.deleteMedicalRecord)
.patch(medialRecordController.updateMedicalRecord);

router
.route('/idPatient/:id')
.get(medialRecordController.getMedicalRecordByIdPatient)
.delete(medialRecordController.deleteMedicalRecordByIdPatient);

module.exports = router;