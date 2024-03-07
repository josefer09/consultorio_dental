const url = "http://localhost:3000";
let userLoging = {};
import { cleanHTML, showAlert } from "../apps/funciones.js";
// cuando se logea un usuario administrador
export const login = async (user) => {
  try {
    const response = await fetch(`${url}/auth`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(data); // Para ver la respuesta del servidor en la consola

    // Si la respuesta es exitosa, entonces redirige
    if (response.ok) {
      //     user.token = data.token; // Aqui al user le metemos token
      //     // enviar el token al mismo usuario correspondiente en la bd
      //     console.log(user);
      // userLoging = user;
      return data;
    } else {
      console.error("Error al enviar los datos:", response.status);
      showAlert("Credenciales Invalidas", "error", formulario);
      const errorData = await response.json();
      console.error("Mensaje de error:", errorData.message);
      return;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    showAlert("Servidor Caido", "error", formulario);
  }
};

export const postNewUser = async (user) => {


  try {
    const response = await fetch(`${url}/users`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(data); // Para ver la respuesta del servidor en la consola

    // Si la respuesta es exitosa, entonces redirige
    if (response.ok) {
      return true;
    } else {
      console.error("Error al enviar los datos:", response.status);
      const errorData = await response.json();
      console.error("Mensaje de error:", errorData.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    return response.status;
  }
};