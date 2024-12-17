package admin_flexguaraje.back_end.Repositorio;

import admin_flexguaraje.back_end.Modelo.Alquileres;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Modelo.Espacio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AlquileresRepositorio extends JpaRepository<Alquileres, Long> {
    List<Alquileres> findByClienteAndEspacioCodigoEspacio(Cliente cliente, String codigoEspacio);
    Optional<Alquileres> findByEspacio_IdEspacio(Long idEspacio);
    @Query("SELECT COUNT(a) > 0 FROM Alquileres a WHERE a.espacio = :espacio AND a.fechaFinAlquiler > :fechaActual")
    boolean existsByEspacioAndFechaFinAlquilerAfter(@Param("espacio") Espacio espacio, @Param("fechaActual") LocalDate fechaActual);


}

