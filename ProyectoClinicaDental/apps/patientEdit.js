import { Patient } from "./class.js";
import { getPatientById, getNameByUser, updatePatientById, GenderEnum } from "../API/patient.js";
import { anyToken, cleanHTML, isEmpty, showAlert, showSpinner } from "./funciones.js";

// campos del formulario
const nameInput = document.querySelector("#name");
const lastnameInput = document.querySelector("#lastname");
const ageInput = document.querySelector("#age");
const phoneInput = document.querySelector("#phone");
const addressInput = document.querySelector("#address");
const id_userInput = document.querySelector("#email");
const genderInput = document.querySelector("#gender");
const formulario = document.querySelector('#formulario');


(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const dataUser = await anyToken();
    const userNames = await getNameByUser(dataUser);

    

    const paramURL = new URLSearchParams(window.location.search);

    const idPatient = parseInt(paramURL.get("id"));

    // Consulta a la API
    const patient = await getPatientById(dataUser, idPatient);

    printUserEmail();
    printPatient(patient);

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const lastname = lastnameInput.value;
        const age = ageInput.value;
        const phone = phoneInput.value;
        const address = addressInput.value;
        const id_user = id_userInput.value;
        const gender = genderInput.value;

        const newPatient = new Patient(name, lastname, age, phone, address, id_user, gender);

        // Validamos
        if(isEmpty(newPatient)) {
            showAlert("¡Todos los campos son obligatorios!", "error", formulario);
            return;
        }

        showSpinner(formulario)
        // Llamada a la api para editar
        const response = await updatePatientById(dataUser, idPatient, newPatient);
        if(response.status === 'succes') {
            showAlert('Paciente Actualizado Con Exito', 'Exito', formulario);
            setTimeout(() => {
                window.location.href = '../views/patient.html'; 
            }, 2000);
            return;
        }
        return;
    });

    function printPatient(patient) {
        // Destructuring
        const {id_paciente, nombre, apellido, edad, celular, direccion, id_usuario, sexo} = patient;
        nameInput.value = nombre;
        lastnameInput.value = apellido;
        ageInput.value = edad;
        phoneInput.value = celular;
        addressInput.value = direccion;
        id_userInput.value = id_usuario;
        genderInput.value = sexo;
        populateGenderOptions(genderInput,sexo);
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

  function populateGenderOptions(selectElement, selectedGenderName) {
    //Limpia las opciones exisistentes
    selectElement.innerHTML = '';
  
    // Añade opciones basadas en genderEnum
    for (const key in GenderEnum) {
      const option = document.createElement('option');
      option.value = GenderEnum[key];
      option.textContent = key;
      // Seleccionar la opción correspondiente
      if (selectedGenderName === key) {
        option.selected = true;
      }
      selectElement.appendChild(option);
    }
  }
})();
