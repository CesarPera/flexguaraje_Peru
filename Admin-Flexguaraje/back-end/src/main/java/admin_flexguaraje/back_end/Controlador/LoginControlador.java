package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Negocio.LoginNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/validacion")
@CrossOrigin(origins = "http://localhost:5173")

public class LoginControlador {

    @Autowired
    private LoginNegocio LoginNegocio;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Encabezado de autorización requerido");
        }

        // Extraer y decodificar credenciales
        String base64Credentials = authHeader.substring("Basic ".length()).trim();
        byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(decodedBytes);
        String[] values = credentials.split(":", 2);

        if (values.length != 2) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formato de credenciales inválido");
        }

        String email = values[0].toUpperCase(); // Convertir a mayúsculas
        String password = values[1];

        // Validar el formato del correo
        if (!email.matches("(?i)[A-Za-zÁÉÍÓÚáéíóú]+_\\d{8}@FLEXGUARAJE_PERU.COM")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El formato del correo no es válido. Debe ser APELLIDO PATERNO + _ + DNI + @flexguaraje_peru.com");
        }

        try {
            Cuenta cuenta = LoginNegocio.autenticarUsuario(email, password);
            return ResponseEntity.ok("Bienvenido, " + cuenta.getNombreUsuario());
        } catch (IllegalArgumentException e) {
            // Devuelve un mensaje claro si el correo y/o contraseña son incorrectos
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo y/o contraseña incorrecta");
        }
    }

    @PutMapping("/cambiar_pass")
    public ResponseEntity<String> cambiarPassword(@RequestBody Map<String, String> datos) {
        try {
            // Extraer datos del cuerpo
            String email = datos.get("email").toUpperCase(); // Convertir a mayúsculas
            String passwordActual = datos.get("passwordActual");
            String nuevaPassword = datos.get("nuevaPassword");
            String repetirNuevaPassword = datos.get("repetirNuevaPassword");

            // Validar que los campos no sean nulos
            if (email == null || passwordActual == null || nuevaPassword == null || repetirNuevaPassword == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Todos los campos son obligatorios");
            }

            // Validar formato del correo
            if (!email.matches("(?i)[A-Za-zÁÉÍÓÚáéíóú]+_\\d{8}@FLEXGUARAJE_PERU.COM")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El formato del correo no es válido. Debe ser APELLIDO PATERNO + _ + DNI + @flexguaraje_peru.com");
            }

            // Validar que las contraseñas coincidan
            if (!nuevaPassword.equals(repetirNuevaPassword)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La nueva contraseña y la confirmación deben coincidir");
            }

            // Validar la nueva contraseña con la expresión regular
            String passwordPattern = "^(?=(.*[A-Z]){3})(?=(.*[0-9]){3})(?=(.*[\\W_]){2})(?=.*[a-z]).{10,}$";
            if (!nuevaPassword.matches(passwordPattern)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La nueva contraseña debe tener minimo 10 caracteres, incluir 3 mayúsculas, 3 números, 2 caracteres especiales y el resto en minúsculas.");
            }

            // Cambiar la contraseña
            try {
                LoginNegocio.cambiarPassword(email, passwordActual, nuevaPassword, repetirNuevaPassword);
                return ResponseEntity.ok("Contraseña actualizada con éxito");
            } catch (IllegalArgumentException e) {
                // Devuelve un mensaje claro si el correo y/o contraseña actual son incorrectos
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo y/o contraseña incorrecta");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error inesperado: " + e.getMessage());
        }
    }
}
