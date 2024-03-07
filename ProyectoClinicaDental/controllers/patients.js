const Sequelize = require('sequelize').Sequelize;
const Patients = require('../models/patients')

//agregar paciente
exports.addPatients = async (req, res) =>{
    try {
        const answer = await Patients.create(req.body);
        res.status(201).json({
            status: 'succes'
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

//obtener pacientes
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patients.findAll(); 
        res.send(patients);
    } catch (err) {
        res.send(err);
    }
 }

 //obtener paciente por id
exports.getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patients.findByPk(id); 
        res.send(patient);
    } catch (err) {
        res.send(err);
    }
}

//obtener procedimiento por nombre
exports.getPatientByName = async (req, res) => {
    const { name } = req.params;
    try {
        const patient = await Patients.findOne({
            where: {
              nombre: name
            }
        });
        res.send(patient);
    } catch (err) {
        res.send(err);
    }
 }

 //obetener paciente por id de usuario
 exports.getPatientByIdUser = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patients.findOne({
            where: {
                id_user: id
            }
        });
        res.send(patient);
    } catch (err) {
        res.send(err);
    }
 }

  //eliminar paciente
exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await Patients.destroy({
          where: {
             id_paciente:id
          }
       })
       res.status(201).json({
        status: 'succes'
       })
    }catch(err){
        res.send(err);
    }
}

  //eliminar paciente por nombre
  exports.deletePatientByName = async (req, res) => {
    const { name } = req.params;
    try{
      const deleted =  await Patients.destroy({
          where: {
             nombre:name
          }
       })
       res.status(201).json({
        status: 'succes'
       })
    }catch(err){
        res.send(err);
    }
}
//eliminar paciente por id usuario
exports.deletePatientByIdUser = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await Patients.destroy({
          where: {
            id_user:id
          }
       })
       res.status(201).json({
        status: 'succes'
       })
    }catch(err){
        res.send(err);
    }
}

//actualizar paciente
exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const  patientUpdapted = await Patients.update(req.body, {
            where: {
                id_paciente:id
            }
        });
        res.status(201).json({
            status: 'succes'
        })
    } catch (err) {
        res.send(err);
    }
}