// paymentes.js routes
const express = require('express');
const paymentsController = require('../controllers/payments.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.use(authController.authorizeUser);
router
.route('/')
.get(paymentsController.getPayment)
.post(paymentsController.addPayment);

router
.route('/:id')
.get(paymentsController.getPaymentById)
.delete(paymentsController.deletePayment)
.patch(paymentsController.updatePayment);

router
.route('/idPatient/:id')
.get(paymentsController.getPaymentsByIdPaciente)
.delete(paymentsController.deletePaymentByIdPatient);

router
.route('/date/:date')
.get(paymentsController.getPaymentsByDate);

router
.route('/dateAndPatient/:date/:id')
.get(paymentsController.getPaymentsByDateAndIdUser);

module.exports = router;