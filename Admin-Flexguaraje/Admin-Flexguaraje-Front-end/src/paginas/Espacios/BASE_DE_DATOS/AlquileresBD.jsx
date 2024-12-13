import axios from "axios"

const LISTAR_ALQUILERES_BD_REST_API_URL = "http://127.0.0.1:8080/alquileres/listar_alquileres"
const AGREGAR_ALQUILERES_BD_REST_API_URL = "http://127.0.0.1:8080/alquileres/agregar_alquileres"
const ACTUALIZAR_ESTADO_ESPACIO_API_URL = "http://127.0.0.1:8080/alquileres/actualizar_estado"
const ACTUALIZAR_ALQUILERES_BD_REST_API_URL = "http://127.0.0.1:8080/alquileres/actualizar_alquiler"
const ELIMINAR_ALQUILER_BD_REST_API_URL = "http://127.0.0.1:8080/alquileres/eliminar_alquiler"

class AlquileresBD {

    getAllAlquileres() {
        return axios.get(LISTAR_ALQUILERES_BD_REST_API_URL);
    }

    agregarAlquiler(alquiler) {
        return axios.post(AGREGAR_ALQUILERES_BD_REST_API_URL, alquiler);
    }

    actualizarEstadoEspacio(codigoEspacio, nuevoEstado) {
        return axios.put(ACTUALIZAR_ESTADO_ESPACIO_API_URL, {
            codigoEspacio, nuevoEstado
        });
    }

    actualizarAlquilerBD = (codigoEspacio, alquilerActualizado) => {
        console.log("alquilerActualizado:", alquilerActualizado);

        const payload = {
            codigoEspacio,
            nuevoDniCliente: alquilerActualizado.dni,
            nuevaFechaInicio: alquilerActualizado.fechaInicio,
            nuevaFechaFin: alquilerActualizado.fechaFin
        };

        return axios.put(ACTUALIZAR_ALQUILERES_BD_REST_API_URL, payload);
    };

    eliminarAlquilerBD(codigoEspacio) {
        return axios.delete(ELIMINAR_ALQUILER_BD_REST_API_URL, {
            data: { codigoEspacio }
        });
    }
}

export default new AlquileresBD();