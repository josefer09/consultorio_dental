const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const user = require('./user');

//Patients 

const patients = sequelize.define('pacientes', {
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'users', 
            key: 'id_user' 
        }
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: false
    }
},{ tableName: 'pacientes',
    timestamps: false
  });

patients.belongsTo(user, { foreignKey: 'id_user', as: 'users'});

module.exports = patients; 