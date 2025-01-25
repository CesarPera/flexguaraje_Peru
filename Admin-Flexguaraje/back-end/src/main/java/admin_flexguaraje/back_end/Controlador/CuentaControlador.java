package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Modelo.Usuario;
import admin_flexguaraje.back_end.Negocio.CuentaNegocio;
import admin_flexguaraje.back_end.Negocio.EnvioCorreo;
import admin_flexguaraje.back_end.Negocio.UsuarioNegocio;
import admin_flexguaraje.back_end.seguridad.GeneradorPassSeguro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/cuentas")
public class CuentaControlador {
    @Autowired
    private CuentaNegocio cuentaNegocio;

    @Autowired
    private UsuarioNegocio usuarioNegocio;

    @Autowired
    private EnvioCorreo EnvioCorreo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Listar todas las cuentas
    @GetMapping("/listar_cuentas")
    public ResponseEntity<List<Cuenta>> listarCuentas() {
        List<Cuenta> cuentas = cuentaNegocio.listarCuentas();
        return ResponseEntity.ok(cuentas);
    }

    @PostMapping("/crear_cuenta")
    public ResponseEntity<String> crearCuenta(@RequestBody Map<String, String> body) {
        String dni = body.get("dni");
        String nombreRol = body.get("nombreRol");
        String password = body.get("password");

        // Validar formato del DNI
        if (dni == null || !dni.matches("\\d{8}")) {
            return ResponseEntity.badRequest().body("El DNI debe contener exactamente 8 dígitos numéricos.");
        }

        // Validar formato del nombre del rol
        if (nombreRol == null || !nombreRol.matches("[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+")) {
            return ResponseEntity.badRequest().body("El nombre del rol solo puede contener letras y espacios.");
        }

        String passwordPattern = "^(?=(.*[A-Z]){3})(?=(.*[0-9]){3})(?=(.*[\\W_]){2})(?=.*[a-z]).{10,}$";
        if (!password.matches(passwordPattern)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La nueva contraseña debe tener minimo 10 caracteres, incluir 3 mayúsculas, 3 números, 2 caracteres especiales y el resto en minúsculas.");
        }

        try {
            Cuenta cuenta = cuentaNegocio.crearCuenta(dni, nombreRol, null, password);
            return ResponseEntity.ok("Cuenta creada exitosamente: " + cuenta.getNombreUsuario() + ", Email: " + cuenta.getEmail());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la cuenta: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar_estado_cuenta")
    public ResponseEntity<String> actualizarEstadoCuenta(@RequestBody Map<String, Object> body) {
        String dni = (String) body.get("dni");

        // Validar formato del DNI
        if (dni == null || !dni.matches("\\d{8}")) {
            return ResponseEntity.badRequest().body("El DNI debe contener exactamente 8 dígitos numéricos.");
        }

        try {
            Cuenta cuentaActualizada = cuentaNegocio.actualizarEstadoCuentaPorDni(dni);
            return ResponseEntity.ok("Estado de la cuenta actualizado exitosamente. Nuevo estado: " + cuentaActualizada.getEstado());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar el estado de la cuenta: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar_pass_automatico")
    public ResponseEntity<String> actualizarContrasena(@RequestBody Map<String, Object> body) {
        String dni = (String) body.get("dni");
        String correo = (String) body.get("correo");

        // Validar formato del DNI
        if (dni == null || !dni.matches("\\d{8}")) {
            return ResponseEntity.badRequest().body("El DNI debe contener exactamente 8 dígitos numéricos.");
        }

        if (correo == null || !correo.matches("(?i)[A-Za-zÁÉÍÓÚáéíóú]+_\\d{8}@FLEXGUARAJE_PERU.COM")) {
            return ResponseEntity.badRequest().body("El correo debe tener el formato: apellidoPaterno + DNI + @FLEXGUARAJE_PERU.COM");
        }

        try {
            // Buscar el usuario por DNI usando el negocio
            Usuario usuario = usuarioNegocio.buscarUsuarioPorDni(dni)
                    .orElseThrow(() -> new Exception("Usuario con DNI " + dni + " no encontrado."));

            // Buscar la cuenta asociada al usuario
            Cuenta cuentaActualizada = cuentaNegocio.actualizarContrasenaPorDniYCorreo(dni, correo);

            // Obtener el correo personal del usuario
            String correoPersonal = usuario.getEmail();

            // Generar una nueva contraseña segura
            String nuevaContrasena = GeneradorPassSeguro.generarContrasenaSegura();

            // Encriptar la nueva contraseña
            cuentaActualizada.setPassword(passwordEncoder.encode(nuevaContrasena));

            // Guardar la cuenta actualizada usando el servicio de negocio
            cuentaNegocio.guardarCuenta(cuentaActualizada);  // Usamos el servicio de negocio para guardar la cuenta

            // Enviar la nueva contraseña al correo personal del usuario
            EnvioCorreo.enviarCorreo(correoPersonal, nuevaContrasena);

            return ResponseEntity.ok("Contraseña actualizada exitosamente. La nueva contraseña se ha enviado al correo personal del usuario.");
        } catch (Exception e) {
            e.printStackTrace();  // Agregar esto para ver más detalles del error
            return ResponseEntity.badRequest().body("Error al actualizar la contraseña: " + e.getMessage());
        }
    }

}
