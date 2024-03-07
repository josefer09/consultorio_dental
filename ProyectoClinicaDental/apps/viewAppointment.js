import {
    isEmpty,
    showAlert,
    showSpinner,
    anyToken,
    printUserName,
    deleteUserSession,
    validateStatus,
  } from "../apps/funciones.js";
  import {
    getDataByRole,
    getDataBySpecialty,
    postEmployee,
    deleteEmployee,
    getNameByUser,
    getEmployees,
    getEmployeeById,
  } from "../API/employee.js";
  import { MedicalNotes } from "../apps/class.js";
  import {
    postNewAppointment,
    getAppointments,
    deleteAppointment,
    getAppointment,
    updateAppointment,
  } from "../API/appointment.js";
  import {
    getUser, getUsers
  } from "../API/user.js";
import { getProcedures, deleteProcedure, postProcedure } from "../API/procedure.js";
import {
    getPatients,
    getPatientById,
    postPatient,
    deletePatient,
  } from "../API/patient.js";

  import {
    postNewMedicalNotes
  } from "../API/medicalNotes.js";

  
  (function () {
    // Variables Globales
    const openModal = document.querySelector("#openModal");
    const closeModal = document.querySelector("#closeModal");
    const modal = document.querySelector("#myModal");
    const spinner = document.querySelector("#spinner");
    const list = document.querySelector("#employee-list");
    const selectRole = document.querySelector("#role");
    const selectSpecialty = document.querySelector("#specialty");
    const selectEmail = document.querySelector("#email");
    const main = document.querySelector("#main");
    const greeting = document.querySelector("#welcome");
    const btnLogOut = document.querySelector("#logOut");
    const userNameInput = document.querySelector('#id_user');
    const doctorInput = document.querySelector('#id_employee');
    const dateInput = document.querySelector('#date');
    const procedureInput = document.querySelector('#procedure');
    const notaInput = document.querySelector('#nota');
    const formulario = document.querySelector('#formulario');
    const botonImprimir = document.querySelector('#imprimir');
  
    document.addEventListener("DOMContentLoaded", async () => {
      // Diferentes consultas a la API como globales
      const dataUser = await anyToken();
      console.log(dataUser);
      const employees = await getEmployees(dataUser);
      const roles = await getDataByRole(dataUser);
      const specialtys = await getDataBySpecialty(dataUser);
      const userNames = await getNameByUser(dataUser);

      const paramURL = new URLSearchParams(window.location.search);

    const idAppointment = parseInt(paramURL.get("id"));
    console.log(idAppointment);

    // Constultar a la API
    const cita = await getAppointment(dataUser, idAppointment);
    console.log(cita);
    console.log(cita.id_user);

    async function printFormByAppointmen(cita) {
        const {id_user, id_employee, date} = cita

        const user = await getUser(dataUser, id_user);
        console.log(user);
        // Aplico Destructurin
        const { userName } = user;

        const doctor = await getEmployeeById(dataUser, id_employee);
        const { name } = doctor;


        userNameInput.value = id_user;
        doctorInput.value = id_employee;
        dateInput.value = date;
    }

    async function printDoctorForm() {
        const doctors = await searchDoctors();
  
        doctors.forEach((doctor) => {
          const { id_employee, name } = doctor;
          const option = document.createElement("OPTION");
          option.value = id_employee;
          option.textContent = name;
  
          doctorInput.appendChild(option);
        });
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

      async function printUserNameForm() {
        const usersNormal = await searchUsers();
  
        usersNormal.forEach((user) => {
          const { email, userName, id_user } = user;
          const option = document.createElement("OPTION");
          option.value = id_user;
          option.textContent = userName;
  
          userNameInput.appendChild(option);
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

      printDoctorForm();
      printUserNameForm();

    async function printProcedure() {
        const procedures = await getProcedures(dataUser);
        console.log(procedures);
        procedures.forEach((procedure) => {
        const { id_procedimiento, nombre } = procedure;
        const option = document.createElement("OPTION");
        option.value = id_procedimiento;
        option.textContent = nombre;

        procedureInput.appendChild(option);
      });
    }

    async function searchPatient() {
        const patients = await getPatients(dataUser);
        const idUser = cita.id_user;
        console.log(patients);
        const patientVerified = [];
        patients.forEach(patient => {
            const {id_user} = patient;
            if(id_user === idUser){
                patientVerified.push(patient);
                return;
            }
        });
        return patientVerified;
    }

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const patient = await searchPatient();
        console.log(patient[0].id_paciente);

        const nota = document.querySelector('#nota').value;
        const id_procedimiento = document.querySelector('#procedure').value;
        const id_appointment = idAppointment;
        const id_paciente = patient[0].id_paciente;
        const id_employee = document.querySelector('#id_employee').value;

        const medicalNote = new MedicalNotes(nota, id_procedimiento, id_appointment, id_paciente, id_employee);
        console.log(medicalNote);

        if(isEmpty(medicalNote)) {
            showAlert('Todos los campos son obligatorios', 'error', formulario);
        }
        const createNote = await postNewMedicalNotes(dataUser, medicalNote);
        console.log(createNote);
        validateStatus(createNote, 'create', 'Nota', formulario);
        
        return;
    })

    botonImprimir.addEventListener('click', () => {
        window.print();
    })

    // formulario.addEventListener('submit', async (e) => {
    //     e.preventDefault(); // Prevenir el evento de default que es POST
    //   // Seleccionar todos los campos del form

    //   //const nota = document.querySelector("#name").value;
    //   //const id_procedimiento = document.querySelector("#licenseNumber").value;
    //   //const id_cita = document.querySelector("#age").value;
    //   const id_paciente = document.querySelector("#id_user").value;
    //   //const id_empleado = document.querySelector("#specialty").value;


    //   console.log(id_paciente);
    //   const patient = await searchPatient(id_paciente);
    //   console.log(patient);
    //   return;
    // })
  
    printFormByAppointmen(cita);
    printProcedure();
      printUserName(dataUser, greeting);
    });
  })();
  