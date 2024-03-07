const {DataTypes} = require('sequelize');
const sequelize = require('../utils/db');

// Modelo para los roles
const UserSpecialty = sequelize.define('specialty', {
    id_userSpecialty: {
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
        tableName: 'userspecialtys', // Nombre de la tabla
        timestamps: false, // No columnas time
});

module.exports = UserSpecialty;