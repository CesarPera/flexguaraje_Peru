package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Negocio.ClienteNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    @PostMapping("/agregar")
    public ResponseEntity<String> agregarCliente(@RequestBody Cliente cliente) {
        Cliente nuevoCliente = clienteNegocio.agregarCliente(cliente);
        return ResponseEntity.ok("Cliente agregado correctamente con ID: " + nuevoCliente.getIdCliente());
    }



    // Buscar cliente por DNI desde el cuerpo
    @PostMapping("/buscar")
    public ResponseEntity<?> buscarClientePorDni(@RequestBody Map<String, String> request) {
        String dni = request.get("dni");
        if (dni == null || dni.isEmpty()) {
            return ResponseEntity.badRequest().body("El DNI es obligatorio en el cuerpo de la solicitud.");
        }
        Optional<Cliente> cliente = clienteNegocio.buscarPorDni(dni);
        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.status(404).body("Cliente con DNI " + dni + " no encontrado.");
        }
    }
}