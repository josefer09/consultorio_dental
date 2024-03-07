const Sequelize = require("sequelize").Sequelize;
//Assigment of the User Model to the controller
const roleModel = require("../models/role");

// Método para agregar un rol de forma asíncrona
exports.addRole = async (req, res) => {
  try {
    const answer = await roleModel.create(req.body);
    res.status(201).json({
      status: "succes",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await roleModel.findAll();
    res.send(roles);
  } catch (error) {
    res.send(error);
  }
};

// Método para obtener un rol por su ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const roleCreated = await roleModel.findByPk(id);
    res.send(roleCreated);
  } catch (error) {
    res.send(error);
  }
};

// Metodo para Actualizar nombre de rol por medio del id
exports.updateRole = async (req, res) => {
  const { id } = req.params;
    try {
        const userRoleUpdate = await roleModel.update(req.body, {
            where: {
                id_userRole:id
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

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await roleModel.destroy({
      where: {
        id_userRole: id,
      },
    });
    res.status(201).json({
      status: "succes",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
