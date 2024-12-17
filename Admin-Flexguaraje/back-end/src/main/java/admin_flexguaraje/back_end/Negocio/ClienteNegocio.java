package admin_flexguaraje.back_end.Negocio;


import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteNegocio {
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    public List<Cliente> obtenerClientes() {
        return clienteRepositorio.findAll();
    }

    public Cliente agregarCliente(Cliente cliente) {
        return clienteRepositorio.save(cliente);
    }
    public Optional<Cliente> buscarPorDni(String dni) {
        Optional<Optional<Cliente>> cliente = Optional.ofNullable(clienteRepositorio.findByDni(dni));
        return cliente.orElse(null);
    }

}
