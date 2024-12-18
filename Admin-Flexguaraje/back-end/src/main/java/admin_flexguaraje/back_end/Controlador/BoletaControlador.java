package admin_flexguaraje.back_end.Controlador;

import admin_flexguaraje.back_end.Modelo.Boleta;
import admin_flexguaraje.back_end.Negocio.BoletaNegocio;
import admin_flexguaraje.back_end.Repositorio.BoletaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/boletas")
public class BoletaControlador {

    @Autowired
    private BoletaNegocio boletaNegocio;

    @GetMapping("/listarboleta")
    public ResponseEntity<List<Boleta>> listarBoletas() {
        List<Boleta> boleta = boletaNegocio.listarBoleta();
        return new ResponseEntity<>(boleta, HttpStatus.OK);
    }

    @PostMapping("/agregarboletas")
    public ResponseEntity<?> agregarBoleta(@RequestBody Map<String, Object> requestBody) {
        try {
            // Extraer los valores del Map
            String dni = (String) requestBody.get("dni");
            String codigoEspacio = (String) requestBody.get("codigoEspacio");
            String codigoBoleta = (String) requestBody.get("codigoBoleta");
            String metodoPago = (String) requestBody.get("metodoPago");
            LocalDate fechaEmision = LocalDate.parse((String) requestBody.get("fechaEmision"));

            BigDecimal montoPagar;
            Object montoPagarObj = requestBody.get("montoPagar");
            if (montoPagarObj instanceof Double) {
                montoPagar = BigDecimal.valueOf((Double) montoPagarObj);
            } else if (montoPagarObj instanceof String) {
                montoPagar = new BigDecimal((String) montoPagarObj);
            } else {
                throw new IllegalArgumentException("El formato de 'montoPagar' no es válido");
            }

            // Llamada al servicio para agregar la boleta
            Boleta boleta = boletaNegocio.agregarBoleta(
                    dni,
                    codigoEspacio,
                    codigoBoleta,
                    metodoPago,
                    fechaEmision,
                    montoPagar
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(boleta);

        } catch (RuntimeException e) {
            // Manejo de excepciones de negocio
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Manejo de excepciones generales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarBoleta(@RequestBody Map<String, Object> body) {
        try {
            // Extraer los valores del cuerpo de la solicitud (el Map)
            String dniCliente = (String) body.get("dniCliente");
            String codigoBoleta = (String) body.get("codigoBoleta");
            String codigoEspacio = (String) body.get("codigoEspacio");
            BigDecimal montoPagar = new BigDecimal((String) body.get("montoPagar"));  // O (Double) dependiendo del formato
            LocalDate fechaEmision = LocalDate.parse((String) body.get("fechaEmision"));

            // Llamar al servicio para actualizar la boleta
            String respuesta = boletaNegocio.actualizarBoleta(
                    dniCliente,
                    codigoBoleta,
                    codigoEspacio,
                    montoPagar,
                    fechaEmision
            );

            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminarboleta")
    public ResponseEntity<?> eliminarBoleta(@RequestBody Map<String, String> body) {
        try {
            // Extraer valores desde el cuerpo de la solicitud
            String dni = body.get("dni");
            String codigoBoleta = body.get("codigoBoleta");

            // Validación
            if (dni == null || codigoBoleta == null) {
                return ResponseEntity.badRequest().body("El 'dni' y 'codigoBoleta' son obligatorios.");
            }

            // Llamar al servicio
            String respuesta = boletaNegocio.eliminarBoleta(dni, codigoBoleta);

            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la boleta.");
        }
    }
}




