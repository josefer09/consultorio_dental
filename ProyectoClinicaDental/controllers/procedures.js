// procedures.js controller
const Sequelize = require('sequelize').Sequelize;
const proceduresModel = require('../models/procedures');
const Procedures = require('../models/procedures')

//obetener procedimientos
exports.getAllProcedures = async (req, res) => {
    try {
        const procedures = await proceduresModel.findAll();
        res.send(procedures);
    } catch (err) {
        res.send(err);
    }
}

//agregar procedimientos
exports.addProcedures = async (req, res) => {
    try {
        const result = await Procedures.create(req.body)
        res.status(201).json({
            status: 'succes'
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

//obtener procedimiento por id
exports.getProcedureById = async (req, res) => {
    const { id } = req.params;
    try {
        const procedures = await Procedures.findByPk(id);
        res.send(procedures);
    } catch (err) {
        res.send(err);
    }
}

//obtener procedimiento por nombre
exports.getProcedureByName = async (req, res) => {
    const { name } = req.params;
    try {
        const procedure = await Procedures.findOne({
            where: {
                nombre: name
            }
        });
        res.send(procedure);
        return procedure;
    } catch (err) {
        res.send(err);
    }
}

//eliminar procedimiento
exports.deleteProcedure = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Procedures.destroy({
            where: {
                id_procedimiento: id
        }});
        res.status(201).json({
            status: 'succes'
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

//eliminar procedimiento por nombre
exports.deleteProcedureByName = async (req, res) => {
    const { name } = req.params;
    try {
        const deleted = await Procedures.destroy({
            where: {
                nombre: name
            }
        })
        res.status(201).json({
            status: 'succes'
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

//actualizar procedimiento
exports.updateProcedure = async (req, res) => {
    const { id } = req.params;
    try {
        const procedureUpdapted = await Procedures.update(req.body, {
            where: {
                id_procedimiento: id
            }
        });
        res.status(201).json({
            status: 'succes'
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

