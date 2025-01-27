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
        // Buscar la cuenta por email
        Cuenta cuenta = loginRepositorio.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

        // Verificar que la cuenta esté activa
        if (cuenta.getEstado() != Cuenta.estadoCuenta.Activo) {
            throw new IllegalArgumentException("La cuenta está desactivada");
        }

        // Comparar la contraseña proporcionada con la almacenada en texto plano
        if (!password.equals(cuenta.getPassword())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        return cuenta;
    }

    // Método para cambiar la contraseña
    public void cambiarPassword(String email, String passwordActual, String nuevaPassword, String repetirNuevaPassword) {
        // Verificar que las nuevas contraseñas coinciden
        if (!nuevaPassword.equals(repetirNuevaPassword)) {
            throw new IllegalArgumentException("Las nuevas contraseñas no coinciden");
        }

        // Buscar la cuenta por email
        Cuenta cuenta = loginRepositorio.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Cuenta no encontrada"));

        // Verificar que la cuenta esté activa
        if (cuenta.getEstado() != Cuenta.estadoCuenta.Activo) {
            throw new IllegalArgumentException("La cuenta está desactivada");
        }

        // Verificar la contraseña actual en texto plano
        if (!passwordActual.equals(cuenta.getPassword())) {
            throw new IllegalArgumentException("La contraseña actual es incorrecta");
        }

        // Actualizar la contraseña directamente
        cuenta.setPassword(nuevaPassword);

        // Guardar la cuenta con la nueva contraseña
        loginRepositorio.save(cuenta);
    }
}
