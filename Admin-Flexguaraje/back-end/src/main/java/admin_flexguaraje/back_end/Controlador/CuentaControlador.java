package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Negocio.CuentaNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
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
            Cuenta cuentaActualizada = cuentaNegocio.actualizarContrasenaPorDniYCorreo(dni, correo);
            return ResponseEntity.ok("Contraseña actualizada exitosamente. La nueva contraseña se ha enviado al usuario.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar la contraseña: " + e.getMessage());
        }
    }
}
