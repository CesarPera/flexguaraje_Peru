package admin_flexguaraje.back_end.Controlador;


import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Negocio.ClienteNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteControlador {
    @Autowired
    private ClienteNegocio clienteNegocio;

    @GetMapping ("/listar_cliente")
    public List<Cliente> ListarClientes() {
        return clienteNegocio.ListarClientes();
    }

    @PostMapping("/buscar_cliente_dni")
    public ResponseEntity<?> buscarClientePorDni(@RequestBody Map<String, String> cuerpo) {
        String dni = cuerpo.get("dni");
        if (dni == null || dni.isEmpty()) {
            return ResponseEntity.badRequest().body("El DNI no puede estar vacío.");
        }

        try {
            Cliente cliente = clienteNegocio.buscarPorDni(dni);
            return ResponseEntity.ok(cliente);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/buscar_cliente_nombreCompleto")
    public ResponseEntity<?> buscarClientePorNombreCompleto(@RequestBody Map<String, Object> cuerpo) {
        String nombre = (String) cuerpo.get("nombre");
        String apellido = (String) cuerpo.get("apellido");

        if (nombre == null || apellido == null || nombre.isEmpty() || apellido.isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre y apellido son requeridos.");
        }

        try {
            Optional<Cliente> cliente = clienteNegocio.buscarPorNombreCompleto(nombre, apellido);
            if (cliente.isPresent()) {
                return ResponseEntity.ok(cliente.get());
            } else {
                return ResponseEntity.status(404).body("No se encontró un cliente con el nombre completo: " + nombre + " " + apellido);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al buscar el cliente: " + e.getMessage());
        }
    }

    @PostMapping("/crear_cliente")
    public ResponseEntity<?> crearCliente(@RequestBody Map<String, Object> cuerpo) {
        try {
            // Creación del cliente desde el Map
            String dni = (String) cuerpo.get("dni");
            String nombre = (String) cuerpo.get("nombre");
            String apellido = (String) cuerpo.get("apellido");
            String telefono = (String) cuerpo.get("telefono");
            String email = (String) cuerpo.get("email");
            String nota = (String) cuerpo.get("nota");

            // Validación de datos
            if (dni == null || nombre == null || apellido == null || telefono == null || email == null) {
                return ResponseEntity.badRequest().body("Todos los campos son requeridos.");
            }

            // Creación del objeto Cliente
            Cliente cliente = new Cliente();
            cliente.setDni(dni);
            cliente.setNombre(nombre);
            cliente.setApellido(apellido);
            cliente.setTelefono(telefono);
            cliente.setEmail(email);
            cliente.setNota(nota != null ? nota : "Sin Discapacidad");

            // Llamada al servicio para crear el cliente
            Cliente clienteCreado = clienteNegocio.crearCliente(cliente);
            return ResponseEntity.status(201).body(clienteCreado); // 201 Created
        } catch (Exception e) {
            // Si ocurre algún error
            return ResponseEntity.badRequest().body("Error al crear el cliente: " + e.getMessage());
        }
    }
}