import axios from "axios";

const BD_API_REST_URL = {
    LISTAR_GENERAL: "http://localhost:8080/solicitudes/listar_solicitud",
    BUSCAR_SOLICITUD_DNI: "http://localhost:8080/solicitudes/buscar_dni_solicitud",
    BUSCAR_SOLICITUD_CODIGO: "http://localhost:8080/solicitudes/buscar_codigo_solicitud",
    CREAR_SOLICITUD: "http://localhost:8080/solicitudes/crear_solicitud",
    ACTUALIZAR_SOLICITUD: "http://localhost:8080/solicitudes/actualizar_solicitud",
    RESPONDER_SOLICITUD: "http://localhost:8080/solicitudes/responder_solicitud"
}

class SolicitudesBD {
    buscarSolicitudesPorDni(dni) {
        return axios.post(BD_API_REST_URL.BUSCAR_SOLICITUD_DNI, { dni });
    }

}

export default new SolicitudesBD();
