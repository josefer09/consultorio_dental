// EmpleadoModel
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
// Instancia de mis otros modelos
const roleModel = require('./role');
const especialtyModel = require('./specialty');
const userModel = require('./user');

// Modelo para tabla personal (empleado)

const employee = sequelize.define('employee', {
    id_employee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licenseNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_userRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      id_userSpecialty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
      tableName: 'employees', // Nombre de la tabla
      timestamps: false, // No columnas time
});

employee.belongsTo(roleModel, { foreignKey: 'id_userRole' });
employee.belongsTo(especialtyModel, { foreignKey: 'id_userSpecialty' });
employee.belongsTo(userModel, { foreignKey: 'id_userSpecialty' });


module.exports = employee;
