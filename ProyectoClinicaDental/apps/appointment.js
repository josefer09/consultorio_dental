import {
  anyToken,
  showAlert,
  showSpinner,
  printUserName,
  isEmpty,
  deleteUserSession,
  validateStatus,
} from "./funciones.js";

import { getUsers, getUser } from "../API/user.js";

import { getEmployees, getEmployeeById } from "../API/employee.js";

import {
  postNewAppointment,
  getAppointments,
  deleteAppointment,
  getAppointment,
  updateAppointment,
} from "../API/appointment.js";

import { Appointment } from "./class.js";

(function () {
  const greetin = document.querySelector("#welcome");
  const btnLogOut = document.querySelector("#logOut");
  const userSelect = document.querySelector("#id_user");
  const doctorSelect = document.querySelector("#id_employee");
  const formulario = document.querySelector("#formulario");
  const contenedorCitas = document.querySelector("#citas");
  const main = document.querySelector("#main");
  const modal = document.querySelector("#myModalAppointmentEdit");
  const closeModal = document.querySelector("#closeModalAppointmentEdit");
  const userSelectEdit = document.querySelector("#id_userEdit");
  const doctorSelectEdit = document.querySelector("#id_employeeEdit");
  const formularioEdit = document.querySelector('#formularioEdit');

  document.addEventListener("DOMContentLoaded", async () => {
    const dataUser = await anyToken();
    console.log(dataUser);

    printEmailFormEdit();
    printDoctorFormEdit();

    async function printAppointments() {
      // Consultar a la API
      const appointments = await getAppointments(dataUser);
      console.log(appointments);

      // Recorremos todas las citas
      appointments.forEach(async (appointment) => {
        const { id_appointment, id_user, id_employee, date, time, motivo } =
          appointment;

        // Consultamos a las API para obtener el nombre y email del doctor y usuario
        const user = await getUser(dataUser, id_user);

        const doctor = await getEmployeeById(dataUser, id_employee);

        // Destructuring a la respuestas obtenidas por las API
        const { email, userName } = user;
        const { name } = doctor;

        const divCita = document.createElement("div");
        divCita.classList.add(
          "cita",
          "p-3",
          "border",
          "border-gray-300",
          "rounded",
          "shadow-md",
          "my-4",
          "bg-white"
        );

        divCita.dataset.id = id_appointment;

        // Scripting de los elementos de la cita
        const emailParrafo = document.createElement("h2");
        emailParrafo.classList.add("card-title", "font-bold", "text-xl");
        emailParrafo.textContent = userName;

        const doctorParrafo = document.createElement("p");
        doctorParrafo.classList.add("font-semibold", "mb-2");
        doctorParrafo.textContent = `Doctor: ${name}`;

        const dateParrafo = document.createElement("p");
        dateParrafo.classList.add("font-semibold", "mb-2");
        dateParrafo.textContent = `Fecha de cita: ${date}`;

        const timeParrafo = document.createElement("p");
        timeParrafo.classList.add("font-semibold", "mb-2");
        timeParrafo.textContent = `Hora de cita: ${time}`;

        const motivoParrafo = document.createElement("p");
        motivoParrafo.classList.add("font-semibold", "mb-2");
        motivoParrafo.textContent = `Motivo: ${motivo}`;

        // Crear botón para eliminar citas
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add(
          "bg-red-500",
          "hover:bg-red-600",
          "text-white",
          "font-bold",
          "py-2",
          "px-4",
          "rounded",
          "mx-2"
        );
        btnEliminar.textContent = "Eliminar";

        // Eliminar la cita
        btnEliminar.onclick = () => deleteById(id_appointment);

        // Botón para editar una cita
        const btnEditar = document.createElement("button");
        btnEditar.classList.add(
          "bg-blue-500",
          "hover:bg-blue-600",
          "text-white",
          "font-bold",
          "py-2",
          "px-4",
          "rounded",
          "mr-2"
        );
        btnEditar.textContent = "Editar";

        // Editar cita
        btnEditar.onclick = () => editAppointment(id_appointment);

        // Agregar los párrafos y botones al divCita
        divCita.appendChild(emailParrafo);
        divCita.appendChild(doctorParrafo);
        divCita.appendChild(dateParrafo);
        divCita.appendChild(timeParrafo);
        divCita.appendChild(motivoParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        // Agregar las citas al HTML
        contenedorCitas.appendChild(divCita);
      });
    }

    async function deleteById(id) {
      console.log(id);
      const confirmar = confirm("¿Deseas Eliminar el registro?");
      if (confirmar) {
        // Llamada a la API
        const confirmDelete = await deleteAppointment(dataUser, id);
        validateStatus(confirmDelete, "delete", "Cita", main);
        return;
      }
      console.log("No se elimino");
      return;
    }

    async function editAppointment(id) {
      // Primero abrimos el modal
      modal.classList.remove("hidden");
      setTimeout(() => {
        modal.children[0].classList.add("opacity-100", "scale-100");
      }, 50);
      console.log(id);

      // Llamamos a la API para obtener los datos de la cita especificos
      const appointment = await getAppointment(dataUser, id);
      console.log(appointment);

      printFormEdit(appointment);

      formularioEdit.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id_user = document.querySelector("#id_userEdit").value;
        const id_employee = document.querySelector("#id_employeeEdit").value;
        const date = document.querySelector("#dateEdit").value;
        const time = document.querySelector("#timeEdit").value;
        const motivo = document.querySelector("#motivoEdit").value;
  
        // Construccion del objeto
        const appointment = new Appointment(
          id_user,
          id_employee,
          date,
          time,
          motivo
        );
        console.log(appointment);
  
        // Validar Objeto
        if (isEmpty(appointment)) {
          showAlert("Todos los campos son obligatorios", "error", formularioEdit);
          return;
        }
  
        // Llamamos a la API
        const updateNewAppointment = await updateAppointment(dataUser, id, appointment);
        validateStatus(updateNewAppointment, 'update', 'Cita', formularioEdit);
        return;
      });
      return;
    }

    async function printEmailForm() {
      const usersNormal = await searchUsers();

      usersNormal.forEach((user) => {
        const { email, userName, id_user } = user;
        const option = document.createElement("OPTION");
        option.value = id_user;
        option.textContent = email;

        userSelect.appendChild(option);
      });
    }

    async function printEmailFormEdit() {
      const usersNormal = await searchUsers();
      usersNormal.forEach((user) => {
        const { email, userName, id_user } = user;
        const option = document.createElement("OPTION");
        option.value = id_user;
        option.textContent = email;

        userSelectEdit.appendChild(option);
      });
    }

    async function printDoctorForm() {
      const doctors = await searchDoctors();

      doctors.forEach((doctor) => {
        const { id_employee, name } = doctor;
        const option = document.createElement("OPTION");
        option.value = id_employee;
        option.textContent = name;

        doctorSelect.appendChild(option);
      });
    }

    async function printDoctorFormEdit() {
      const doctors = await searchDoctors();

      doctors.forEach((doctor) => {
        const { id_employee, name } = doctor;
        const option = document.createElement("OPTION");
        option.value = id_employee;
        option.textContent = name;

        doctorSelectEdit.appendChild(option);
      });
    }

    async function searchUsers() {
      // Llamada a las API
      const users = await getUsers(dataUser);
      const usersNormal = [];
      // Por cada usuario que sea de tipo normal, lo movere a su correspondiente arreglo
      users.forEach((user) => {
        const { type } = user;
        if (type === "Normal") {
          usersNormal.push(user);
          return;
        } else {
          return;
        }
      });
      return usersNormal;
    }

    async function searchDoctors() {
      // Llamada a la API
      const employees = await getEmployees(dataUser);
      const doctors = await Promise.all(
        employees.map(async (employee) => {
          const { id_user } = employee;
          const user = await getUser(dataUser, id_user);
          const { type } = user;
          if (type === "Doctor") {
            return employee;
          }
          return null;
        })
      );
      return doctors.filter((doctor) => doctor !== null);

      // if (id_userRole === 2) {
      //   console.log(employee);
      //   doctors.push(employee);
      //   return;
      // } else {
      //   console.log("No es medico");
      //   return;
      // }
    }

    async function printFormEdit(appointment) {
      const { id_user, id_employee, date, time, motivo } = appointment;
      console.log(appointment);

      // Algunnos selectores
      const dateSelectEdit = document.querySelector('#dateEdit');
      const timeSelecEdit = document.querySelector('#timeEdit');
      const motivoSelectEdit = document.querySelector('#motivoEdit');
      // Mostrar los resultados en el HTML
      userSelectEdit.value = id_user;
      doctorSelectEdit.value = id_employee;
      dateSelectEdit.value = date;
      timeSelecEdit.value = time;
      motivoSelectEdit.value = motivo;

      //printEmailFormEdit();
      //printDoctorFormEdit();
    }

    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id_user = document.querySelector("#id_user").value;
      const id_employee = document.querySelector("#id_employee").value;
      const date = document.querySelector("#date").value;
      const time = document.querySelector("#time").value;
      const motivo = document.querySelector("#motivo").value;

      // Construccion del objeto
      const appointment = new Appointment(
        id_user,
        id_employee,
        date,
        time,
        motivo
      );
      console.log(appointment);

      // Validar Objeto
      if (isEmpty(appointment)) {
        showAlert("Todos los campos son obligatorios", "error", formulario);
        return;
      }
      // Enviar a la API el objeto para crearlo
      const newAppointment = await postNewAppointment(dataUser, appointment);
      console.log(newAppointment);
      validateStatus(newAppointment, "create", "Cita", formulario);
      return;
    });

    

    closeModal.addEventListener("click", () => {
      modal.children[0].classList.remove("opacity-100", "scale-100");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 300);
    });

    printAppointments();
    printEmailForm();
    printDoctorForm();
    btnLogOut.addEventListener("click", deleteUserSession);
    printUserName(dataUser, greetin);
  });
})();
