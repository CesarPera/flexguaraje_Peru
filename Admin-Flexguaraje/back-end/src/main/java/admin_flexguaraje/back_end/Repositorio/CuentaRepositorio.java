package admin_flexguaraje.back_end.Repositorio;

import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CuentaRepositorio extends JpaRepository<Cuenta, Long> {
    boolean existsByEmail(String email);
    Optional<Cuenta> findByUsuario(Usuario usuario);
}
