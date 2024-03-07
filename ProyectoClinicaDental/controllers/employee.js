 // EmpleadoController
const Sequelize = require("sequelize").Sequelize;
const employeeModel = require("../models/employee");
const roleController = require("./role");
const specialtyController = require("./specialty");
const specialtyModel = require("../models/specialty");


// Add employee
exports.addEmployee = async (req, res) => {
  try {
    const answer = await employeeModel.create(req.body);
    res.status(201).json({
     status: 'succes'
    })
 } catch (err) {
    res.status(400).json({
       status: 'fail',
       message: err
    });
}
};

//Get employee
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
    try {
        const employeeCreated = await employeeModel.findByPk(id); 
        res.send(employeeCreated);
    } catch (error) {
        res.send(error);
    }
};

// Trea todos los empleados
exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.findAll();
    const employeesWithRoleNames = await getEmployeesWithRoleNames(employees);
    const employesWithRoleAndSpecialtyNames = await getEmployeesWithSpecialtyNames(employeesWithRoleNames);
    res.send(employesWithRoleAndSpecialtyNames); // Se envia la respuesta del servidor con todos los cambios, es decir con los nombres de role y specialty
} catch (error) {
    res.send(error) 
}
}

/**
 * Metodo para poder obtener los nombres de los roles y anadirlos a un nuevo arreglo para enviarlo como respuesta
 * @param {*} employees 
 * @returns 
 */
const getEmployeesWithRoleNames = async (employees) => {
    try {
      const employeesWithRoleNames = await Promise.all(employees.map(async employee => {
        const role = await employee.getUserRole(); // Suponiendo que tienes un método getUserRole en tu modelo Employee
        const roleName = role.name; // Obtener el nombre del rol
    
        return {
          ...employee.dataValues, // Tomar los valores del empleado
          roleName // Agregar el nombre del rol como una nueva propiedad
        };
      }));
    
      return employeesWithRoleNames;
    } catch (error) {
      console.error(error);
      return employees; // Si ocurre un error, devuelve los empleados originales
    }
  };


  /**
 * Metodo para poder obtener los nombres de las especialidades y anadirlos a un nuevo arreglo para enviarlo como respuesta
 * @param {*} employees 
 * @returns 
 */
  const getEmployeesWithSpecialtyNames = async (employees) => {
    try {
      const employeesWithSpecialtyNames = await Promise.all(employees.map(async employee => {
        const employeeData = employee.dataValues; // Tomar los valores del empleado
  
        const associatedSpecialty = await getSpecialtyByID(employee.id_userSpecialty);
  
        const specialtyName = associatedSpecialty ? associatedSpecialty.name : null; // Obtener el nombre del rol
  
        employeeData.specialtyName = specialtyName; // Agregar el nombre de la especialidad como una nueva propiedad
  
        return employeeData;
      }));
  
      return employeesWithSpecialtyNames;
    } catch (error) {
      console.error(error);
      return employees; // Si ocurre un error, devuelve los empleados originales
    }
  };
  
  

  const getSpecialtyByID = async (specialtyID) => {
    try {
      const specialty = await specialtyModel.findByPk(specialtyID);
      return specialty; // devolvera la especialidad en si
    } catch (error) {
      console.error(error);
      return null; // Si hay un error devuelv null
    }
  };
  
  
  


// Recibe de parametros el id a modificar, y un objeto con la informacion a actualizar
// Update Employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
      const employeeUpdate = await employeeModel.update(req.body, {
          where: {
              id_employee:id
          }
      });
      res.status(201).json({
          status: 'succes'
      })
  } catch (error) {
      res.status(400).json({
          status: 'fail',
          message: error
      });
  }
}


// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
    try{
      const deleted =  await employeeModel.destroy({
          where: {
            id_employee:id
          }
       })
       res.status(201).json({
        status: 'succes'
       })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};
