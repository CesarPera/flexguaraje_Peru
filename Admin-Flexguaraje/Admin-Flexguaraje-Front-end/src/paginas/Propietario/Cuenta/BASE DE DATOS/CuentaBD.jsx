import axios from "axios";


const LISTAR_CUENTA_BD_API_URL = "http://127.0.0.1:8080/cuentas/listar_cuentas";
const CREAR_CUENTA_BD_API_URL = "http://127.0.0.1:8080/cuentas/crear_cuenta";
const ACTUALIZAR_ESTADO_CUENTA_BD_API_URL = "http://127.0.0.1:8080/cuentas/actualizar_estado_cuenta";
const ACTUALIZAR_PASS_AUTO_BD_API_URL = "http://127.0.0.1:8080/cuentas/actualizar_pass_automatico";

class CuentaBD {
    listarCuentas() {
        return axios.get(LISTAR_CUENTA_BD_API_URL);
    }
    
    crearCuenta = async (cuenta) => {
        console.log("Datos enviados al backend para crear cuenta:", cuenta);
        return axios.post(CREAR_CUENTA_BD_API_URL, cuenta);
    }

    actualizarEstadoCuenta = async (dni) => {
        console.log("Actualizando estado para DNI:", dni);
        return axios.put(ACTUALIZAR_ESTADO_CUENTA_BD_API_URL, { dni });
    }

    actualizarPassAuto = async (dni, correo) => {
        console.log("Enviando al backend:", { dni, correo });
        return axios.put(ACTUALIZAR_PASS_AUTO_BD_API_URL, { dni, correo });
    }
}


export default new CuentaBD();
