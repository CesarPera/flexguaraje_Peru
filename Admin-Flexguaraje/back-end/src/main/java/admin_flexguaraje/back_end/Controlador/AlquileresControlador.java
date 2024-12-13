package admin_flexguaraje.back_end.Controlador;

import admin_flexguaraje.back_end.Modelo.Alquileres;
import admin_flexguaraje.back_end.Modelo.Espacio;
import admin_flexguaraje.back_end.Negocio.AlquileresNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/alquileres")
public class AlquileresControlador {

    @Autowired
    private final AlquileresNegocio alquileresNegocio;

    @Autowired
    public AlquileresControlador(AlquileresNegocio alquileresNegocio) {
        this.alquileresNegocio = alquileresNegocio;
    }

    // Endpoint para listar todos los alquileres
    @GetMapping("/listar_alquileres")
    public ResponseEntity<List<Alquileres>> listarAlquileres() {
        List<Alquileres> listaAlquileres = alquileresNegocio.listarAlquileres();
        return ResponseEntity.ok(listaAlquileres);
    }

    // Endpoint para agregar un cliente a un espacio y realizar un alquiler
    @PostMapping("/agregar_alquileres")
    public ResponseEntity<Object> agregarClienteAlEspacio(@RequestBody Map<String, Object> body) {
        try {
            // Verificar si los valores son nulos
            if (body.get("dni") == null || body.get("codigoEspacio") == null || body.get("fechaInicio") == null || body.get("fechaFin") == null) {
                return new ResponseEntity<>(new ErrorResponse("Faltan parámetros en la solicitud"), HttpStatus.BAD_REQUEST);
            }

            String dni = (String) body.get("dni");
            String codigoEspacio = (String) body.get("codigoEspacio");
            LocalDate fechaInicio = LocalDate.parse(body.get("fechaInicio").toString());
            LocalDate fechaFin = LocalDate.parse(body.get("fechaFin").toString());

            // Buscar el ID del espacio basado en el código
            Long idEspacio = alquileresNegocio.obtenerIdPorCodigoEspacio(codigoEspacio);
            if (idEspacio == null) {
                return new ResponseEntity<>(new ErrorResponse("Código de espacio inválido"), HttpStatus.BAD_REQUEST);
            }

            // Llamar al servicio para agregar el cliente al espacio
            Alquileres nuevoAlquiler = alquileresNegocio.agregarClienteAlEspacio(
                    dni, idEspacio, fechaInicio, fechaFin);

            return new ResponseEntity<>(nuevoAlquiler, HttpStatus.CREATED);

        } catch (Exception e) {
            // Devolver un ErrorResponse en caso de error
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    // Clase para la respuesta de error
    public class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @PutMapping("/actualizar_estado")
    public ResponseEntity<Object> actualizarEstadoEspacio(@RequestBody Map<String, Object> body) {
        try {
            // Verificar parámetros
            if (body.get("codigoEspacio") == null || body.get("nuevoEstado") == null) {
                return new ResponseEntity<>(new ErrorResponse("Faltan parámetros en la solicitud"), HttpStatus.BAD_REQUEST);
            }

            String codigoEspacio = body.get("codigoEspacio").toString();
            Espacio.EstadoEspacio nuevoEstado = Espacio.EstadoEspacio.valueOf(body.get("nuevoEstado").toString());

            // Llamar al negocio para actualizar el estado
            Espacio espacioActualizado = alquileresNegocio.actualizarEstadoPorCodigo(codigoEspacio, nuevoEstado);

            return new ResponseEntity<>(espacioActualizado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/actualizar_alquiler")
    public ResponseEntity<Object> actualizarClienteEnAlquiler(@RequestBody Map<String, Object> body) {
        try {
            // Verificar parámetros
            if (body.get("codigoEspacio") == null ||
                    body.get("nuevoDniCliente") == null ||
                    body.get("nuevaFechaInicio") == null ||
                    body.get("nuevaFechaFin") == null) {
                return new ResponseEntity<>(new ErrorResponse("Faltan parámetros en la solicitud"), HttpStatus.BAD_REQUEST);
            }

            String codigoEspacio = body.get("codigoEspacio").toString();
            String nuevoDni = body.get("nuevoDniCliente").toString();
            LocalDate nuevaFechaInicio = LocalDate.parse(body.get("nuevaFechaInicio").toString());
            LocalDate nuevaFechaFin = LocalDate.parse(body.get("nuevaFechaFin").toString());

            // Llamar al negocio para actualizar el alquiler
            Alquileres alquilerActualizado = alquileresNegocio.actualizarClienteEnAlquiler(
                    codigoEspacio, nuevoDni, nuevaFechaInicio, nuevaFechaFin);

            return new ResponseEntity<>(alquilerActualizado, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/eliminar_alquiler")
    public ResponseEntity<Object> eliminarAlquilerPorCodigoEspacio(@RequestBody Map<String, String> body) {
        try {
            // Verificar si el código de espacio fue proporcionado
            String codigoEspacio = body.get("codigoEspacio");
            if (codigoEspacio == null || codigoEspacio.isEmpty()) {
                return new ResponseEntity<>(new ErrorResponse("Faltan parámetros en la solicitud"), HttpStatus.BAD_REQUEST);
            }

            // Llamar al servicio para eliminar el alquiler por código de espacio
            alquileresNegocio.eliminarAlquilerPorCodigoEspacio(codigoEspacio);
            return new ResponseEntity<>("Alquiler eliminado y espacio actualizado a DISPONIBLE", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}