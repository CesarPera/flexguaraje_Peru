package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Modelo.Roles;
import admin_flexguaraje.back_end.Modelo.Usuario;
import admin_flexguaraje.back_end.Repositorio.CuentaRepositorio;
import admin_flexguaraje.back_end.Repositorio.RolesRepositorio;
import admin_flexguaraje.back_end.Repositorio.UsuarioRepositorio;
import admin_flexguaraje.back_end.seguridad.GeneradorPassSeguro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CuentaNegocio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private RolesRepositorio rolesRepositorio;

    @Autowired
    private CuentaRepositorio cuentaRepositorio;

    // Método para listar todas las cuentas
    public List<Cuenta> listarCuentas() {
        return cuentaRepositorio.findAll();
    }

    public List<Roles> obtenerRolesActivos() {
        return rolesRepositorio.findByEstado(Roles.estadoRoles.Activo);
    }

    public Cuenta crearCuenta(String dni, String nombreRol, String email, String password) throws Exception {
        // Buscar usuario por DNI
        Usuario usuario = usuarioRepositorio.findByDni(dni)
                .orElseThrow(() -> new Exception("Usuario con DNI " + dni + " no encontrado."));

        // Buscar rol por nombre
        Roles roles = rolesRepositorio.findByNombreRol(nombreRol)
                .orElseThrow(() -> new Exception("Rol con nombre " + nombreRol + " no encontrado."));

        // Generar nombre de usuario
        String nombreUsuario = (usuario.getApellidoPaterno() + "_" + usuario.getDni() + "_PERU").toUpperCase();

        // Generar correo automático si no se proporciona uno
        String emailGenerado = (usuario.getApellidoPaterno() + "_" + usuario.getDni() + "@flexguaraje_peru.com").toUpperCase();

        // Crear cuenta
        Cuenta cuenta = new Cuenta();
        cuenta.setUsuario(usuario);
        cuenta.setRoles(roles);
        cuenta.setNombreUsuario(nombreUsuario);
        cuenta.setEmail(email != null && !email.isEmpty() ? email : emailGenerado); // Usar el email proporcionado o el generado
        cuenta.setPassword(password);
        cuenta.setEstado(Cuenta.estadoCuenta.Activo);

        return cuentaRepositorio.save(cuenta);
    }

    public Cuenta actualizarEstadoCuentaPorDni(String dni) throws Exception {
        // Buscar usuario por DNI
        Usuario usuario = usuarioRepositorio.findByDni(dni)
                .orElseThrow(() -> new Exception("Usuario con DNI " + dni + " no encontrado."));

        // Buscar cuenta asociada al usuario
        Optional<Cuenta> cuentaOptional = cuentaRepositorio.findByUsuario(usuario);
        if (cuentaOptional.isEmpty()) {
            throw new Exception("No se encontró una cuenta asociada al usuario con DNI " + dni + ".");
        }

        Cuenta cuenta = cuentaOptional.get();

        // Alternar el estado de la cuenta
        if (cuenta.getEstado() == Cuenta.estadoCuenta.Activo) {
            cuenta.setEstado(Cuenta.estadoCuenta.Desactivado);
        } else {
            cuenta.setEstado(Cuenta.estadoCuenta.Activo);
        }

        // Guardar y devolver la cuenta actualizada
        return cuentaRepositorio.save(cuenta);
    }

    public Cuenta actualizarContrasenaPorDniYCorreo(String dni, String correo, String nuevaContrasena) throws Exception {
        // Buscar usuario por DNI
        Usuario usuario = usuarioRepositorio.findByDni(dni)
                .orElseThrow(() -> new Exception("Usuario con DNI " + dni + " no encontrado."));

        // Buscar cuenta asociada al usuario
        Cuenta cuenta = cuentaRepositorio.findByUsuario(usuario)
                .orElseThrow(() -> new Exception("No se encontró una cuenta asociada al usuario con DNI " + dni + "."));

        // Validar que el correo coincida
        if (!cuenta.getEmail().equalsIgnoreCase(correo)) {
            throw new Exception("El correo no coincide con la cuenta registrada.");
        }
        // Actualizar la contraseña sin encriptación
        cuenta.setPassword(nuevaContrasena);

        // Guardar la cuenta actualizada
        return cuentaRepositorio.save(cuenta);
    }
}
