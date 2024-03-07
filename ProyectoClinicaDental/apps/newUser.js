import { showAlert, isEmpty, showSpinner, cleanHTML } from "./funciones.js";
import { login, postNewUser } from "../API/login.js";
import { User } from "./class.js";

(function(){
    const formulario = document.querySelector("#formulario-new-user");
    const url = "http://localhost:3000/auth";
    
    formulario.addEventListener("submit", async (event) => {
      event.preventDefault();
      // Elementos del HTML
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const userName = document.querySelector('#userName').value;
      const spinner = document.querySelector("#spinner");
    
      // Creacion de objeto de usuario
      const user = new User(email, password, undefined, userName, "Normal");
    
    
      // Validar si el usuario esta vacio al enviar
      if (isEmpty(user)) {
        // Si da true, es pq hay campos vacios
        console.log("Campos vacios");
        showAlert("Todos los campos son obligatorios", "error", formulario);
        return;
      }
      console.log(user);
      showSpinner(spinner);
    
      // Ahora toca hablarle a la api ya que a este punto la validacion fue exitosa y ya tenemos un usuario
        const newUser = await postNewUser(user); // retorna un usuario desde la API
        //showAlert('Verificació Exitosa', 'Exito');
    
        if (newUser) {
            showAlert('Nuevo usuario creado', 'Exito', formulario);
            setTimeout(() => {
                window.location.href = '../views/login.html';
            }, 3000);
          return;
        } else {
          cleanHTML(spinner);
          showAlert('Credenciales Invalidas', 'error', formulario);
          return;
        }
    });
})();