const url = "http://localhost:3000";
let userLoging = {};
import { cleanHTML, showAlert } from "../apps/funciones.js";

export const getRoles = async (user) => {
    const { email, token } = user;
    console.log(token);
    const main = document.querySelector("#main");
    try {
      const response = await fetch(`${url}/roles`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
      });
  
      const data = await response.json();
      if (response.status === 401) {
        console.log("Token invalido");
        showAlert("Sesion Expirada", "error", main);
        setTimeout(() => {
          window.location.href = "../views/login.html";
        }, 3000);
        return;
      } else {
        return data;
        // Si todo sale bien, regresa data, que es la respuesta obtenida del fetch pero convertida a json
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      //showAlert('Servidor Caido', 'ERROR', formulario)
      return;
    }
  };
  
  export const getRoleById = async (user, idRole) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/roles/${idRole}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
      });
  
      const data = await response.json();
      if (response.status === 401) {
        console.log("Token invalido");
        showAlert("Sesion Expirada", "error", main);
        setTimeout(() => {
          window.location.href = "../views/login.html";
        }, 3000);
        return;
      } else {
        return data;
        // Si todo sale bien, regresa data, que es la respuesta obtenida del fetch pero convertida a json
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      //showAlert('Servidor Caido', 'ERROR', formulario)
      return;
    }
  };
  
  export const postNewMedicalNotes = async (user, medicalNote) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/medicalNotes`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(medicalNote),
      });
  
      const data = await response.json();
      console.log(data); // Para ver la respuesta del servidor en la consola
      return data;
    } catch (error) {
      console.log(error);
      return response.status;
    }
  };
  
  export const deleteRole = async (user, idRole) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/roles/${idRole}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify(idRole),
      });
      const data = await response.json();
      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateRole = async (user, idRole, updateData) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/roles/${idRole}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };