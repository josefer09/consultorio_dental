const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('db_clinicadental', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;