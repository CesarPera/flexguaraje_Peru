package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Negocio.ClienteNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteControlador {
    @Autowired
    private ClienteNegocio clienteNegocio;

    @GetMapping ("/listarcliente")
    public List<Cliente> listarClientes() {
        return clienteNegocio.obtenerClientes();
    }

    @PostMapping
    public Cliente agregarCliente(@RequestBody Cliente cliente) {
        return clienteNegocio.agregarCliente(cliente);
    }
}