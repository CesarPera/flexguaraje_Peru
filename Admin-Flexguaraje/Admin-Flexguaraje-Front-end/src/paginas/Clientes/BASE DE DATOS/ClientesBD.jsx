import axios from "axios";

const BUSCAR_CLIENTE_DNI_BD_REST_API_URL = "http://127.0.0.1:8080/cliente/buscar_cliente_dni";
const BUSCAR_CLIENTE_NC_BD_REST_API_URL = "http://127.0.0.1:8080/cliente/buscar_cliente_nombreCompleto";
const CREAR_CLIENTE_BD_REST_API_URL = "http://127.0.0.1:8080/cliente/crear_cliente"

class ClientesBD {
    // crear cliente
    crearCliente(cliente) {
        return axios.post(CREAR_CLIENTE_BD_REST_API_URL, cliente);
    }

    // Buscar cliente (DNI o nombre completo)
    buscarCliente(tipoBusqueda, busqueda) {
        let url = '';
        let data = {};

        // Seleccionar la URL y los datos según el tipo de búsqueda
        if (tipoBusqueda === 'dni') {
            url = BUSCAR_CLIENTE_DNI_BD_REST_API_URL;
            data = { dni: busqueda };
        } else if (tipoBusqueda === 'nombre') {
            const [nombre, apellido] = busqueda.split(' ');
            if (!nombre || !apellido) {
                throw new Error('Por favor, ingresa el nombre completo (nombre y apellido).');
            }
            url = BUSCAR_CLIENTE_NC_BD_REST_API_URL;
            data = { nombre, apellido };
        }

        return axios.post(url, data);
    }
}

export default new ClientesBD();
