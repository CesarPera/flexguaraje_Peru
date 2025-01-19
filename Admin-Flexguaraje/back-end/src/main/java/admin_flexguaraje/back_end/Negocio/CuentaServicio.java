package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Repositorio.CuentaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CuentaServicio {

    @Autowired
    private CuentaRepositorio cuentaRepositorio;

    // Método para registrar una nueva cuenta
    public Cuenta registrarCuenta(Cuenta cuenta) {
        Optional<Cuenta> cuentaExistente = cuentaRepositorio.findByEmail(cuenta.getEmail());
        if (cuentaExistente.isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }
        return cuentaRepositorio.save(cuenta);
    }

    // Método para validar el login
    public boolean validarLogin(String email, String pass) {
        Optional<Cuenta> cuenta = cuentaRepositorio.findByEmail(email);
        return cuenta.isPresent() && cuenta.get().getPass().equals(pass);
    }
}
