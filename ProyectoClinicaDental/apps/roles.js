import {
  anyToken,
  showAlert,
  showSpinner,
  printUserName,
  isEmpty,
  deleteUserSession,
} from "./funciones.js";
import {
  getRoles,
  postNewRole,
  deleteRole,
  getRoleById,
  updateRole,
} from "../API/roles.js";
import { Role } from "./class.js";

(function () {
  // Variables Globales
  const list = document.querySelector("#role-list");
  const modalRole = document.querySelector("#myModalRole");
  const modalRoleEdit = document.querySelector("#myModalRoleEdit");
  const openModalRole = document.querySelector("#openModalRole");
  const closeModalRole = document.querySelector("#closeModalRole");
  const openModalRoleEdit = document.querySelector("#openModalRoleEdit");
  const closeModalRoleEdit = document.querySelector("#closeModalRoleEdit");
  const greeting = document.querySelector("#welcome");
  const formulario = document.querySelector("#formularioRole");
  const formularioEdit = document.querySelector("#formularioRoleEdit");
  const btnLogOut = document.querySelector("#logOut");


  document.addEventListener("DOMContentLoaded", async () => {
    document.addEventListener("click", confirmDeleteRole);
    document.addEventListener("click", editRole);

    // Llamadas a la API
    const dataUser = await anyToken();
    console.log(dataUser);
    // Llamadas a los metodos de la API
    const roles = await getRoles(dataUser);

    /**
     * Metodo para imprimir los elementos de la tabla de roles
     * @param {*} roles
     */
    async function printRoles(roles) {
      roles.forEach((rol) => {
        const { id_userRole, name } = rol;
        console.log(name);
        // Construccion del objeto Rol
        const row = document.createElement("TR");
        row.innerHTML += `
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                      <a href="#" data-role="${id_userRole}" class="text-teal-600 hover:text-teal-900 mr-5 editar">Editar</a>
                      <a href="#" data-role="${id_userRole}" class="text-red-600 hover:text-red-900 mr-5 eliminar">Eliminar</a>
                  </td>
              `;

        list.appendChild(row);
      });
    }

    async function editRole(e) {
      if (e.target.classList.contains("editar")) {
        const roleEditedId = parseInt(e.target.dataset.role);
        console.log(roleEditedId);
        const roleById = await getRoleById(dataUser, roleEditedId);
        console.log(roleById);

        // Mostramos el modal
        modalRoleEdit.classList.remove("hidden");
        setTimeout(() => {
          modalRoleEdit.children[0].classList.add("opacity-100", "scale-100");
        }, 50);

        // Seleccionamos los inputs
        const { id_userRole, name } = roleById;
        document.querySelector("#nameRoleEdit").value = name;

        // Ahora le toca al formulario
        formularioEdit.addEventListener("submit", async (e) => {
          e.preventDefault();
          console.log("Desde form edit");
          const nameEdited = document.querySelector("#nameRoleEdit").value;
          const roleEdited = new Role(nameEdited);

          if (isEmpty(roleEdited)) {
            showAlert("No se permiten campos vacios", "error", formularioEdit);
            return;
          } else {
            showSpinner(formulario)
            // Consulta a la API
            const updateRoleEdited = await updateRole(
              dataUser,
              id_userRole,
              roleEdited
            );
            console.log(updateRoleEdited);
            if(updateRoleEdited.status === 'succes') {
              showAlert('Registro Actualizado Correctamente', 'Exito', formularioEdit);
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
            return;
          }
        });
        return;
      }
      return;
    }

    async function confirmDeleteRole(e) {
      if (e.target.classList.contains("eliminar")) {
        const roleDeletedId = parseInt(e.target.dataset.role);
        console.log(roleDeletedId);
        const roleById = await getRoleById(dataUser, roleDeletedId);
        console.log(roleById);

        const confirmar = confirm(
          `¿Desea eliminar el registro ${roleById.name}?`
        );
        if (confirmar) {
          try {
            const exito = await deleteRole(dataUser, roleDeletedId);

            if (exito) {
              console.log("Rol eliminado correctamente");
              showAlert("Registro eliminado con exito", "Exito", main);
              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              console.error("Error al eliminar al empleado");
              showAlert("Error al eliminar al empleado", "error", main);
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

    openModalRole.addEventListener("click", () => {
      modalRole.classList.remove("hidden");
      setTimeout(() => {
        modalRole.children[0].classList.add("opacity-100", "scale-100");
      }, 50);
    });

    closeModalRole.addEventListener("click", () => {
      modalRole.children[0].classList.remove("opacity-100", "scale-100");
      setTimeout(() => {
      modalRole.classList.add("hidden");
      }, 300);
    });

    closeModalRoleEdit.addEventListener("click", () => {
      modalRoleEdit.children[0].classList.remove("opacity-100", "scale-100");
      setTimeout(() => {
      modalRoleEdit.classList.add("hidden");
      }, 300);
    });

    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.querySelector("#nameRole").value;
      const newRole = {
        name,
      };
      if (isEmpty(newRole)) {
        console.log("Esta vacio");
        showAlert("El campo es obligatorio", "error", formulario);
        return;
      } else {
        console.log(newRole);
        showSpinner(formulario);
        const createRole = await postNewRole(dataUser, newRole);
        if (createRole) {
          showAlert("Exito, Nuevo Rol Creado", "exito", formulario);
          setTimeout(() => {
            location.reload();
          }, 2000);
          return;
        }
        return;
      }
    });
    
    btnLogOut.addEventListener("click", deleteUserSession);
    printRoles(roles);
    printUserName(dataUser, greeting);
  });
})();
