package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Alquileres;
import admin_flexguaraje.back_end.Modelo.Boleta;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Repositorio.BoletaRepositorio;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class BoletaNegocio {

    @Autowired
    private BoletaRepositorio boletaRepositorio;

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    public List<Boleta> listarBoleta() {
        return boletaRepositorio.findAll();
    }

}
