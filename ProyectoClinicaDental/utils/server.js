// server.js
const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const procedureRouter = require('../routes/procedures');
const userRouter = require('../routes/users');
const appointmentRouter = require('../routes/appointment');
const patientRouter = require('../routes/patients');
const paymentsRouter = require('../routes/payments');
const medicalRecordRouter = require('../routes/medicalRecords');
const medicalNotesRouter = require('../routes/medicalNotes');
const medicalNotesProceduresRouter = require('../routes/medicalNotesProcedures');
const accountRouter = require('../routes/account');
const rolesRouter = require('../routes/role');
const specialtyRouter = require('../routes/specialty');
const authRouter = require('../routes/auth');
const employeeRouter = require('../routes/employee');
const appError = require('./appError');
const cors = require('cors');


dotenv.config({ path: './config.env' });

const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false, // Puedes quitar esto si deseas ver los logs de SQL en la consola
  password: 'admin'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado correctamente a la base de datos MySQL');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Aquí puedes configurar tus rutas y middleware Express
// Ejemplo: app.use('/api', require('./routes/api'));

app.use(express.json());
const corsOptions = {
  origin: '*', // Este es el origen de tu cliente
  methods: 'GET, POST, DELETE, PATCH', // Especifica los métodos que tu servidor aceptará
  allowedHeaders: 'Content-Type, Authorization', // Los encabezados permitidos
  exposedHeaders: 'Authorization', // Encabezados expuestos que pueden ser leídos por el cliente
  credentials: true, // Indica si se deben incluir credenciales en las solicitudes (por ejemplo, cookies o encabezados de autorización)
};

app.use(cors(corsOptions));


app.use('/procedures', procedureRouter);

app.use('/users', userRouter);

app.use('/appointments', appointmentRouter);

app.use('/patients', patientRouter);

app.use('/payments', paymentsRouter);

app.use('/medicalRecords', medicalRecordRouter);

app.use('/medicalNotes', medicalNotesRouter);

app.use('/medicalNotesProcedures', medicalNotesProceduresRouter);

app.use('/account', accountRouter);

app.use('/roles', rolesRouter);

app.use('/specialtys', specialtyRouter);

app.use('/employees', employeeRouter);

app.use('/auth', authRouter);

app.all('*', (req, resp, next) =>{
  next(new appError(`No se pudo acceder a ${req.originalUrl} en el servidor, 404`));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Aplicación en ejecución en el puerto ${port}`);
});
