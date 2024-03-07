// medicalNotesProcedures.js routes
const express = require('express');
const medicalNotesProceduresController = require('../controllers/medicalNotesProcedures.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.use(authController.authorizeUser);
router
.route('/')
.get(medicalNotesProceduresController.getMedicalrecordsProcedures)
.post(medicalNotesProceduresController.addMedicalnotesProcedures);

router
.route('/:id')
.get(medicalNotesProceduresController.getMedicalrecordsProceduresById)
.delete(medicalNotesProceduresController.deleteMedicalrecordsProcedures)
.patch(medicalNotesProceduresController.updateMedicalrecordsProcedures);

router
.route('/idNotes/:id')
.get(medicalNotesProceduresController.getMedicalrecordsProceduresByIdNotes)
.delete(medicalNotesProceduresController.deleteMedicalrecordsProceduresByIdNotes);

router
.route('/idProcedures/:id')
.get(medicalNotesProceduresController.getMedicalrecordsProceduresByIdProcedures)
.delete(medicalNotesProceduresController.deleteMedicalrecordsProceduresByIdProcedures);

module.exports = router;