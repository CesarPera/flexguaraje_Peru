package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Espacio;
import admin_flexguaraje.back_end.Negocio.EspacioNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/espacios")
public class EspacioControlador {
    @Autowired
    private EspacioNegocio espacioNegocio;

    @GetMapping("/listarespacio")
    public List<Espacio> listarEspacios() {
        return espacioNegocio.ListarEspacio();
    }

    //@PostMapping("/crearespacio")
    //public Espacio crearEspacio(@RequestBody Espacio espacio) {
      //  return espacioNegocio.crear_Espacio(espacio);
    //}

    //@DeleteMapping("/crearespacio/{id}")
    //public void eliminarEspacio(@PathVariable Long id) {
      //  espacioNegocio.eliminarPorId(id);
    //}
}
