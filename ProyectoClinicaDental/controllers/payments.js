const Sequelize = require('sequelize').Sequelize;
const Payments = require('../models/payments');
const { Op } = require('sequelize');

//agregar pago
exports.addPayment = async ( req, res) =>{
    try {
       const result = await Payments.create(req.body);
       res.status(201).json({
        status: 'succes'
       })
    }catch(err){
       res.send(err);
    }
}

//obetener todos los pagos
exports.getPayment = async (req, res) => {
    try {
        const payments = await Payments.findAll(); 
        res.send(payments);
    } catch (err) {
        res.send(err);
    }
 }

 //obtener pago por id
 exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const Payment = await Payments.findByPk(id); 
        res.send(Payment);
    } catch (err) {
        res.send(err); 
    }
}

//obetener todos los pagos de un paciente
exports.getPaymentsByIdPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const payments = await Payments.findAll({
            where: {
              id_paciente: id
            }
        });
        res.send(payments);
    } catch (err) {
        res.send(err);
    }
 }

 //obtener los pagos por fecha
 exports.getPaymentsByDate = async (req, res) => {
    const { date } = req.params;
    try {
        const payments = await Payments.findAll({
            where: {
                fecha_pago: {
                    [Op.eq]: new Date(date)
                }
            }
        });
        res.send(payments);
    } catch (err) {
        res.send(err);
    }
 }

 //obtener los pagos por fecha y usuario
 exports.getPaymentsByDateAndIdUser = async (req, res) => {
    const { date } = req.params;
    const { id } = req.params;
    try {
        const payments = await Payments.findAll({
            where: {
              id_paciente: id,
              fecha_pago: {
                [Op.eq]: new Date(date)
             }
            }
        });
        res.send(payments);
    } catch (err) {
        res.send(err);
    }
 }

//eliminar pago
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await Payments.destroy({
          where: {
             id_pago:id
          }
       });
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
       res.send(err);
    }
}

//eliminar pago por paciente
exports.deletePaymentByIdPatient = async (req, res) => {
    const { id } = req.params;
    try{
      const deleted =  await Payments.destroy({
          where: {
             id_paciente:id
          }
       });
       res.status(201).json({
        status: 'succes'
       });
    }catch(err){
        res.send(err);
    }
}

//acatulizar pago
exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const  paymentUpdapted = await Payments.update(req.body, {
            where: {
                id_pago:id
            }
        });
        res.status(201).json({
            status: 'succes'
        });
    } catch (err) {
        res.send(err);
    }
}