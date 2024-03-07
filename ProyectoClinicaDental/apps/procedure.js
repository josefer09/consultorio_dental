import {
  isEmpty,
  showAlert,
  showSpinner,
  anyToken,
  printUserName,
  deleteUserSession,
} from "./funciones.js";
import { getProcedures, deleteProcedure, postProcedure } from "../API/procedure.js";
import { Procedure } from "./class.js";

(function () {
  const openModal = document.querySelector("#openModal");
  const closeModal = document.querySelector("#closeModal");
  const modal = document.querySelector("#myModal");
  const list = document.querySelector("#procedure-list");
  const formulario = document.querySelector("#formulario-procedure");
  const main = document.querySelector("#main");
  const greeting = document.querySelector("#welcome");
  const btnLogOut = document.querySelector('#logOut');

  document.addEventListener("DOMContentLoaded", async () => {
    document.addEventListener("click", confirmarEliminarProcedimiento);
    // Diferentes consultas a la API como globales
    const dataUser = await anyToken();
    console.log(dataUser);
    const procedures = await getProcedures(dataUser);

    async function printProcedure() {
      procedures.forEach((procedure) => {
        // Iteramos sobre el arreglo obtenido como respuesta

        const { id_procedimiento, nombre, precio, descuento } = procedure;
        // Scripting Time
        const row = document.createElement("TR");
        row.innerHTML += `
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                        <p class="text-gray-600 ">${precio}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${descuento}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="procedure-edit.html?id=${id_procedimiento}" data-procedure="${id_procedimiento}" class="text-teal-600 hover:text-teal-900 mr-5 editar">Editar</a>
                        <a href="#" data-procedure="${id_procedimiento}" class="text-red-600 hover:text-red-900 mr-5 eliminar">Eliminar</a>
                    </td>
                `;

        list.appendChild(row);
      });
    }
    async function confirmarEliminarProcedimiento(e) {
      if (e.target.classList.contains("eliminar")) {
        const procedureDeleteId = parseInt(e.target.dataset.procedure);
        console.log(procedureDeleteId);

        const confirmar = confirm("¿Desea eliminar el registro?");
        if (confirmar) {
          try {
            const exito = await deleteProcedure(dataUser, procedureDeleteId);

            if (exito) {
              console.log("Procedimiento eliminado correctamente");
              showAlert("Registro eliminado con exito", "Exito", main);
              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              console.error("Error al eliminar al procedimiento");
              showAlert("Error al eliminar al procedimiento", "error", main);
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

    openModal.addEventListener("click", () => {
      modal.classList.remove("hidden");
      // Es para hacer mas fluida la animacion del modal
      setTimeout(() => {
        modal.children[0].classList.add("opacity-100", "scale-100");
      }, 50);
    });

    closeModal.addEventListener("click", () => {
      modal.children[0].classList.remove("opacity-100", "scale-100");
      // Y esto tambien para hacer mas fluida la animacion para el modal
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 300);
    });

    formulario.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevenir el evento de default que es POST
      // Seleccionar todos los campos del form
      const nombre = document.querySelector("#name").value;
      const precio = document.querySelector("#price").value;
      const descuento = document.querySelector("#discount").value;

      const procedure = new Procedure(nombre, precio, descuento);

      // Validar usuario
      if (isEmpty(procedure)) {
        // Si realmente hay un true, entonces esta vacia y haz lo siguiente
        showAlert("¡Todos los campos son obligatorios!", "error", formulario);
        return; // hasta aqui se termina la ejecucion
      }
      showSpinner(formulario);
      // Hablando a la api
      const response = await postProcedure(dataUser, procedure);
      if (response) {
        showAlert("Paciente Registrado Con Exito", "succes", formulario);
        console.log(procedure);
        return;
      } else {
        showAlert("Error al enviar los datos", "error", formulario);
        return;
      }
    });
    printProcedure();
    btnLogOut.addEventListener('click', deleteUserSession);
    printUserName(dataUser, greeting);
  });
})();
