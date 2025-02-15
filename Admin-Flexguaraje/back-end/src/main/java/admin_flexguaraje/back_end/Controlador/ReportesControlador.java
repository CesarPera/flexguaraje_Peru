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
    public ResponseEntity<Reportes> crearReporte(@RequestBody ReporteRequest request) {
        Reportes nuevoReporte = reportesNegocio.crearReporte(
                request.encargadoResolver,
                request.descripcion,
                request.prioridad
        );

        return ResponseEntity.ok(nuevoReporte);
    } 

    @PostMapping("/buscar_reporte")
    public ResponseEntity<Reportes> obtenerReporte(@RequestBody Map<String, String> requestBody) {
        String codigoReporte = requestBody.get("codigoReporte");

        if (codigoReporte == null || codigoReporte.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Reportes reporte = reportesNegocio.buscarPorCodigo(codigoReporte);
        return ResponseEntity.ok(reporte);
    }
}
