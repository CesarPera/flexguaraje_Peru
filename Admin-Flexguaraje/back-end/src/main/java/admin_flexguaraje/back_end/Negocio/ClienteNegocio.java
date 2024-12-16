package admin_flexguaraje.back_end.Negocio;


import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import com.example.demo.model.Cliente;
import com.example.demo.repository.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteNegocio {
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    public List<Cliente> obtenerClientes() {
        return ClienteRepositorio.findAll();
    }

    public Cliente agregarCliente(Cliente cliente) {
        return clienteRepositorio.save(cliente);
    }
}
