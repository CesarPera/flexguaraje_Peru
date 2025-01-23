package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Negocio.CuentaNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cuentas")
public class CuentaControlador {
    @Autowired
    private CuentaNegocio cuentaNegocio;

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
        String email = body.get("email");
        String password = body.get("password");

        try {
            Cuenta cuenta = cuentaNegocio.crearCuenta(dni, nombreRol, email, password);
            return ResponseEntity.ok("Cuenta creada exitosamente: " + cuenta.getNombreUsuario());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la cuenta: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar_cuenta")
    public ResponseEntity<String> actualizarCuenta(@RequestBody Map<String, String> body) {
        String dni = body.get("dni");
        String nuevoNombreUsuario = body.get("nuevoNombreUsuario");
        String nuevoEmail = body.get("nuevoEmail");
        String nuevaPassword = body.get("nuevaPassword");

        try {
            Cuenta cuentaActualizada = cuentaNegocio.actualizarCuentaPorDni(dni, nuevoNombreUsuario, nuevoEmail, nuevaPassword);
            return ResponseEntity.ok("Cuenta actualizada exitosamente. Usuario: " + cuentaActualizada.getNombreUsuario());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar la cuenta: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar_estado_cuenta")
    public ResponseEntity<String> actualizarEstadoCuenta(@RequestBody Map<String, Object> body) {
        String dni = (String) body.get("dni");

        if (dni == null || dni.isEmpty()) {
            return ResponseEntity.badRequest().body("El DNI es obligatorio.");
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

        if (dni == null || dni.isEmpty() || correo == null || correo.isEmpty()) {
            return ResponseEntity.badRequest().body("El DNI y el correo son obligatorios.");
        }

        try {
            Cuenta cuentaActualizada = cuentaNegocio.actualizarContrasenaPorDniYCorreo(dni, correo);
            return ResponseEntity.ok("Contraseña actualizada exitosamente. La nueva contraseña se ha enviado al usuario.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar la contraseña: " + e.getMessage());
        }
    }
}
