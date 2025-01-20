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
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Cuenta autenticarUsuario(String email, String password) {
        // Buscar la cuenta por email
        Cuenta cuenta = loginRepositorio.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

        // Verificar que la cuenta esté activa
        if (cuenta.getEstado() != Cuenta.estadoCuenta.Activo) {
            throw new IllegalArgumentException("La cuenta está desactivada");
        }

        // Comparar la contraseña proporcionada con la encriptada en la base de datos
        if (!passwordEncoder.matches(password, cuenta.getPassword())) {
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

        // Verificar la contraseña actual utilizando el encoder
        if (!passwordEncoder.matches(passwordActual, cuenta.getPassword())) {
            throw new IllegalArgumentException("La contraseña actual es incorrecta");
        }

        // Encriptar la nueva contraseña antes de guardarla
        String nuevaPasswordEncriptada = passwordEncoder.encode(nuevaPassword);

        // Actualizar la contraseña en la cuenta
        cuenta.setPassword(nuevaPasswordEncriptada);

        // Guardar la cuenta con la nueva contraseña encriptada
        loginRepositorio.save(cuenta);
    }
}
