import {
  anyToken,
  showAlert,
  showSpinner,
  printUserName,
  isEmpty,
  validateStatus,
  deleteUserSession,
} from "./funciones.js";
import { getSpecialtys, postNewSpecialty, deleteSpecialty, getSpecialty, updateSepcialty } from "../API/specialty.js";
import { Specialty } from "./class.js";

(function () {
  // Variables Globales
  const list = document.querySelector("#role-list");
  const listSpecialtys = document.querySelector("#specialty-list");
  const modal = document.querySelector("#myModal");
  const openModal = document.querySelector("#openModal");
  const closeModal = document.querySelector("#closeModal");
  const greeting = document.querySelector("#welcome");
  const formulario = document.querySelector('#formulario');
  const formularioEdit = document.querySelector('#formularioEdit');
  const modalEdit = document.querySelector('#myModalEdit');
  const closeModalEdit = document.querySelector('#closeModalEdit');
  const btnLogOut = document.querySelector('#logOut');

  document.addEventListener("DOMContentLoaded", async () => {
    document.addEventListener('click', confirmDelete);
    document.addEventListener('click', editSpecialty);
    const dataUser = await anyToken();
    console.log(dataUser);

    const specialtys = await getSpecialtys(dataUser);

    /**
     * Metodo para imprimir los elementos de la tabla de especialidades
     * @param {*} specialtys
     */
    async function printSpecialty(specialtys) {
      specialtys.forEach((specialty) => {
        const { id_userSpecialty, name } = specialty;
        console.log(id_userSpecialty, name);

        const row = document.createElement("TR");
        row.innerHTML += `
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="#" data-specialty="${id_userSpecialty}" class="text-teal-600 hover:text-teal-900 mr-5 editar">Editar</a>
                        <a href="#" data-specialty="${id_userSpecialty}" class="text-red-600 hover:text-red-900 mr-5 eliminar">Eliminar</a>
                    </td>
                `;

        listSpecialtys.appendChild(row);
      });
    }

    async function confirmDelete(e) {
      if (e.target.classList.contains("eliminar")) {
        const specialtyDeleted = parseInt(e.target.dataset.specialty);
        console.log(specialtyDeleted);
        const specialtyById = await getSpecialty(dataUser, specialtyDeleted);
        console.log(specialtyById);

        const confirmar = confirm(
          `¿Desea eliminar el registro ${specialtyById.name}?`
        );
        if (confirmar) {
            const responseDelted = await deleteSpecialty(dataUser, specialtyDeleted);
            validateStatus(responseDelted, 'delete', 'Especialidad', main);
            return;
        } else {
          console.log("No se eliminó");
          return;
        }
      }
    }

    async function editSpecialty(e) {
      if (e.target.classList.contains("editar")) {
        const specialtyEditedId = parseInt(e.target.dataset.specialty);
        console.log(specialtyEditedId);
        const specialtyById = await getSpecialty(dataUser, specialtyEditedId);
        console.log(specialtyById);

        // Mostramos el modal
        modalEdit.classList.remove("hidden");
        setTimeout(() => {
          modalEdit.children[0].classList.add("opacity-100", "scale-100");
        }, 50);

        // Seleccionamos los inputs
        const { id_userSpecialty, name } = specialtyById;
        document.querySelector("#nameEdit").value = name;

        // Ahora le toca al formulario
        formularioEdit.addEventListener("submit", async (e) => {
          e.preventDefault();
          console.log("Desde form edit");
          const nameEdited = document.querySelector("#nameEdit").value;
          // Construccion del objeto
          const specialtyEdited = new Specialty(nameEdited);

          if (isEmpty(specialtyEdited)) {
            showAlert("No se permiten campos vacios", "error", formularioEdit);
            return;
          } else {
            showSpinner(formularioEdit)
            // Consulta a la API
            const updateSpecialtyEdited = await updateSepcialty(
              dataUser,
              id_userSpecialty,
              specialtyEdited
            );
            console.log(updateSpecialtyEdited);
            validateStatus(updateSpecialtyEdited, 'update', 'Especialidad', formularioEdit);
            return;
          }
        });
        return;
      }
      return;
    }

    openModal.addEventListener("click", () => {
      modal.classList.remove("hidden");
      setTimeout(() => {
        modal.children[0].classList.add("opacity-100", "scale-100");
      }, 50);
    });

    closeModal.addEventListener("click", () => {
      modal.children[0].classList.remove("opacity-100", "scale-100");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 300);
    });

    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Obtengo el nombre del selector
      const name = document.querySelector('#name').value;
      console.log(name);

      // Construccion del objeto
      const specialty = new Specialty(name);
      console.log(specialty);

      if(isEmpty(specialty)) {
        showAlert('Todos los campos estan vacios', 'error', formulario);
        return;
      }
      showSpinner(formulario);
      // Enviar el objeto a la API
      const createSpecialty = await postNewSpecialty(dataUser, specialty);
      console.log(createSpecialty);
      validateStatus(createSpecialty, 'create', 'Especialidad', formulario);
      return;
    });

    printSpecialty(specialtys);
    btnLogOut.addEventListener('click', deleteUserSession);
    printUserName(dataUser, greeting);
  });
})();
