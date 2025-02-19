import axios from "axios";

const BUSCAR_SOLICITUDES_COD_URL = "http://localhost:8080/solicitudes/buscar_codigo";
const BUSCAR_SOLICITUDES_DNI_URL = "http://localhost:8080/solicitudes/buscar_dni";
const CREAR_RESPUESTAS_URL = "http://localhost:8080/solicitudes/crear_respuesta";
const LISTAR_SOLICITUDES_URL = "http://localhost:8080/solicitudes/listar";
const CREAR_SOLICITUDES_URL = "http://localhost:8080/solicitudes/crear";
const ACTUALIZAR_SOLICITUDES_URL = "http://localhost:8080/solicitudes/actualizar";

class SolicitudesBD {
    // Buscar solicitud por código
    buscarPorCodigo(codigo) {
        return axios.get(`${BUSCAR_SOLICITUDES_COD_URL}/${codigo}`);
    }

    // Buscar solicitud por DNI
    buscarPorDni(dni) {
        return axios.get(`${BUSCAR_SOLICITUDES_DNI_URL}/${dni}`);
    }

    // Crear una nueva solicitud
    crearSolicitud(solicitud) {
        return axios.post(CREAR_SOLICITUDES_URL, solicitud);
    }

    // Crear una respuesta a una solicitud
    crearRespuesta(respuesta) {
        return axios.post(CREAR_RESPUESTAS_URL, respuesta);
    }

    // Listar todas las solicitudes
    listarSolicitudes() {
        return axios.get(LISTAR_SOLICITUDES_URL);
    }

    // Actualizar una solicitud existente
    actualizarSolicitud(id, solicitud) {
        return axios.put(`${ACTUALIZAR_SOLICITUDES_URL}/${id}`, solicitud);
    }
}

export default new SolicitudesBD();
