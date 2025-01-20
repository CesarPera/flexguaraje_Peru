import axios from "axios";

const LOGIN_BD_API_REST_URL = "http://localhost:8080/cuenta/login";
const CAMBIO_PASS_BD_API_REST_URL = "http://localhost:8080/cuenta/cambiar_contraseña";

class LoginBD {

  // Método para autenticar al usuario
  login(email, password) {
    const credentials = `${email}:${password}`;  // Asegúrate de que las credenciales estén dentro de un template literal
    const base64Credentials = btoa(credentials); // Codificar las credenciales en base64

    return axios.post(LOGIN_BD_API_REST_URL, null, {
      headers: {
        "Authorization": `Basic ${base64Credentials}`,  // Corregir el formato del encabezado Authorization
      }
    })
    .then(response => {
      return response.data; // Si la autenticación es exitosa
    })
    .catch(error => {
      if (error.response) {
        throw new Error(error.response.data); // Si hay un error en el servidor
      } else {
        throw new Error("Error de red o configuración"); // En caso de problemas de red
      }
    });
  }

  // Método para cambiar la contraseña
  cambiarPassword(email, passwordActual, nuevaPassword, repetirNuevaPassword) {
    const data = {
      email: email,
      passwordActual: passwordActual,
      nuevaPassword: nuevaPassword,
      repetirNuevaPassword: repetirNuevaPassword
    };

    return axios.put(CAMBIO_PASS_BD_API_REST_URL, data)
    .then(response => {
      return response.data; // Si la actualización de la contraseña es exitosa
    })
    .catch(error => {
      if (error.response) {
        throw new Error(error.response.data); // Si hay un error en el servidor
      } else {
        throw new Error("Error de red o configuración"); // En caso de problemas de red
      }
    });
  }
}

export default new LoginBD();
