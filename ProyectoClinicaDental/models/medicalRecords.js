const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const patients = require('./patients');

//Medica Records 

const medicalRecords = sequelize.define('historiales_clinicos', {
    id_historial: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        primaryKey: true,
        autoIncrement: true
    },
    alergias: {
        type: DataTypes.STRING,
        allowNull: true
    },
    procedimientos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otros: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pacientes', 
            key: 'id_paciente' 
        }
    }
}, {tableName: 'historiales_clinicos',
    timestamps: false });

medicalRecords.belongsTo(patients, { foreignKey: 'id_paciente', as: 'patient'});

module.exports = medicalRecords; 