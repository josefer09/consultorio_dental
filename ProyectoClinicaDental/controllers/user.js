const Sequelize = require("sequelize").Sequelize;
const user = require("../models/user");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

//agregar usuario
exports.addUser = async (req, res) => {
  try {
    const answer = await user.create(req.body);
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

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
      const userConsulted = await user.findOne({
          where: {
            email: email
          }
      });
      res.send(userConsulted);
  } catch (err) {
      res.send(err);
  }
}

// ejempl del middleware de errores
//obtener usario por id
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userCreated = await user.findByPk(id);
  if (!userCreated) {
    return next(new AppError("No se encontro usario con esa id", 404));
  }
  res.send(userCreated);
});

//eliminar usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await user.destroy({
      where: {
        id_user: id,
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

//actualizar usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdapted = await user.update(req.body, {
      where: {
        id_user: id,
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
