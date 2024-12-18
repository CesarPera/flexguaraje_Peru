package admin_flexguaraje.back_end.Negocio;


import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteNegocio {
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    public List<Cliente> ListarClientes() {
        return clienteRepositorio.findAll();
    }

    public Cliente buscarPorDni(String dni) {
        Cliente cliente = clienteRepositorio.findByDni(dni);
        if (cliente == null) {
            throw new IllegalArgumentException("No se encontró un cliente con el DNI: " + dni);
        }
        return cliente;
    }

    public Optional<Cliente> buscarPorNombreCompleto(String nombre, String apellido) {
        return clienteRepositorio.findByNombreAndApellido(nombre, apellido);
    }

    public Cliente crearCliente(Cliente cliente) {
        // Validación del cliente
        if (cliente.getDni() == null || cliente.getDni().isEmpty()) {
            throw new IllegalArgumentException("El DNI es obligatorio.");
        }
        if (cliente.getTelefono() == null || cliente.getTelefono().isEmpty()) {
            throw new IllegalArgumentException("El teléfono es obligatorio.");
        }

        // Guardar el cliente en la base de datos
        return clienteRepositorio.save(cliente);
    }
}
