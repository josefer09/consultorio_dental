const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const user = require('./user');
const employee = require('./employee');

//Patients 

const appointment = sequelize.define('appointments', {
    id_appointment: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: 'user', 
            key: 'id_user' 
        }
    },
    id_employee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: 'user', 
            key: 'id_user' 
        }
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
},{ tableName: 'appointments',
    timestamps: false
  });

appointment.belongsTo(user, { foreignKey: 'id_user', as: 'users'});
appointment.belongsTo(employee, { foreignKey: 'id_employee', as: 'employees'});


module.exports = appointment; 