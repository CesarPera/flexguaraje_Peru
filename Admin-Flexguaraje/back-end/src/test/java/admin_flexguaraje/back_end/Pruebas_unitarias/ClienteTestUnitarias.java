package admin_flexguaraje.back_end.Pruebas_unitarias;

import admin_flexguaraje.back_end.Controlador.ClienteControlador;
import admin_flexguaraje.back_end.Negocio.ClienteNegocio;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ClienteTestUnitarias {

    public static void main(String[] args) {
        // Inicializar los objetos necesarios para la prueba
        ClienteNegocio clienteNegocio = new ClienteNegocio();  // Asegúrate de tener una implementación para esto
        ClienteControlador clienteControlador = new ClienteControlador();

        // Asignar el negocio al controlador
        clienteControlador.setClienteNegocio(clienteNegocio);

        // Prueba 1: Actualizar cliente con datos válidos

        // Crear el Map con los datos válidos
        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("dni", "12345678");
        cuerpo.put("nombre", "JUAN");
        cuerpo.put("apellido_paterno", "PEREZ");
        cuerpo.put("apellido_materno", "GARCIA");
        cuerpo.put("telefono", "987654321");
        cuerpo.put("email", "juanperez@mail.com");
        cuerpo.put("direccion", "Calle Ficticia 123");

        // Llamar al método que estás probando
        ResponseEntity<?> response = clienteControlador.actualizarCliente(cuerpo);

        // Imprimir el resultado para verificar
        System.out.println("Prueba 1: " + response.getStatusCode() + " - " + response.getBody());
    }
}
