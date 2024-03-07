const Sequelize = require('sequelize').Sequelize;
const MedicalNotes = require('../models/medicalNotes')

//agregar notas medicas
exports.addMedicalNotes = async (req, res) =>{
    try {
       const result = await MedicalNotes.create(req.body);
       res.status(201).json({
        status: 'succes'
    });
    }catch(err){
       res.send(err);
    }
}

//obtener notas medicas
exports.getMedicalNotes= async (req, res) => {
    try {
        const medicalNotes = await MedicalNotes.findAll(); 
        res.send(medicalNotes);
    } catch (err) {
        res.send(err);
    }
 }

 //obtener notas medicas por id
exports.getMedicalNotesById= async (req, res) => {
    const { id } = req.params;
    try {
        const medicalNotes = await MedicalNotes.findByPk(id); 
        res.send(medicalNotes);
    } catch (err) {
        res.send(err);
    }
 }

 //obtener notas medicas por el procedimiento
 exports.getMedicalNotesByIdProcedure= async (req, res) => {
    const { id } = req.params;
    try {
        const medicalNotes = await MedicalNotes.findAll({
            where: {
                id_procedimiento: id
            }
        });
        res.send(medicalNotes);
    } catch (err) {
        res.send(err);
    }
 }

  //obtener notas medicas por la cita
  exports.getMedicalNotesByIdAppointment= async (req, res) => {
    const { id } = req.params;
    try {
        const medicalNotes = await MedicalNotes.findAll({
            where: {
                id_cita: id
            }
        });
        res.send(medicalNotes);
    } catch (err) {
        res.send(err); 
    }
 }
 
   //obtener notas medicas por paciente
   exports.getMedicalNotesByIdPatient= async (req, res) => {
    const { id } = req.params;
    try {
        const medicalNotes = await MedicalNotes.findAll({
            where: {
                id_paciente: id
            }
        });
        res.send(medicalNotes);
    } catch (err) {
        res.send(err); 
    }
 }

    //obtener notas medicas por empleado
    exports.getMedicalNotesByIdEmployee= async (req, res) => {
        const { id } = req.params;
        try {
            const medicalNotes = await MedicalNotes.findAll({
                where: {
                    id_empleado: id
                }
            });
            res.send(medicalNotes);
        } catch (err) {
            res.send(err);  
        }
     }

 //eliminar notas medicas
 exports.deleteMedicalNotes= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await MedicalNotes.destroy({
            where: {
                id_nota: id
            }
        });
        res.status(201).json({
            status: 'succes'
           });
    } catch (err) {
        res.send(err);
    }
 }

 //eliminar notas medicas por procedimiento
 exports.deleteMedicalNotesByIdProcedure= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await MedicalNotes.destroy({
            where: {
                id_procedimiento: id
            }
        });
        res.status(201).json({
            status: 'succes'
           });
    } catch (err) {
        res.send(err);
    }
 }

  //eliminar notas medicas por la cita
  exports.deleteMedicalNotesByIdAppointment= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await MedicalNotes.destroy({
            where: {
                id_cita: id
            }
        });
        res.status(201).json({
            status: 'succes'
           });
    } catch (err) {
        res.send(err);
    }
 }

   //eliminar notas medicas por paciente
   exports.deleteMedicalNotesByIdPatient= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await MedicalNotes.destroy({
            where: {
                id_paciente: id
            }
        });
        res.status(201).json({
            status: 'succes'
           });
    } catch (err) {
        res.send(err);
    }
 }

 //actualizar notas medicas
 exports.updateMedicalNotes = async (req, res) => {
    const { id } = req.params;
    try {
        const  medicalNotesUpdapted = await MedicalNotes.update(req.body, {
            where: {
                id_nota:id
            }
        });
        res.status(201).json({
            status: 'succes'
        });
    } catch (err) {
        res.send(err);
    }
}