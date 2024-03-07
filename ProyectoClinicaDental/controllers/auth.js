// auth.js controllers
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');
const User = require('../models/user'); // Asegúrate de importar el modelo de usuario
const UserController = require('../controllers/user'); // Asegúrate de importar el modelo de usuario
const APIConstroller = require('../controllers/API');

const generateToken = (user) => {
  return jwt.sign({ id_user: user.id_user, email: user.email, password: user.password }, secret, { expiresIn: '1h' });
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { email, password } });

    if (user) {
      // Usuario autenticado, generar el token
      const token = generateToken(user);
      console.log(user);
      const newToken = await User.update({ token }, { where: { id_user: user.id_user } });
      res.json({ token, user });
    } else {
      // Usuario no encontrado o credenciales inválidas
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error de servidor' });
  }
};

// Middleware de autorización
const authorizeUser = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next(); // Continúa con la ruta si el token es válido
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  };



module.exports = {
  authenticateUser,
  authorizeUser
};
