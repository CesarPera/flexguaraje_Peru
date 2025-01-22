package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Usuario;
import admin_flexguaraje.back_end.Negocio.UsuarioNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioControlador {

    @Autowired
    private UsuarioNegocio usuarioNegocio;

    @GetMapping("/listar_usuario_general")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioNegocio.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/buscar_dni")
    public ResponseEntity<Usuario> buscarUsuarioPorDni(@RequestBody Map<String, String> body) {
        String dni = body.get("dni");
        if (dni == null || dni.isEmpty()) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request si el DNI no se proporciona.
        }
        Optional<Usuario> usuario = usuarioNegocio.buscarUsuarioPorDni(dni);
        return usuario.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
        }

    @PostMapping("/crear_usuario")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Map<String, String> body) {
        // Extraer los campos del cuerpo de la solicitud
        String dni = body.get("dni");
        String nombre = body.get("nombre");
        String apellidoPaterno = body.get("apellidoPaterno");
        String apellidoMaterno = body.get("apellidoMaterno");
        String email = body.get("email");
        String telefono = body.get("telefono");

        // Validar que todos los campos requeridos estén presentes
        if (dni == null || nombre == null || apellidoPaterno == null || apellidoMaterno == null || email == null || telefono == null) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }

        

        // Crear el usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setDni(dni);
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setApellidoPaterno(apellidoPaterno);
        nuevoUsuario.setApellidoMaterno(apellidoMaterno);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setTelefono(telefono);

        // Guardar el usuario
        Usuario usuarioCreado = usuarioNegocio.crearUsuario(nuevoUsuario);
        return ResponseEntity.ok(usuarioCreado); // 200 OK con el usuario creado
    }
}
