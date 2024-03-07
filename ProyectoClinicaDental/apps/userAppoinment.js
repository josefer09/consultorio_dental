import {
    anyToken,
    showAlert,
    showSpinner,
    printUserName,
    isEmpty,
    deleteUserSession,
    validateStatus,
  } from "./funciones.js";
  
  import { getUserByEmail } from "../API/user.js";
  
  import { getAppointments, getAppointment, getAppointmentByIdUser } from "../API/appointment.js";

  import { getEmployeeById } from "../API/employee.js";
  
  import { Appointment } from "./class.js";
  
  (function () {
    // Variables Globales
    const list = document.querySelector("#list");
    const modal = document.querySelector("#myModal");
    const openModal = document.querySelector("#openModal");
    const closeModal = document.querySelector("#closeModal");
    const greeting = document.querySelector("#welcome");
    const btnLogOut = document.querySelector('#logOut');
  
    document.addEventListener("DOMContentLoaded", async () => {
      document.addEventListener('click', observeAppointment);
      const dataUser = await anyToken();
      const {id_user}= await getUserByEmail(dataUser);
      const idUser=id_user;

      const appointments = await getAppointments(dataUser);

      /**
       * Metodo para imprimir los elementos de la tabla de 
       * @param {*} appointments
       */
      async function printAppoinment(appointments) {
        for (const appointment of appointments) {
          const { id_appointment, date, time, id_user, id_employee } = appointment;
          const user = await getEmployeeById(dataUser,id_employee);
          if (idUser === id_user) {
          const {name} = user
          const row = document.createElement("TR");
          row.innerHTML += `
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <p class="text-sm leading-5 font-medium text-gray-700 text-lg"> ${date} </p>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <p class="text-sm leading-5 font-medium text-gray-700 text-lg"> ${time} </p>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <p class="text-sm leading-5 font-medium text-gray-700 text-lg"> ${name} </p>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                          <a href="#" data-appoiment="${id_appointment}" class="text-yellow-600 hover:text-red-900 ver">Ver</a>
                      </td>
                  `;
  
          list.appendChild(row);
        }
       };
      }
  
      async function observeAppointment(e) {
        if (e.target.classList.contains("ver")) {
          const appointmentEditedId = parseInt(e.target.dataset.appoiment);
          const appointmentById = await getAppointment(dataUser, appointmentEditedId);
  
          // Mostramos el modal
          modal.classList.remove("hidden");
          setTimeout(() => {
            modal.children[0].classList.add("opacity-100", "scale-100");
          }, 50);
  
          // Seleccionamos los inputs
          const {id_appointment, date, time, id_user, id_employee, motivo } = appointmentById;
          const {name} = await getEmployeeById(dataUser,id_employee);
          document.querySelector("#dateNew").value = date;
          document.querySelector("#timeNew").value = time;
          document.querySelector("#doctorNew").value = name;
          document.querySelector("#motiveNew").value = motivo;
          return;
        }
        return;
      }
  
      closeModal.addEventListener("click", () => {
        modal.children[0].classList.remove("opacity-100", "scale-100");
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 300);
      });
  
      printAppoinment(appointments);
      btnLogOut.addEventListener('click', deleteUserSession);
      printUserName(dataUser, greeting);
    });
  })();
  