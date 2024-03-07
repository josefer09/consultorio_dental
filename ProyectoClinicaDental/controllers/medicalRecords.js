const Sequelize = require('sequelize').Sequelize;
const MedicalRecords = require('../models/medicalRecords')

//agregar historial clinico
exports.addMedicalRecord = async ( req, res) =>{
    try {
       const result = await MedicalRecords.create(req.body);
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
       res.send(err);
    }
}

//obtener historial clinico
exports.getMedicalRecord = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecords.findAll(); 
        res.send(medicalRecords);
    } catch (err) {
        res.send(err); 
    }
 }

//obtener historial clinico por id
exports.getMedicalRecordById = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalRecord = await MedicalRecords.findByPk(id); 
        res.send(medicalRecord);
    } catch (err) {
        res.send(err);
    }
 }

 //obtener historial clinico por paciente
exports.getMedicalRecordByIdPatient = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalRecord = await MedicalRecords.findAll({
            where: {
              id_paciente: id
            }
        });
        res.send(medicalRecord);
    } catch (err) {
        res.send(err);
    }
 }

 //eliminar historial clinico
 exports.deleteMedicalRecord = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await MedicalRecords.destroy({
          where: {
             id_historial:id
          }
       })
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
       res.send(err);
    }
}

 //eliminar historial por paciente
 exports.deleteMedicalRecordByIdPatient = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await MedicalRecords.destroy({
          where: {
             id_paciente:id
          }
       })
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
        res.send(err);
    }
}

//actualizar historial
exports.updateMedicalRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const  medicalRecordUpdapted = await MedicalRecords.update(req.body, {
            where: {
                id_historial:id
            }
        });
        res.status(201).json({
            status: 'succes'
        });
    } catch (err) {
        res.send(err);
    }
}


