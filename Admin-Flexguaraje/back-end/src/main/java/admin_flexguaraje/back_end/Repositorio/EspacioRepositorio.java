package admin_flexguaraje.back_end.Repositorio;

import admin_flexguaraje.back_end.Modelo.Espacio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EspacioRepositorio extends JpaRepository<Espacio, Long> {
    Espacio findByCodigoEspacio(String codigoEspacio);

    List<Espacio> findByEstado(String estado);
}
