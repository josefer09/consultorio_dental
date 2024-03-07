export function showAlert(mensaje, tipo, selector) {
  const alertaError = document.querySelector(".bg-red-100");
  const alertaSucces = document.querySelector(".bg-green-100");

  const alerta = document.createElement("P");

  if (!alertaError && !alertaSucces) {
    // Si no hay una alerta previa, entonces crea una

    if (tipo === "error") {
      alerta.classList.add(
        "bg-red-100",
        "border-red-400",
        "text-red-700",
        "px-4",
        "py-3",
        "rounded",
        "max-w-lg",
        "mx-auto",
        "mt-6",
        "text-center"
      );
    } else {
      alerta.classList.add(
        "bg-green-100",
        "border-green-400",
        "text-green-700",
        "px-4",
        "py-3",
        "rounded",
        "max-w-lg",
        "mx-auto",
        "mt-6",
        "text-center"
      );
    }

    const alertaDiv = document.createElement("DIV");
    alertaDiv.classList.add("text-center");

    const alertaStrong = document.createElement("STRONG");
    alertaStrong.classList.add("font-bold");
    alertaStrong.textContent = `${tipo}!`;

    const alertaSpan = document.createElement("SPAN");
    alertaSpan.classList.add("block", "sm:inline");
    alertaSpan.textContent = mensaje;

    //const formulario = document.querySelector("#formulario");

    alerta.appendChild(alertaStrong);
    alerta.appendChild(alertaSpan);
    alertaDiv.appendChild(alerta);

    selector.appendChild(alertaDiv);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

export function isEmpty(obj) {
  return !Object.values(obj).every((input) => input !== ""); // Esto me dara true debido al ! del inicio, es un object method true
}

export function cleanHTML(selector) {
  while (selector.firstChild) {
    // Mientras haya algo en ese selector
    selector.removeChild(selector.firstChild);
  }
}
export function showSpinner(selector) {
  cleanHTML(selector); // Esto es para que puedas pasar de parametro donde quieres que limpie antes de poner el spinner
  const spinner = document.createElement("DIV");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
    <div class="sk-chase">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>`;

  selector.appendChild(spinner);
}

export function anyToken() {
  const tokenUser = localStorage.getItem("user");
  console.log(tokenUser);
  if (tokenUser) {
    // Valida si hay algun token del lado del cliente
    const dataUser = JSON.parse(tokenUser); // Obtenemos el objeto con la info del user
    return dataUser;
  } else {
    window.location.href = "../views/login.html";
  }
}

export function deleteUserSession() {
  // Obtenemos la info de sesion desde localstorage
  const userSession = localStorage.getItem('user');
  const dataUser = JSON.parse(userSession);
  console.log(dataUser.userName);
  const {userName} = dataUser;

  const logOut = confirm(`¿Desea Cerrar Sesión ${userName}?`); // El aceptar da true
  if(logOut) {
    console.log('Cerrando sesion');
    localStorage.removeItem('user'); // Eliminamos toda info del lado del cliente
    localStorage.removeItem('id_user'); // Eliminamos toda info del lado del cliente
    window.location.href = '../views/login.html';
    return;
  } else {
    console.log('No cerrando sesion');
    return;
  }
  return;
}

export function printUserName(dataUser, selectElement) {
  const { userName } = dataUser;

  const nameInput = document.createElement("H2");
  nameInput.textContent = "Bienvienido/a ";
  nameInput.classList.add("text-white", "tracking-wide", "text-2xl", "mt-2");

  const nameSpan = document.createElement("SPAN");
  nameSpan.textContent = userName;
  nameSpan.classList.add("font-bold");

  nameInput.appendChild(nameSpan);
  selectElement.appendChild(nameInput);
}

export function printUserNameDoctor(dataUser, selectElement) {
  const { userName } = dataUser;

  const nameInput = document.createElement("H2");
  nameInput.textContent = "Bienvienido Doctor/a ";
  nameInput.classList.add("text-white", "tracking-wide", "text-2xl", "mt-2");

  const nameSpan = document.createElement("SPAN");
  nameSpan.textContent = userName;
  nameSpan.classList.add("font-bold");

  nameInput.appendChild(nameSpan);
  selectElement.appendChild(nameInput);
}

/**
 * Metodo para validar de forma rapida la respuestas de API
 * @param {*} response La respuesta que va a validar
 * @param {*} type El tipo de accion, como crear, eliminar o actualizar
 * @param {*} name Nombre del objeto al que se le esta aplicando
 * @param {*} selector Selector HTML al que se hara appendChild
 * @returns 
 */
export function validateStatus(response, type, name, selector) {
  const { status } = response;

  switch (type) {
    case 'create':
      if (status === "succes") {
        showAlert(`Exito al crear un ${name}`, "Exito", selector);
        setTimeout(() => {
          location.reload();
        }, 3000);
        return;
      } else {
        showAlert(`Error al crear un ${name}`, "error", selector);
        setTimeout(() => {
          location.reload();
        }, 3000);
        return;
      }
      break;

      case 'delete':
      if (status === "succes") {
        showAlert(`Exito al eliminar un ${name}`, "Exito", selector);
        setTimeout(() => {
          location.reload();
        }, 3000);
        return;
      } else {
        showAlert(`Error al eliminar un ${name}`, "error", selector);
        setTimeout(() => {
          location.reload();
        }, 3000);
        return;
      }
      break;

      case 'update':
      if (status === "succes") {
        showAlert(`Exito al actualizar un ${name}`, "Exito", selector);
        setTimeout(() => {
          location.reload();
        }, 3000);
        return;
      } else {
        showAlert(`Error al actualizar un ${name}`, "error", selector);
        setTimeout(() => {
          location.reload();
        }, 3000);
        return;
      }
      break;

    default:
      break;
  }
  
}
