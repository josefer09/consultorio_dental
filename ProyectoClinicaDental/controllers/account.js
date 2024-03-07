const Sequelize = require('sequelize').Sequelize;
const Account = require('../models/account')

//agregar cuenta
exports.addAccount = async (req, res) =>{
    try {
       const result = await Account.create(req.body);
       res.status(201).json({
        status: 'succes'
    });
    }catch(err){
        res.send(err); 
    }
}

//obtener cuentas
exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll(); 
        res.send(accounts);
    } catch (err) {
        res.send(err);
    }
 }

 //obetener cuenta por id
exports.getAccountsById = async (req, res) => {
    const { id } = req.params;
    try {
        const accounts = await Account.findByPk(id); 
        res.send(accounts);
    } catch (err) {
        res.send(err);
    }
 }

 //Obtener cuenta por paciente
 exports.getAccountsByIdPatient = async (req, res) => {
    const { id } = req.params;
    try {
        const accounts = await Account.findAll({
            where: {
                id_paciente: id
            }
        });
        res.send(accounts);
    } catch (err) {
        res.send(err);
    }
 }

 //elimina cuenta
 exports.deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Account.destroy({
            where: {
                id_cuenta: id
            }
        });
        res.status(201).json({
            status: 'succes'
           });
    } catch (err) {
        res.send(err);
    }
 }

 //elimina cuenta por paciente
 exports.deleteAccountByIdPatient = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Account.destroy({
            where: {
                id_paciente: id
            }
        });
        res.status(201).json({
            status: 'succes'
           });
    } catch (err) {
        res.send(err);
    }
 }

  //actualizar cuentas
  exports.updateAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const  accountUpdapted = await Account.update(req.body, {
            where: {
                id_cuenta:id
            }
        });
        res.status(201).json({
            status: 'succes'
        });
    } catch (err) {
        res.send(err);
    }
}