const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

//User

const user = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Normal', 'Doctor', 'Administrador'),
        allowNull: false
    }
}, {tableName: 'users', 
    timestamps: false });

module.exports = user; 
