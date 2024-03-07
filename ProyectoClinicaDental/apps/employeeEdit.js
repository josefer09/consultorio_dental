import { Employee } from "./class.js";
import { getEmployeeById, getDataByRole, getDataBySpecialty, getNameByUser, updateEmployeeById } from "../API/employee.js";
import { anyToken, cleanHTML, isEmpty, showAlert, showSpinner } from "./funciones.js";

// campos del formulario
const nameInput = document.querySelector("#name");
const licenseNumberImput = document.querySelector("#licenseNumber");
const ageInput = document.querySelector("#age");
const id_userRoleInput = document.querySelector("#role");
const id_userSpecialtyInput = document.querySelector("#specialty");
const id_userInput = document.querySelector("#email");
const formulario = document.querySelector('#formulario');

(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const dataUser = await anyToken();
    const roles = await getDataByRole(dataUser);
    const specialtys = await getDataBySpecialty(dataUser);
    const userNames = await getNameByUser(dataUser);

    

    const paramURL = new URLSearchParams(window.location.search);

    const idEmployee = parseInt(paramURL.get("id"));
    console.log(idEmployee);

    // Consulta a la API
    const employee = await getEmployeeById(dataUser, idEmployee);

    printRoleName();
    printSpecialtyName();
    printUserEmail();
    printEmployee(employee);

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const licenseNumber = licenseNumberImput.value;
        const age = ageInput.value;
        const id_userRole = id_userRoleInput.value;
        const id_userSpecialty = id_userSpecialtyInput.value;
        const id_user = id_userInput.value;

        const newEmployee = new Employee(name, licenseNumber, age, id_userRole, id_userSpecialty, id_user);
        console.log(newEmployee);

        // Validamos
        if(isEmpty(newEmployee)) {
            showAlert("¡Todos los campos son obligatorios!", "error", formulario);
            return;
        }

        showSpinner(formulario)
        // Llamada a la api para editar
        const response = await updateEmployeeById(dataUser, idEmployee, newEmployee);
        console.log(response);
        if(response.status === 'succes') {
            showAlert('Empleado Actualizado Con Exito', 'Exito', formulario);
            setTimeout(() => {
                window.location.href = '../views/administration.html'; 
            }, 2000);
            return;
        }
        return;
    });

    function printEmployee(employee) {
        // Destructuring
        const {id_employee, name, licenseNumber, age, id_userRole, id_userSpecialty, id_user} = employee;
        nameInput.value = name;
        licenseNumberImput.value = licenseNumber;
        ageInput.value = age;
        id_userRoleInput.value = id_userRole;
        id_userSpecialtyInput.value = id_userSpecialty;
        id_userInput.value = id_user;
      }
    
      function printRoleName() {
        roles.forEach((role) => {
          // Aplicar destructuring
          const { id_userRole, name } = role;
    
          const option = document.createElement("OPTION");
          option.value = id_userRole;
          option.textContent = name;
    
          id_userRoleInput.appendChild(option);
        });
      }
    
      function printSpecialtyName() {
        specialtys.forEach((specialty) => {
          const { id_userSpecialty, name } = specialty;
    
          const option = document.createElement("OPTION");
          option.value = id_userSpecialty;
          option.textContent = name;
    
          id_userSpecialtyInput.appendChild(option);
        });
      }
    
      function printUserEmail() {
        userNames.forEach((user) => {
          // Aplicar destructuring
          const { id_user, email } = user;
    
          const option = document.createElement("OPTION");
          option.value = id_user;
          option.textContent = email;
    
          id_userInput.appendChild(option);
        });
      }
    
  });
})();
