package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Usuario;
import admin_flexguaraje.back_end.Negocio.UsuarioNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
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

    @PostMapping("/buscar_usuario_dni")
    public ResponseEntity<?> buscarUsuarioPorDni(@RequestBody Map<String, String> body) {
        String dni = body.get("dni");

        // Verificar si el DNI es válido
        if (dni == null || !dni.matches("\\d{8}")) {
            return ResponseEntity.badRequest().body("El DNI debe tener exactamente 8 caracteres numéricos.");
        }

        Optional<Usuario> usuario = usuarioNegocio.buscarUsuarioPorDni(dni);

        // Si no se encuentra el usuario, se devuelve un mensaje dentro del cuerpo con un código 200 (OK)
        if (usuario.isEmpty()) {
            return ResponseEntity.ok("El cliente con DNI " + dni + " no se encuentra.");
        }

        // Si el usuario se encuentra, se devuelve el usuario con código 200
        return ResponseEntity.ok(usuario.get());
    }

    @PostMapping("/crear_usuario")
    public ResponseEntity<String> crearUsuario(@RequestBody Map<String, String> body) {
        // Validaciones
        String dni = body.get("dni");
        String nombre = body.get("nombre");
        String apellidoPaterno = body.get("apellidoPaterno");
        String apellidoMaterno = body.get("apellidoMaterno");
        String email = body.get("email");
        String telefono = body.get("telefono");

        if (dni == null || !dni.matches("\\d{8}")) {
            return ResponseEntity.badRequest().body("El DNI debe tener exactamente 8 caracteres numéricos.");
        }
        if (usuarioNegocio.buscarUsuarioPorDni(dni).isPresent()) {
            return ResponseEntity.badRequest().body("El DNI " + dni + " ya existe.");
        }
        if (nombre == null || !nombre.matches("[a-zA-ZÁÉÍÓÚáéíóú ]+")) {
            return ResponseEntity.badRequest().body("El nombre solo puede contener letras y espacios.");
        }
        if (apellidoPaterno == null || !apellidoPaterno.matches("[a-zA-ZÁÉÍÓÚáéíóú]+")) {
            return ResponseEntity.badRequest().body("El apellido paterno solo puede contener letras.");
        }
        if (apellidoMaterno == null || !apellidoMaterno.matches("[a-zA-ZÁÉÍÓÚáéíóú]+")) {
            return ResponseEntity.badRequest().body("El apellido materno solo puede contener letras.");
        }
        if (email == null || !email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            return ResponseEntity.badRequest().body("El email debe ser válido y contener '@'.");
        }
        if (telefono == null || !telefono.matches("\\d{9}")) {
            return ResponseEntity.badRequest().body("El teléfono debe tener exactamente 9 caracteres numéricos.");
        }

        // Convertir a mayúsculas
        nombre = nombre != null ? nombre.toUpperCase() : null;
        apellidoPaterno = apellidoPaterno != null ? apellidoPaterno.toUpperCase() : null;
        apellidoMaterno = apellidoMaterno != null ? apellidoMaterno.toUpperCase() : null;

        // Crear usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setDni(dni);
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setApellidoPaterno(apellidoPaterno);
        nuevoUsuario.setApellidoMaterno(apellidoMaterno);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setTelefono(telefono);

        usuarioNegocio.crearUsuario(nuevoUsuario);
        return ResponseEntity.ok("Usuario creado con éxito.");
    }


    @PutMapping("/actualizar_usuario")
    public ResponseEntity<String> actualizarUsuario(@RequestBody Map<String, String> body) {
        String dni = body.get("dni");
        if (dni == null || !dni.matches("\\d{8}")) {
            return ResponseEntity.badRequest().body("El DNI debe tener exactamente 8 caracteres numéricos.");
        }

        Optional<Usuario> usuarioExistente = usuarioNegocio.buscarUsuarioPorDni(dni);
        if (usuarioExistente.isEmpty()) {
            return ResponseEntity.status(404).body("El cliente con DNI " + dni + " no se encuentra.");
        }

        Usuario usuario = usuarioExistente.get();
        if (body.containsKey("nombre") && !body.get("nombre").matches("[a-zA-ZÁÉÍÓÚáéíóú ]+")) {
            return ResponseEntity.badRequest().body("El nombre solo puede contener letras y espacios.");
        }
        if (body.containsKey("apellidoPaterno") && !body.get("apellidoPaterno").matches("[a-zA-ZÁÉÍÓÚáéíóú]+")) {
            return ResponseEntity.badRequest().body("El apellido paterno solo puede contener letras.");
        }
        if (body.containsKey("apellidoMaterno") && !body.get("apellidoMaterno").matches("[a-zA-ZÁÉÍÓÚáéíóú]+")) {
            return ResponseEntity.badRequest().body("El apellido materno solo puede contener letras.");
        }
        if (body.containsKey("email") && !body.get("email").matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            return ResponseEntity.badRequest().body("El email debe ser válido y contener '@'.");
        }
        if (body.containsKey("telefono") && !body.get("telefono").matches("\\d{9}")) {
            return ResponseEntity.badRequest().body("El teléfono debe tener exactamente 9 caracteres numéricos.");
        }

        // Convertir a mayúsculas los campos que se actualizan
        if (body.containsKey("nombre")) {
            usuario.setNombre(body.get("nombre").toUpperCase());
        }
        if (body.containsKey("apellidoPaterno")) {
            usuario.setApellidoPaterno(body.get("apellidoPaterno").toUpperCase());
        }
        if (body.containsKey("apellidoMaterno")) {
            usuario.setApellidoMaterno(body.get("apellidoMaterno").toUpperCase());
        }

        // Actualizar los demás campos
        if (body.containsKey("email")) usuario.setEmail(body.get("email"));
        if (body.containsKey("telefono")) usuario.setTelefono(body.get("telefono"));

        usuarioNegocio.actualizarUsuario(usuario);
        return ResponseEntity.ok("Usuario actualizado con éxito.");
    }

}
