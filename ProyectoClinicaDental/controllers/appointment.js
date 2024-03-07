// AppointmentController
const Sequelize = require("sequelize").Sequelize;
const appointmentModel = require("../models/appointment");
const userController = require('./user');

// Add appointment
exports.addAppointment = async (req, res) => {
  try {
    const answer = await appointmentModel.create(req.body);
    res.status(201).json({
      status: 'succes'
     });
  } catch (err) {
    res.send(err);
  }
};

//Get appointment
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;
    try {
        const appointmentCreated = await appointmentModel.findByPk(id); 
        res.send(appointmentCreated);
    } catch (error) {
        res.send(error);
    }
};

// Trea todos los appointment
exports.getAppointments = async (req, res) => {
  try {
    const appointmentCreated = await appointmentModel.findAll(); 
    res.send(appointmentCreated)
} catch (error) {
    res.send(error) 
}
};


// Recibe de parametros el id a modificar, y un objeto con la informacion a actualizar
// Update appointment
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
    try {
        const appointmentCreated = await appointmentModel.update(req.body, {
            where: {
                id_appointment:id
            }
        });
        res.status(201).json({
            status: 'succes'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}


// Delete appointment
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
    try{
      const deleted =  await appointmentModel.destroy({
          where: {
            id_appointment:id
          }
       })
       res.status(201).json({
        status: 'succes'
       })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};