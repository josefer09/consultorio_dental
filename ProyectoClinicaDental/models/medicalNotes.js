const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const procedures = require('./procedures');
const appointment = require('./appointment');
const patient = require('./patients');
const employee = require('./employee');

//medical notes 

const medicalNotes = sequelize.define('notas_medicas', {
    id_nota: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        primaryKey: true,
        autoIncrement: true
    },
    nota: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_procedimiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'procedimientos', 
            key: 'id_procedimiento' 
        }
    },
    id_appointment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'appointments', 
            key: 'id_appointment' 
        }
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pacientes', 
            key: 'id_paciente' 
        }
    },
    id_employee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empleados', 
            key: 'id_employee' 
        }
    }
}, {tableName: 'notas_medicas',
    timestamps: false });

medicalNotes.belongsTo(procedures, { foreignKey: 'id_procedimiento', as: 'procedure'});
medicalNotes.belongsTo(appointment, { foreignKey: 'id_appointment', as: 'appointments'});
medicalNotes.belongsTo(patient, { foreignKey: 'id_paciente', as: 'patient'});
medicalNotes.belongsTo(employee, { foreignKey: 'id_employee', as: 'employee'});      

module.exports = medicalNotes; 