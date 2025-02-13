package admin_flexguaraje.back_end.Repositorio;

import admin_flexguaraje.back_end.Modelo.Solicitudes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SolicitudesRepositorio extends JpaRepository<Solicitudes, Long> {

    // Método para encontrar una solicitud por su código único
    Optional<Solicitudes> findByCodigoSolicitud(String codigoSolicitud);

    // No es necesario agregar un método de actualización explícito,
    // porque JpaRepository ya proporciona el método save() que maneja las actualizaciones
}
