package admin_flexguaraje.back_end.Controlador;

import admin_flexguaraje.back_end.Modelo.Reportes;
import admin_flexguaraje.back_end.Negocio.ReportesNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reportes")
@CrossOrigin(origins = "http://localhost:5173") // Permite acceder desde cualquier origen
public class ReportesControlador {

    @Autowired
    private ReportesNegocio reportesNegocio;

    @GetMapping("/listar_reportes")
    public List<Reportes> obtenerTodos() {
        return reportesNegocio.listarTodos();
    }

    public static class ReporteRequest {
        public String encargadoResolver;
        public String descripcion;
        public Reportes.PrioridadR prioridad;
    }

    @PostMapping("/crear_reportes")
    public ResponseEntity<?> crearReporte(@RequestBody ReporteRequest request) {
        try {
            Reportes nuevoReporte = reportesNegocio.crearReporte(
                    request.encargadoResolver,
                    request.descripcion,
                    request.prioridad
            );

            return ResponseEntity.ok(nuevoReporte);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/buscar_reporte")
    public ResponseEntity<?> obtenerReporte(@RequestBody Map<String, String> requestBody) {
        String codigoReporte = requestBody.get("codigoReporte");

        if (codigoReporte == null || codigoReporte.isEmpty()) {
            return ResponseEntity.badRequest().body("El código de reporte no puede estar vacío.");
        }

        if (codigoReporte.length() != 15) {
            return ResponseEntity.badRequest().body("El código de reporte debe de tener exactamente 15 caracteres.");
        }

        if (!codigoReporte.matches("^RPT-\\d{11}$")) {
            return ResponseEntity.badRequest().body("El código de reporte debe de seguir el formato correspondiente. EJEMPLO: RPT-12345678901");
        }

        try {
            Reportes reporte = reportesNegocio.buscarPorCodigo(codigoReporte);
            return ResponseEntity.ok(reporte);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/actualizar_reporte")
    public ResponseEntity<?> actualizarReporte(@RequestBody Map<String, String> requestBody) {
        try {
            String codigoReporte = requestBody.get("codigoReporte");
            String descripcionReporte = requestBody.get("descripcionReporte");
            String encargadoResolver = requestBody.get("encargadoResolver");
            Reportes.PrioridadR prioridad = Reportes.PrioridadR.valueOf(requestBody.get("prioridad"));
            Reportes.EstadoR estado = Reportes.EstadoR.valueOf(requestBody.get("estado"));

            // Llamada a la lógica de negocio sin el subestado
            Reportes reporteActualizado = reportesNegocio.actualizarReporte(
                    codigoReporte,
                    descripcionReporte,
                    encargadoResolver,
                    prioridad,
                    estado
            );

            return ResponseEntity.ok(reporteActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/responder_reporte")
    public ResponseEntity<?> responderReporte(@RequestBody Map<String, String> requestBody) {
        try {
            String codigoReporte = requestBody.get("codigoReporte");
            String respuesta = requestBody.get("respuesta");
            Reportes.SubestadoR subestado = Reportes.SubestadoR.valueOf(requestBody.get("subestado"));

            Reportes reporteActualizado = reportesNegocio.responderReporte(codigoReporte, respuesta, subestado);

            return ResponseEntity.ok(reporteActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
