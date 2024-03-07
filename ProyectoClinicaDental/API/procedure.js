const url = "http://localhost:3000";
let userLoging = {};
import { cleanHTML, showAlert } from "../apps/funciones.js";

export const getProcedures = async user => {
    const {token} = user;
    console.log(token);
    const main = document.querySelector('#main');
    try {
      const response = await fetch(`${url}/procedures`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': `${token}`
        }
      });
      
      const data = await response.json();
      if(response.status === 401) {
        console.log('Token invalido');
        showAlert('Sesion Expirada', 'error', main);
         setTimeout(() => {
           window.location.href = '../views/login.html';
         }, 3000);
        return;
      } else {
        return data;
        // Si todo sale bien, regresa data, que es la respuesta obtenida del fetch pero convertida a json
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      //showAlert('Servidor Caido', 'ERROR', formulario)
      return;
    }
  
  }
  
  export const deleteProcedure = async (user, idProcedure) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/procedures/${idProcedure}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization': `${token}`
        },
        body: JSON.stringify(idProcedure)
      });
      const data = await response.json();
      if(response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  
  export const postProcedure = async (user, procedure) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/procedures`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(procedure)
      })
      
      const data = await response.json();
      console.log(data); // Para ver la respuesta del servidor en la consola
  
      // Si la respuesta es exitosa, entonces redirige
      if (response.ok) {
      userLoging = user;
      window.location.href = '../views/procedure.html';
  
      return true;
      } else {
        console.error('Error al enviar los datos:', response.status);
        showAlert('Error al enviar los datos', 'error', formulario);//linea 400
        const errorData = await response.json();
        console.error('Mensaje de error:', errorData.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      return response.status;//linea 4
    }
  }
  
  export const getProcedureById = async (user, id) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/procedures/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': `${token}`
        }
      });
      
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
      
  }
  
  export const updateProcedureById = async (user, id, updateData) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/procedures/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }