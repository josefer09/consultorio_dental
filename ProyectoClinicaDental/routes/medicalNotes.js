// medicalNotes.js routes
const express = require('express');
const medicalNotesController = require('../controllers/medicalNotes.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.use(authController.authorizeUser);
router
.route('/')
.get(medicalNotesController.getMedicalNotes)
.post(medicalNotesController.addMedicalNotes);

router
.route('/:id')
.get(medicalNotesController.getMedicalNotesById)
.delete(medicalNotesController.deleteMedicalNotes)
.patch(medicalNotesController.updateMedicalNotes);

router
.route('/idProcedure/:id')
.get(medicalNotesController.getMedicalNotesByIdProcedure)
.delete(medicalNotesController.deleteMedicalNotesByIdProcedure);

router
.route('/idAppointment/:id')
.get(medicalNotesController.getMedicalNotesByIdAppointment)
.delete(medicalNotesController.deleteMedicalNotesByIdAppointment);

router
.route('/idPatient/:id')
.get(medicalNotesController.getMedicalNotesByIdPatient)
.delete(medicalNotesController.deleteMedicalNotes);

router
.route('/idEmployee/:id')
.get(medicalNotesController.getMedicalNotesByIdEmployee);

module.exports = router;