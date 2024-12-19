import axios from "axios";

const LISTAR_BOLETAS_BD_API_URL = "http://127.0.0.1:8080/boletas/listarboleta";
const AGREGAR_BOLETAS_BD_API_URL = "http://127.0.0.1:8080/boletas/agregarboletas";
const ACTUALIZAR_BOLETAS_BD_API_URL = "http://127.0.0.1:8080/boletas/actualizar";
const ELIMINAR_BOLETA_BD_API_URL = "http://127.0.0.1:8080/boletas/eliminarboleta";

class BoletasBD {
    getAllBoletas() {
        return axios.get(LISTAR_BOLETAS_BD_API_URL);
    }
 
    agregarBoleta(boleta) {
        return axios.post(AGREGAR_BOLETAS_BD_API_URL, boleta);
    }

    actualizarBoleta(boletaActualizada) {
        return axios.put(ACTUALIZAR_BOLETAS_BD_API_URL, boletaActualizada);
    }

    eliminarBoleta(idBoleta) {
        return axios.delete(ELIMINAR_BOLETA_BD_API_URL, {
            data: { idBoleta }
        });
    }
}

// Se exporta la instancia de la clase (instancia única)
export default new BoletasBD();