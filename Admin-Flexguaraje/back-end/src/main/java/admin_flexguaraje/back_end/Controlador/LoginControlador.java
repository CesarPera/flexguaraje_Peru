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
@RequestMapping("/cuenta")
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

        String email = values[0];
        String password = values[1];

        try {
            Cuenta cuenta = LoginNegocio.autenticarUsuario(email, password);
            return ResponseEntity.ok("Bienvenido, " + cuenta.getNombreUsuario());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/cambiar_contraseña")
    public ResponseEntity<String> cambiarPassword(@RequestBody Map<String, String> datos) {
        try {
            // Extraer datos del cuerpo
            String email = datos.get("email");
            String passwordActual = datos.get("passwordActual");
            String nuevaPassword = datos.get("nuevaPassword");
            String repetirNuevaPassword = datos.get("repetirNuevaPassword");

            // Validar que los campos no sean nulos
            if (email == null || passwordActual == null || nuevaPassword == null || repetirNuevaPassword == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Todos los campos son obligatorios");
            }

            LoginNegocio.cambiarPassword(email, passwordActual, nuevaPassword, repetirNuevaPassword);
            return ResponseEntity.ok("Contraseña actualizada con éxito");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
