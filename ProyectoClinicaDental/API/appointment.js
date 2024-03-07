const url = "http://localhost:3000";
let userLoging = {};
import { cleanHTML, showAlert } from "../apps/funciones.js";

export const postNewAppointment = async (user, appointment) => {
  const { email, token } = user;
  try {
    const response = await fetch(`${url}/appointments`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(appointment),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return;
  }
};

export const getAppointments = async (user) => {
  const { email, token } = user;
  try {
    const response = await fetch(`${url}/appointments`, {
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
    return;
  }
};

export const deleteAppointment = async (user, idAppointment) => {
  const { email, token } = user;
  try {
    const response = await fetch(`${url}/appointments/${idAppointment}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `${token}`,
      },
      body: JSON.stringify(idAppointment),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getAppointment = async (user, idAppointment) => {
  const { email, token } = user;
  try {
    const response = await fetch(`${url}/appointments/${idAppointment}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = await response.json();
      return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    //showAlert('Servidor Caido', 'ERROR', formulario)
    return;
  }
};

export const getAppointmentByIdUser = async (user, idUser) => {
  const { email, token } = user;
  try {
    const response = await fetch(`${url}/appointments/user/${idUser}`, {
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

export const updateAppointment = async (user, idAppointment, updateData) => {
  const { email, token } = user;
  try {
    const response = await fetch(`${url}/appointments/${idAppointment}`, {
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
    return;
  }
}