const Sequelize = require('sequelize').Sequelize;
const MedicalrecordsProcedures = require('../models/medicalNotesProcedures')

//agregar relacion entre notas medicas y procedimientos
exports.addMedicalnotesProcedures = async (req, res) =>{
    try {
       const result = await MedicalrecordsProcedures.create(req.body)
        res.status(201).json({
            status: 'succes'
           });
    }catch(err){
        res.send(err); 
    }
}

//obtener notas medicas y procedimientos relacionados
exports.getMedicalrecordsProcedures = async (req, res) => {
    try {
        const medicalrecordsProcedures = await MedicalrecordsProcedures.findAll(); 
        res.send(medicalrecordsProcedures);
    } catch (err) {
        res.send(err); 
    }
 }

 //obtener notas medicas y procedimientos relacionados por id
 exports.getMedicalrecordsProceduresById = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalrecordsProcedures = await MedicalrecordsProcedures.findByPk(id); 
        res.send(medicalrecordsProcedures);
    } catch (err) {
        res.send(err); 
    }
 }

  //obtener notas medicas y procedimientos relacionados por id de las notas
 exports.getMedicalrecordsProceduresByIdNotes = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalrecordsProcedures = await MedicalrecordsProcedures.findAll({
            where: {
                id_notas: id
            }
        }); 
        res.send(medicalrecordsProcedures);
    } catch (err) {
        res.send(err); 
    }
 }

   //obtener notas medicas y procedimientos relacionados por id de los procedimientos
   exports.getMedicalrecordsProceduresByIdProcedures = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalrecordsProcedures = await MedicalrecordsProcedures.findAll({
            where: {
                id_procedimiento: id
            }
        }); 
        res.send(medicalrecordsProcedures);
    } catch (err) {
        res.send(err);
    }
 }

 //eliminar notas medicas y procedimientos relacionados
 exports.deleteMedicalrecordsProcedures = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await MedicalrecordsProcedures.destroy({
          where: {
            id_nota_procedimiento:id
          }
       })
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
        res.send(err);
    }
}

 //eliminar notas medicas y procedimientos relacionados por id de las notas
 exports.deleteMedicalrecordsProceduresByIdNotes = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await MedicalrecordsProcedures.destroy({
          where: {
            id_notas: id
          }
       })
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
        res.send(err);
    }
}

 //eliminar notas medicas y procedimientos relacionados por id de los procedimientos
 exports.deleteMedicalrecordsProceduresByIdProcedures = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await MedicalrecordsProcedures.destroy({
          where: {
            id_procedimiento: id
          }
       })
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
        res.send(err);
    }
}

//actualizar notas medicas y procedimientos relacionados
exports.updateMedicalrecordsProcedures = async (req, res) => {
    const { id } = req.params;
    try {
        const  medicalrecordsProceduresUpdapted = await MedicalrecordsProcedures.update(req.body, {
            where: {
                id_nota_procedimiento:id
            }
        });
        res.status(201).json({
            status: 'succes'
        });
    } catch (err) {
        res.send(err);
    }
}