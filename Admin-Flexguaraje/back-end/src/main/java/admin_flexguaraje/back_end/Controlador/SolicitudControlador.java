package admin_flexguaraje.back_end.Controlador;

import admin_flexguaraje.back_end.Modelo.Solicitudes;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Negocio.SolicitudNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Date;
import java.time.LocalDate;
import java.time.ZoneId;

@RestController
@RequestMapping("/solicitudes")
public class SolicitudControlador {

    @Autowired
    private SolicitudNegocio solicitudNegocio;

    @PostMapping("/crear")
    public ResponseEntity<Object> crearSolicitud(@RequestBody Map<String, Object> body) {
        try {
            if (body.get("dniCliente") == null || body.get("dniCliente").toString().isEmpty() ||
                    body.get("tipoSolicitud") == null || body.get("tipoSolicitud").toString().isEmpty() ||
                    body.get("categoria") == null || body.get("categoria").toString().isEmpty() ||
                    body.get("descripcion") == null || body.get("descripcion").toString().isEmpty() ||
                    body.get("prioridad") == null || body.get("prioridad").toString().isEmpty() ||
                    body.get("estado") == null || body.get("estado").toString().isEmpty() ||
                    body.get("subestado") == null || body.get("subestado").toString().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Faltan parámetros. Complete todos los campos."));
            }

            // Obtener datos del body
            String dniCliente = body.get("dniCliente").toString();
            String tipoSolicitudStr = body.get("tipoSolicitud").toString();
            String categoriaStr = body.get("categoria").toString();
            String descripcion = body.get("descripcion").toString();
            String prioridadStr = body.get("prioridad").toString();
            String estadoStr = body.get("estado").toString();
            String subestadoStr = body.get("subestado").toString();

            // Validar cliente
            Cliente cliente = solicitudNegocio.obtenerClientePorDni(dniCliente);
            if (cliente == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Cliente con DNI " + dniCliente + " no encontrado."));
            }

            // Convertir Strings a Enums
            Solicitudes.TipoSolicitud tipoSolicitud = Solicitudes.TipoSolicitud.valueOf(tipoSolicitudStr);
            Solicitudes.Categoria categoria = Solicitudes.Categoria.valueOf(categoriaStr);
            Solicitudes.Prioridad prioridad = Solicitudes.Prioridad.valueOf(prioridadStr);
            Solicitudes.Estado estado = Solicitudes.Estado.valueOf(estadoStr);
            Solicitudes.Subestado subestado = Solicitudes.Subestado.valueOf(subestadoStr);

            // Crear solicitud
            Solicitudes solicitudCreada = solicitudNegocio.crearSolicitud(
                    tipoSolicitud,
                    categoria,
                    cliente,
                    descripcion,
                    prioridad,
                    estado,
                    subestado
            );

            return ResponseEntity.status(201).body(Map.of("message", "Solicitud creada exitosamente", "idSolicitud", solicitudCreada.getIdSolicitud()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error en los valores de los enums: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al crear la solicitud", "error", e.getMessage()));
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Solicitudes>> listarSolicitudes() {
        try {
            List<Solicitudes> solicitudes = solicitudNegocio.listarSolicitudes();
            return ResponseEntity.ok(solicitudes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Object> actualizarSolicitud(@RequestBody Map<String, Object> body) {
        try {
            // Obtener el codigo_solicitud desde el body
            String CodigoSolicitud = body.get("codigoSolicitud").toString();

            // Buscar solicitud por codigo_solicitud y verificar que esté en estado Pendiente
            Optional<Solicitudes> solicitudExistente = solicitudNegocio.obtenerSolicitudPorCodigo(CodigoSolicitud);
            if (solicitudExistente.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Solicitud con código " + CodigoSolicitud + " no encontrada."));
            }
            if (solicitudExistente.get().getEstado() != Solicitudes.Estado.Pendiente) {
                return ResponseEntity.badRequest().body(Map.of("message", "Solo se pueden actualizar solicitudes con estado 'Pendiente'." ));
            }

            // Obtener datos para la actualización
            String descripcion = body.get("descripcion") != null ? body.get("descripcion").toString() : solicitudExistente.get().getDescripcion();
            String prioridadStr = body.get("prioridad") != null ? body.get("prioridad").toString() : solicitudExistente.get().getPrioridad().name();
            String estadoStr = body.get("estado") != null ? body.get("estado").toString() : solicitudExistente.get().getEstado().name();
            String subestadoStr = body.get("subestado") != null ? body.get("subestado").toString() : solicitudExistente.get().getSubestado().name();

            // Convertir Strings a Enums
            Solicitudes.Prioridad prioridad = Solicitudes.Prioridad.valueOf(prioridadStr);
            Solicitudes.Estado estado = Solicitudes.Estado.valueOf(estadoStr);
            Solicitudes.Subestado subestado = Solicitudes.Subestado.valueOf(subestadoStr);

            // Actualizar solicitud
            solicitudExistente.get().setDescripcion(descripcion);
            solicitudExistente.get().setPrioridad(prioridad);
            solicitudExistente.get().setEstado(estado);
            solicitudExistente.get().setSubestado(subestado);

            // Guardar la solicitud actualizada
            Solicitudes solicitudActualizada = solicitudNegocio.actualizarSolicitud(solicitudExistente.orElse(null));

            return ResponseEntity.ok(Map.of("message", "Solicitud actualizada exitosamente", "idSolicitud", solicitudActualizada.getIdSolicitud()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error en los valores de los enums: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al actualizar la solicitud", "error", e.getMessage()));
        }
    }

    // Nuevo método para crear respuesta y cerrar solicitud
    @PostMapping("/crear_respuesta")
    public ResponseEntity<Object> crearRespuesta(@RequestBody Map<String, Object> body) {
        try {
            String codigoSolicitud = body.get("codigoSolicitud").toString();
            String respuesta = body.get("respuesta").toString();

            // Buscar la solicitud por código y verificar que esté en estado Pendiente
            Optional<Solicitudes> solicitudExistente = solicitudNegocio.obtenerSolicitudPorCodigo(codigoSolicitud);
            if (solicitudExistente.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Solicitud con código " + codigoSolicitud + " no encontrada."));
            }
            if (solicitudExistente.get().getEstado() != Solicitudes.Estado.Pendiente) {
                return ResponseEntity.badRequest().body(Map.of("message", "Solo se pueden responder solicitudes con estado 'Pendiente'." ));
            }

            // Actualizar la solicitud con la respuesta, cambiar su estado a Cerrado y asignar fechaRespuesta
            Solicitudes solicitud = solicitudExistente.get();
            solicitud.setRespuesta(respuesta); // Asignamos la respuesta
            solicitud.setEstado(Solicitudes.Estado.Cerrado); // Cambiamos el estado a Cerrado

            // Convertir java.util.Date a java.time.LocalDate
            Date fechaRespuesta = new Date();
            LocalDate fechaRespuestaLocalDate = fechaRespuesta.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();

            solicitud.setFechaRespuesta(fechaRespuestaLocalDate); // Asignamos la fecha convertida

            // Guardar la solicitud actualizada
            Solicitudes solicitudActualizada = solicitudNegocio.actualizarSolicitud(solicitud);

            return ResponseEntity.ok(Map.of("message", "Respuesta registrada y solicitud cerrada exitosamente", "idSolicitud", solicitudActualizada.getIdSolicitud()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al registrar la respuesta", "error", e.getMessage()));
        }
    }

}
