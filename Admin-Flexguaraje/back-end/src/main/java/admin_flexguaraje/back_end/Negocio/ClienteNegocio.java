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

    public boolean existeClientePorDni(String dni) {
        return clienteRepositorio.existsByDni(dni);
    }

    public boolean existeClientePorEmail(String email) {
        return clienteRepositorio.existsByEmail(email);
    }


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

    public Optional<Cliente> buscarPorNombreCompleto(String nombre, String apellidoPaterno, String apellidoMaterno) {
        return clienteRepositorio.findByNombreAndApellidoPaternoAndApellidoMaterno(nombre, apellidoPaterno, apellidoMaterno);
    }

    public Cliente crearCliente(Cliente cliente) {
        // Guardar el cliente en la base de datos
        return clienteRepositorio.save(cliente);
    }

}
