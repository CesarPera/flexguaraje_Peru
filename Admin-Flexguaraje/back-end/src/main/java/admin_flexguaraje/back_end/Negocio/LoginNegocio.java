package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Repositorio.LoginRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginNegocio {
    @Autowired
    private LoginRepositorio loginRepositorio;

    public Cuenta autenticarUsuario(String email, String password) {
        // Buscar la cuenta por email, ignorando el case
        Cuenta cuenta = loginRepositorio.findByEmail(email.toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("Correo y/o contraseña incorrecto"));

        // Verificar que la cuenta esté activa
        if (cuenta.getEstado() != Cuenta.estadoCuenta.Activo) {
            String dni = cuenta.getUsuario().getDni();
            throw new IllegalArgumentException("La cuenta asociada al DNI " + dni + " se encuentra desactivada.");
        }

        // Comparar la contraseña proporcionada con la almacenada en texto plano
        if (!password.equals(cuenta.getPassword())) {
            throw new IllegalArgumentException("Correo y/o contraseña incorrecto");
        }

        return cuenta;
    }

    // Método para cambiar la contraseña
    public void cambiarPassword(String email, String passwordActual, String nuevaPassword, String repetirNuevaPassword) {
        // Verificar que las nuevas contraseñas coinciden
        if (!nuevaPassword.equals(repetirNuevaPassword)) {
            throw new IllegalArgumentException("Las nuevas contraseñas no coinciden");
        }

        // Buscar la cuenta por email, ignorando el case
        Cuenta cuenta = loginRepositorio.findByEmail(email.toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("Cuenta no encontrada"));

        // Verificar que la cuenta esté activa
        if (cuenta.getEstado() != Cuenta.estadoCuenta.Activo) {
            throw new IllegalArgumentException("La cuenta con DNI " + cuenta.getUsuario().getDni() + " se encuentra desactivada");
        }

        // Verificar la contraseña actual en texto plano
        if (!passwordActual.equals(cuenta.getPassword())) {
            throw new IllegalArgumentException("La contraseña actual es incorrecta");
        }

        // Verificar que la nueva contraseña sea completamente diferente
        if (nuevaPassword.equals(passwordActual)) {
            throw new IllegalArgumentException("La nueva contraseña debe ser completamente diferente de la actual");
        }

        // Actualizar la contraseña directamente
        cuenta.setPassword(nuevaPassword);

        // Guardar la cuenta con la nueva contraseña
        loginRepositorio.save(cuenta);
    }
}
