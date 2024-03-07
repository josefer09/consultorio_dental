const Sequelize = require("sequelize").Sequelize;
//Assigment of the User Model to the controller
const specialtyModel = require("../models/specialty.js");

// Método para agregar un rol de forma asíncrona
exports.addSpecialty = async (req, res) => {
  try {
    const answer = await specialtyModel.create(req.body);
    res.status(201).json({
     status: 'succes'
    })
 } catch (err) {
    res.status(400).json({
       status: 'fail',
       message: err
    });
}
};

exports.getSpecialty = async (req, res) => {
  try {
    const specialty = await specialtyModel.findAll();
    res.send(specialty);
  } catch (error) {
    res.send(error);
  }
};

// Método para obtener un rol por su ID
exports.getSpecialtyById = async (req, res) => {
  const { id } = req.params;
    try {
        const specialty = await specialtyModel.findByPk(id); 
        res.send(specialty);
    } catch (error) {
        res.send(error);
    }
};

// Metodo para Actualizar nombre de rol por medio del id
exports.updateSpecialty = async (req, res) => {
  const { id } = req.params;
    try {
        const specialtyCreated = await specialtyModel.update(req.body, {
            where: {
                id_userSpecialty:id
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
};

exports.deleteSpecialty = async (req, res) => {
  const { id } = req.params;
    try{
      const deleted =  await specialtyModel.destroy({
          where: {
            id_userSpecialty:id
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
