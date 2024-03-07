import { Procedure } from "./class.js";
import { getProcedureById, updateProcedureById } from "../API/procedure.js";
import { anyToken, cleanHTML, isEmpty, showAlert, showSpinner } from "./funciones.js";

const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const discountInput = document.querySelector("#discount");

(function () {
    document.addEventListener("DOMContentLoaded", async () => {
      const dataUser = await anyToken();
  
      const paramURL = new URLSearchParams(window.location.search);
  
      const idProcedure = parseInt(paramURL.get("id"));
  
      // Consulta a la API
      const patient = await getProcedureById(dataUser, idProcedure);
  
      printProcedure(patient);
  
      formulario.addEventListener("submit", async (e) => {
          e.preventDefault();
  
          const name = nameInput.value;
          const price = priceInput.value;
          const discount = discountInput.value;
  
          const newProcedure = new Procedure(name, price, discount);
  
          // Validamos
          if(isEmpty(newProcedure)) {
              showAlert("¡Todos los campos son obligatorios!", "error", formulario);
              return;
          }
  
          showSpinner(formulario)
          // Llamada a la api para editar
          const response = await updateProcedureById(dataUser, idProcedure, newProcedure);
          if(response.status === 'succes') {
              showAlert('Procedimiento Actualizado Con Exito', 'Exito', formulario);
              setTimeout(() => {
                  window.location.href = '../views/procedure.html'; 
              }, 2000);
              return;
          }
          return;
      });
  
      function printProcedure(procedure) {
          // Destructuring
          const {id_procedimiento, nombre, precio, descuento} = procedure;
          nameInput.value = nombre;
          priceInput.value = precio;
          discountInput.value = descuento;
        }
    });
  })();