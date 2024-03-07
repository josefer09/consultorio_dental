const {DataTypes} = require('sequelize');
const sequelize = require('../utils/db');

// Modelo para los roles
const userRole = sequelize.define('userRole', {
    id_userRole: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'name_UNIQUE',
      },
    }, {
        tableName: 'userroles', // Nombre de la tabla
        timestamps: false, // No columnas time
    });

module.exports = userRole;