import axios from "axios";

// URLs de la API REST
const LOGIN_BD_API_REST_URL = "http://127.0.0.1:8080/validacion/login";
const CAMBIO_PASS_BD_API_REST_URL = "http://127.0.0.1:8080/validacion/cambiar_pass";

class LoginBD {

  // Método para autenticar al usuario
  login(email, password) {
    const credentials = `${email}:${password}`;
    const base64Credentials = btoa(credentials); // Codifica las credenciales en Base64
    
    return axios.post(LOGIN_BD_API_REST_URL, {}, {
      headers: {
        Authorization: `Basic ${base64Credentials}` // Agrega las credenciales al encabezado Authorization
      }
    })
    .then(response => {
      // Aquí puedes manejar la respuesta si la autenticación es exitosa
      console.log("Login exitoso:", response.data);
      return response.data;
    })
    .catch(error => {
      // Manejo de errores (credenciales incorrectas, error del servidor, etc.)
      if (error.response) {
        console.error("Error en el login:", error.response.data);
        throw new Error(error.response.data);
      } else {
        console.error("Error de red o conexión:", error.message);
        throw new Error("Error de red o conexión");
      }
    });
  }

  // Método para cambiar la contraseña
  cambiarContraseña(email, passwordActual, nuevaPassword, repetirNuevaPassword) {
    // Validación de las contraseñas
    if (nuevaPassword !== repetirNuevaPassword) {
      throw new Error("Las contraseñas nuevas no coinciden");
    }

    // Validación adicional: Contraseña actual no debe ser igual a la nueva
    if (passwordActual === nuevaPassword) {
      throw new Error("La nueva contraseña no puede ser igual a la actual");
    }

    // Preparar los datos para el cambio de contraseña
    const datos = {
      email,
      passwordActual,
      nuevaPassword,
      repetirNuevaPassword
    };

    return axios.put(CAMBIO_PASS_BD_API_REST_URL, datos)
      .then(response => {
        console.log("Contraseña cambiada con éxito:", response.data);
        return response.data;
      })
.catch(error => {
  console.error("Error de conexión o red:", error);
  if (error.response) {
    console.error("Error del servidor:", error.response.data);
    throw new Error(error.response.data); // Error detallado del servidor
  } else {
    console.error("Error de red o conexión:", error.message);
    throw new Error("Error de red o conexión");
  }
      });
  }
}

export default new LoginBD();
