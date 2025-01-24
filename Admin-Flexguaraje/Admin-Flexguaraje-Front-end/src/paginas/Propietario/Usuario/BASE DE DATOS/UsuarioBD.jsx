import axios from "axios";



BD_USUARIO_API_REST_URL = {
    LISTAR: "http://127.0.0.1:8080/usuario/listar_usuario_general",
    BUSCAR_DNI: "http://127.0.0.1:8080/usuario/buscar_usuario_dni",
    CREAR: "http://127.0.0.1:8080/usuario/crear_usuario",
    ACTUALIZAR: "http://127.0.0.1:8080/usuario/actualizar_usuario"
}

class UsuarioBD {

}

export default new UsuarioBD();