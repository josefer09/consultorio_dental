const url = "http://localhost:3000";
let userLoging = {};
import { cleanHTML, showAlert } from "../apps/funciones.js";

export const getSpecialtys = async (user) => {
    const { email, token } = user;
    try {
      const response = await fetch(`${url}/specialtys`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
      });
  
      const data = await response.json();
  
      if (response.status === 401) {
        console.log("Token invalido");
        return;
      } else {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getSpecialty = async (user, idSpecialty) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/specialtys/${idSpecialty}`, {
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
      console.log(error);
      return error;
    }
  };
  
  export const postNewSpecialty = async (user, specialty) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/specialtys`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(specialty),
      });
  
      const data = await response.json();
      console.log(data); // Para ver la respuesta del servidor en la consola
  
      // Si la respuesta es exitosa, entonces redirige
      if (response.ok) {
        return data;
      } else {
        console.error("Error al enviar los datos:", response.status);
        const errorData = await response.json();
        console.error("Mensaje de error:", errorData.message);
        return data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  export const deleteSpecialty = async (user, idSpecialty) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/specialtys/${idSpecialty}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify(idSpecialty),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  export const updateSepcialty = async (user, idSpecialty, updateData) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/specialtys/${idSpecialty}`, {
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
      return;
    }
  };