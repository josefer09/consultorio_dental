const url = "http://localhost:3000";
let userLoging = {};
import { cleanHTML, showAlert } from "../apps/funciones.js";

export const getNameByUser = async (user) => {
    const { email, token } = user;
    try {
      const response = await fetch(`${url}/users`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
      });
  
      const data = await response.json(); // Respuesta de la consulta a la API
  
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
    } catch (error) {}
};
  export { userLoging };
    
    export const getPatients = async user => {
    const {email, token} = user;
    console.log(token);
    const main = document.querySelector('#main');
    try {
      const response = await fetch(`${url}/patients`, {
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
  
  export const getPatientById = async (user, id) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/patients/${id}`, {
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
  
  export const updatePatientById = async (user, id, updateData) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/patients/${id}`, {
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
  
  export const postPatient = async (user, patient) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/patients`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(patient)
      })
      
      const data = await response.json();
      console.log(data); // Para ver la respuesta del servidor en la consola
  
      // Si la respuesta es exitosa, entonces redirige
      if (response.ok) {
      userLoging = user;
      window.location.href = '../views/patient.html';
  
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
      return;//linea 4
    }
  }
  
  export const deletePatient = async (user, Idpatient) => {
    const {email, token} = user;
    try {
      const response = await fetch(`${url}/patients/${Idpatient}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization': `${token}`
        },
        body: JSON.stringify(Idpatient)
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
  
  export const GenderEnum = {
    Masculino: 1,
    Femenino: 2,
    Otro: 3,
  }