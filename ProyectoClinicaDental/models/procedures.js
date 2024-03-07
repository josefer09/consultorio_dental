const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

//Procedures 

const procedures = sequelize.define('procedimientos', {
    id_procedimiento: {
        type: DataTypes.INTEGER, // Cambia a DataTypes.INTEGER
        allowNull: true, 
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING, // Cambia a DataTypes.STRING
        allowNull: false,
        unique: true
    },
    precio: {
        type: DataTypes.FLOAT, // Cambia a DataTypes.FLOAT
        allowNull: false
    },
    descuento: {
        type: DataTypes.INTEGER, // Cambia a DataTypes.INTEGER
        allowNull: true
    },
}, {tableName: 'procedimientos',
    timestamps: false });

module.exports = procedures;
5