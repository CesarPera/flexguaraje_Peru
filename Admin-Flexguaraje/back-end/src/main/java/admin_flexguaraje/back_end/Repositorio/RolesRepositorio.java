package admin_flexguaraje.back_end.Repositorio;

import admin_flexguaraje.back_end.Modelo.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepositorio extends JpaRepository<Roles, Long> {
    boolean existsByNombreRol(String nombreRol);
    Optional<Roles> findByNombreRol(String nombreRol);



}
