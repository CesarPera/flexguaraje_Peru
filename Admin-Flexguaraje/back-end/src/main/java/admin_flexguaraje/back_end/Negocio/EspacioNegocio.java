package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Repositorio.EspacioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import admin_flexguaraje.back_end.Modelo.Espacio;

import java.util.List;

@Service
public class EspacioNegocio {
    @Autowired
    private EspacioRepositorio espacioRepositorio;

    public List<Espacio> ListarEspacio() {
        return espacioRepositorio.findAll();
    }
}
