import {
  isEmpty,
  showAlert,
  showSpinner,
  anyToken,
  printUserName,
  deleteUserSession,
} from "./funciones.js";
import {
  getPatients,
  getPatientById,
  getNameByUser,
  postPatient,
  deletePatient,
} from "../API/patient.js";
import { Patient } from "./class.js";

(function () {
  const openPatientModal = document.querySelector("#openPatientModal");
  const closePatientModal = document.querySelector("#closePatientModal");
  const modalPatient = document.querySelector("#myModalPatient");
  const patientList = document.querySelector("#patient-list");
  const patientFormulario = document.querySelector("#formulario-patient");
  const patientSelectEmail = document.querySelector("#email");
  const main = document.querySelector("#main");
  const greeting = document.querySelector("#welcome");
  const btnLogOut = document.querySelector('#logOut');

  document.addEventListener("DOMContentLoaded", async () => {
    document.addEventListener("click", confirmarEliminarPaciente);
    // Diferentes consultas a la API como globales
    const dataUser = await anyToken();
    console.log(dataUser);
    const patients = await getPatients(dataUser);
    const userNames = await getNameByUser(dataUser);

    async function printPatient() {
      patients.forEach((patient) => {
        // Iteramos sobre el arreglo obtenido como respuesta

        const {
          id_paciente,
          nombre,
          apellido,
          edad,
          celular,
          direccion,
          id_user,
          sexo,
        } = patient;
        // Hablo a metodo para cambiar el id por el email del user
        const emailUser = changeIdByEmail(id_user);
        // Scripting Time
        const row = document.createElement("TR");
        row.innerHTML += `
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold">${apellido}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${edad}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${celular}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${direccion}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${emailUser}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${sexo}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="patient-edit.html?id=${id_paciente}" data-patient="${id_paciente}" class="text-teal-600 hover:text-teal-900 mr-5 editar">Editar</a>
                        <a href="#" data-patient="${id_paciente}" class="text-red-600 hover:text-red-900 mr-5 eliminar">Eliminar</a>
                    </td>
                `;

        patientList.appendChild(row);
      });
    }

    function changeIdByEmail(id) {
      for (const user of userNames) {
        if (user.id_user === id) {
          return user.email;
        }
      }
      return "Sin asignar";
    }

    function printUserEmail() {
      userNames.forEach((user) => {
        // Aplicar destructuring
        const { id_user, email } = user;

        const option = document.createElement("OPTION");
        option.value = id_user;
        option.textContent = email;

        patientSelectEmail.appendChild(option);
      });
    }

    async function confirmarEliminarPaciente(e) {
      if (e.target.classList.contains("eliminar")) {
        const patientDeleteId = parseInt(e.target.dataset.patient);
        console.log(patientDeleteId);

        const confirmar = confirm("¿Desea eliminar el registro?");
        if (confirmar) {
          try {
            const exito = await deletePatient(dataUser, patientDeleteId);

            if (exito) {
              console.log("Paciente eliminado correctamente");
              showAlert("Registro eliminado con exito", "Exito", main);
              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              console.error("Error al eliminar al paciente");
              showAlert("Error al eliminar al paciente", "error", main);
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          } catch (error) {
            console.error("Error en la solicitud:", error);
            showAlert("Error en el servidor", "error", main);
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        } else {
          console.log("No se eliminó");
        }
      }
    }

    openPatientModal.addEventListener("click", () => {
      modalPatient.classList.remove("hidden");
      // Es para hacer mas fluida la animacion del modal
      setTimeout(() => {
        modalPatient.children[0].classList.add("opacity-100", "scale-100");
      }, 50);
    });

    closePatientModal.addEventListener("click", () => {
      modalPatient.children[0].classList.remove("opacity-100", "scale-100");
      // Y esto tambien para hacer mas fluida la animacion para el modal
      setTimeout(() => {
        modalPatient.classList.add("hidden");
      }, 300);
    });

    patientFormulario.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevenir el evento de default que es POST
      // Seleccionar todos los campos del form
      const nombre = document.querySelector("#name").value;
      const apellido = document.querySelector("#lastname").value;
      const edad = document.querySelector("#age").value;
      const celular = document.querySelector("#phone").value;
      const direccion = document.querySelector("#address").value;
      const id_user = document.querySelector("#email").value;
      const sexo = document.querySelector("#gender").value;

      const patient = new Patient(
        nombre,
        apellido,
        edad,
        celular,
        direccion,
        id_user,
        sexo
      );

      // Validar usuario
      if (isEmpty(patient)) {
        // Si realmente hay un true, entonces esta vacia y haz lo siguiente
        showAlert(
          "¡Todos los campos son obligatorios!",
          "error",
          patientFormulario
        );
        return; // hasta aqui se termina la ejecucion
      }
      showSpinner(patientFormulario);
      console.log(patient);
      // Hablando a la api
      const responsePatient = await postPatient(dataUser, patient);
      if (responsePatient) {
        showAlert("Paciente Registrado Con Exito", "succes", patientFormulario);
        console.log(patient);
        return;
      } else {
        showAlert("Error al enviar los datos", "error", patientFormulario);
        return;
      }
    });
    printPatient();
    printUserEmail();
    btnLogOut.addEventListener('click', deleteUserSession);
    printUserName(dataUser, greeting);
  });
})();
