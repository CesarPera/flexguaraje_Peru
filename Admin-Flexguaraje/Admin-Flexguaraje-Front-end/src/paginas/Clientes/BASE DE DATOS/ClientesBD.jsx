import axios from "axios";

const BUSCAR_CLIENTE_DNI_BD_REST_API_URL = "http://127.0.0.1:8080/cliente/buscar_cliente_dni";
const BUSCAR_CLIENTE_NC_BD_REST_API_URL = "http://127.0.0.1:8080/cliente/buscar_cliente_nombreCompleto";

class ClientesBD {

    // Método para buscar por DNI
    static async buscarPorDni(dni) {
        try {
            const response = await axios.post(BUSCAR_CLIENTE_DNI_BD_REST_API_URL, { dni });
            return response.data; // Retorna los datos del cliente
        } catch (error) {
            console.error("Error al buscar por DNI:", error);
            throw error; // Lanza el error para que se pueda manejar en el lugar que lo invoque
        }
    }

    // Método para buscar por nombre completo
    static async buscarPorNombreCompleto(nombre, apellido) {
        try {
            const response = await axios.post(BUSCAR_CLIENTE_NC_BD_REST_API_URL, { nombre, apellido });
            return response.data; // Retorna los datos del cliente
        } catch (error) {
            console.error("Error al buscar por nombre completo:", error);
            throw error; // Lanza el error para que se pueda manejar en el lugar que lo invoque
        }
    }

}

export default ClientesBD;
