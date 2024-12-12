package admin_flexguaraje.back_end.Controlador;

import admin_flexguaraje.back_end.Modelo.Boleta;
import admin_flexguaraje.back_end.Negocio.BoletaNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/boletas")
public class BoletaControlador {

    @Autowired
    private BoletaNegocio boletaNegocio;

    @GetMapping("/listarboleta")
    public ResponseEntity<List<Boleta>> listarBoletas() {
        List<Boleta> alquileres = boletaNegocio.listarBoleta();
        return new ResponseEntity<>(alquileres, HttpStatus.OK);
    }

}
