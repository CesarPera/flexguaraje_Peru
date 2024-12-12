package admin_flexguaraje.back_end.Controlador;

import admin_flexguaraje.back_end.Modelo.Boleta;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Negocio.BoletaNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boletas")
public class BoletaControlador {

    @Autowired
    private BoletaNegocio boletaNegocio;


}
