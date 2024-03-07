import { showAlert, isEmpty, showSpinner, cleanHTML } from "./funciones.js";
import { login } from "../API/login.js";
import { User, UserSession } from "./class.js";
const formulario = document.querySelector("#formulario");
const url = "http://localhost:3000/auth";

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Desde funcion vacio");
  // Elementos del HTML
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const spinner = document.querySelector("#spinner");

  // Creacion de objeto de usuario
  const user = new User(email, password);


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
    const userToken = await login(user); // retorna un usuario desde la API

    // Si hay una respuesta satisfactoria, obtendremos 2 datos, el token y el usuario logeado
    if (userToken) {

      // Entonces haremos un nuevo usuario y le daremos el valor de token para este pasarlo al localstorage
      const {email, type, userName} = userToken.user; // Destructuring
      // Creo una variable para asignarle el token
      const token = userToken.token;
      // Le paso los datos al nuevo objeto de tipo userSession
      const userSession = new UserSession(email, token, userName, type);

      console.log(userSession);

      // Guardo este objeto en el localStorage
      localStorage.setItem("user", JSON.stringify(userSession)); // Para no pasar informacion delicada del lado del cliente
      localStorage.setItem('id_user', userToken.user.id_user);

      // Dependiendo del tipo de usuario logeado, lo mandaremos a su respectivo HTML
      switch (userSession.type) {
        case 'Normal':
          window.location.href = '../views/userAppointment.html';
          break;

          case 'Admin':
            window.location.href = '../views/administration.html';
          break;

          case 'Doctor':
            window.location.href = '../views/doctor.html';
          break;
      
        default:
          break;
      }
      return;
    } else {
      cleanHTML(spinner);
      showAlert('Credenciales Invalidas', 'error', formulario);
      return;
    }
});
