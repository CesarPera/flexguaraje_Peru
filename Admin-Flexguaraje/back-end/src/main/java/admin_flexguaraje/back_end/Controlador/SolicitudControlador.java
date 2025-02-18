package admin_flexguaraje.back_end.Controlador;

import admin_flexguaraje.back_end.Modelo.Solicitudes;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Negocio.SolicitudNegocio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
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
            List<String> errores = new ArrayList<>();

            // Validación de campos obligatorios
            if (body.get("dniCliente") == null || body.get("dniCliente").toString().trim().isEmpty()) {
                errores.add(": El campo dniCliente es obligatorio.");
            } else {
                String dniCliente = body.get("dniCliente").toString().trim();
                if (dniCliente.length() != 8 || !dniCliente.matches("\\d{8}")) {
                    errores.add("El campo dniCliente debe tener exactamente 8 caracteres numéricos.");
                }
            }

            if (body.get("tipoSolicitud") == null || body.get("tipoSolicitud").toString().trim().isEmpty()) {
                errores.add(": El campo tipoSolicitud es obligatorio.");
            }
            if (body.get("categoria") == null || body.get("categoria").toString().trim().isEmpty()) {
                errores.add(": El campo categoria es obligatorio.");
            }
            if (body.get("descripcion") == null || body.get("descripcion").toString().trim().isEmpty()) {
                errores.add(": El campo descripcion es obligatorio.");
            }
            if (body.get("prioridad") == null || body.get("prioridad").toString().trim().isEmpty()) {
                errores.add(": El campo prioridad es obligatorio.");
            }
            if (body.get("estado") == null || body.get("estado").toString().trim().isEmpty()) {
                errores.add(": El campo estado es obligatorio.");
            }

            if (!errores.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Errores en la solicitud", "detalles", errores));
            }

            // Capturar datos
            String dniCliente = body.get("dniCliente").toString();
            String tipoSolicitudStr = body.get("tipoSolicitud").toString().trim();
            String categoriaStr = body.get("categoria").toString();
            String descripcion = body.get("descripcion").toString();
            String prioridadStr = body.get("prioridad").toString();
            String estadoStr = body.get("estado").toString().trim();
            String subestadoStr = body.getOrDefault("subestado", "").toString().trim();

            // Validar si el cliente existe
            Cliente cliente = solicitudNegocio.obtenerClientePorDni(dniCliente);
            if (cliente == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Cliente con DNI " + dniCliente + " no encontrado."));
            }

            try {
                // Conversión de valores a enums con validación
                Solicitudes.TipoSolicitud tipoSolicitud = null;
                Solicitudes.Categoria categoria = null;
                Solicitudes.Prioridad prioridad = null;
                Solicitudes.Estado estado = null;
                Solicitudes.Subestado subestado = null;

                try {
                    tipoSolicitud = Solicitudes.TipoSolicitud.valueOf(tipoSolicitudStr);
                } catch (IllegalArgumentException e) {
                    errores.add("Por favor escriba bien su dato: El valor '" + tipoSolicitudStr + "' en tipoSolicitud está mal escrito.");
                }

                try {
                    categoria = Solicitudes.Categoria.valueOf(categoriaStr);
                } catch (IllegalArgumentException e) {
                    errores.add("Por favor escriba bien su dato: El valor '" + categoriaStr + "' en categoria está mal escrito.");
                }

                try {
                    prioridad = Solicitudes.Prioridad.valueOf(prioridadStr);
                } catch (IllegalArgumentException e) {
                    errores.add("Por favor escriba bien su dato: El valor '" + prioridadStr + "' en prioridad está mal escrito.");
                }

                try {
                    estado = Solicitudes.Estado.valueOf(estadoStr);
                } catch (IllegalArgumentException e) {
                    errores.add("Por favor escriba bien su dato: El valor '" + estadoStr + "' en estado está mal escrito.");
                }

                if (!subestadoStr.isEmpty()) {
                    try {
                        subestado = Solicitudes.Subestado.valueOf(subestadoStr);
                    } catch (IllegalArgumentException e) {
                        errores.add("Por favor escriba bien su dato: El valor '" + subestadoStr + "' en subestado está mal escrito.");
                    }
                }

                if (!errores.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("message", "Errores en los valores ingresados", "detalles", errores));
                }

                // **Validaciones solicitadas**
                if (tipoSolicitud == Solicitudes.TipoSolicitud.Consulta) {
                    if (estado != Solicitudes.Estado.Cerrado && estado != Solicitudes.Estado.Cancelado) {
                        return ResponseEntity.badRequest().body(Map.of("message", "Dato denegado: Para tipo de solicitud 'Consulta', solo se permite estado 'Cerrado' o 'Cancelado'."));
                    }

                    if (estado == Solicitudes.Estado.Cerrado) {
                        if (subestadoStr.isEmpty()) {
                            return ResponseEntity.badRequest().body(Map.of("message", "Dato denegado: No se permite crear una solicitud de tipo 'Consulta' con estado 'Cerrado' y subestado vacío."));
                        }
                        if ("No_acogido".equals(subestadoStr)) {
                            return ResponseEntity.badRequest().body(Map.of("message", "Dato denegado: No se permite crear una solicitud de tipo 'Consulta' con estado 'Cerrado' y subestado 'No_acogido'."));
                        }
                    }
                }

                // Creación de la solicitud sin bloqueos adicionales
                Solicitudes solicitudCreada = solicitudNegocio.crearSolicitud(
                        tipoSolicitud.toString(), categoria, cliente, descripcion, prioridad, estado, subestado
                );

                return ResponseEntity.status(201).body(Map.of("message", "Solicitud creada exitosamente", "idSolicitud", solicitudCreada.getIdSolicitud()));

            } catch (Exception e) {
                return ResponseEntity.status(500).body(Map.of("message", "Error al crear la solicitud", "error", e.getMessage()));
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al procesar la solicitud", "error", e.getMessage()));
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
            if (!body.containsKey("codigoSolicitud") || body.get("codigoSolicitud") == null || body.get("codigoSolicitud").toString().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "El campo 'codigoSolicitud' no tiene dato."));
            }

            String CodigoSolicitud = body.get("codigoSolicitud").toString().trim();

            // Buscar solicitud por codigo_solicitud
            Optional<Solicitudes> solicitudExistente = solicitudNegocio.obtenerSolicitudPorCodigo(CodigoSolicitud);
            if (solicitudExistente.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Solicitud con código " + CodigoSolicitud + " no encontrada."));
            }
            Solicitudes solicitud = solicitudExistente.get();

            // Validación: Si el estado original es PENDIENTE, no se puede actualizar a CERRADO
            if (solicitud.getEstado() == Solicitudes.Estado.Pendiente) {
                String nuevoEstado = body.get("estado") != null ? body.get("estado").toString().trim() : null;
                if ("CERRADO".equalsIgnoreCase(nuevoEstado)) {
                    // Bloquear el cambio a CERRADO
                    return ResponseEntity.badRequest().body(Map.of("message", "Cuando el estado es 'PENDIENTE', no puedes actualizarlo a 'CERRADO'."));
                }
            }

            // Lista para almacenar errores
            List<String> errores = new ArrayList<>();

            // Obtener datos con validación de existencia
            String descripcion = body.get("descripcion") != null ? body.get("descripcion").toString() : solicitud.getDescripcion();

            // Validación de prioridad
            if (!body.containsKey("prioridad") || body.get("prioridad") == null || body.get("prioridad").toString().trim().isEmpty()) {
                errores.add("El campo 'prioridad' no tiene dato.");
            }

            // Validación de estado
            if (!body.containsKey("estado") || body.get("estado") == null || body.get("estado").toString().trim().isEmpty()) {
                errores.add("El campo 'estado' no tiene dato.");
            }

            // Si hay errores, devolver la lista de campos faltantes
            if (!errores.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Errores en la solicitud", "detalles", errores));
            }

            // Convertir Strings a Enums
            Solicitudes.Prioridad prioridad;
            Solicitudes.Estado estadoEnum;

            try {
                prioridad = Solicitudes.Prioridad.valueOf(body.get("prioridad").toString().trim());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of("message", "El valor de 'prioridad' no es válido."));
            }

            try {
                estadoEnum = Solicitudes.Estado.valueOf(body.get("estado").toString().trim());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of("message", "El valor de 'estado' no es válido."));
            }

            // Actualizar solicitud
            solicitud.setDescripcion(descripcion);
            solicitud.setPrioridad(prioridad);
            solicitud.setEstado(estadoEnum);

            // Guardar la solicitud actualizada
            Solicitudes solicitudActualizada = solicitudNegocio.actualizarSolicitud(solicitud);

            return ResponseEntity.ok(Map.of("message", "Solicitud actualizada exitosamente", "idSolicitud", solicitudActualizada.getIdSolicitud()));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al actualizar la solicitud", "error", e.getMessage()));
        }
    }


    @PostMapping("/crear_respuesta")
    public ResponseEntity<Object> crearRespuesta(@RequestBody Map<String, Object> body) {
        try {
            String codigoSolicitud = body.get("codigoSolicitud").toString();
            String respuesta = body.get("respuesta").toString();
            String subestadoStr = body.get("subestado").toString();

            // Buscar la solicitud por código y verificar que esté en estado Pendiente
            Optional<Solicitudes> solicitudExistente = solicitudNegocio.obtenerSolicitudPorCodigo(codigoSolicitud);
            if (solicitudExistente.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Solicitud con código " + codigoSolicitud + " no encontrada."));
            }
            if (solicitudExistente.get().getEstado() != Solicitudes.Estado.Pendiente) {
                return ResponseEntity.badRequest().body(Map.of("message", "Solo se pueden responder solicitudes con estado 'Pendiente'."));
            }

            // Validar subestado
            if (!subestadoStr.equals("Acogido") && !subestadoStr.equals("No_acogido")) {
                return ResponseEntity.badRequest().body(Map.of("message", "El subestado debe ser 'Acogido' o 'No_acogido'."));
            }

            // Actualizar la solicitud con la respuesta, cambiar su estado a Cerrado y asignar fechaRespuesta
            Solicitudes solicitud = solicitudExistente.get();
            solicitud.setRespuesta(respuesta);
            solicitud.setEstado(Solicitudes.Estado.Cerrado);
            solicitud.setSubestado(Solicitudes.Subestado.valueOf(subestadoStr));

            // Convertir java.util.Date a java.time.LocalDate
            Date fechaRespuesta = new Date();
            LocalDate fechaRespuestaLocalDate = fechaRespuesta.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();

            solicitud.setFechaRespuesta(fechaRespuestaLocalDate);

            // Guardar la solicitud actualizada
            Solicitudes solicitudActualizada = solicitudNegocio.actualizarSolicitud(solicitud);

            return ResponseEntity.ok(Map.of("message", "Datos registrados correctamente", "idSolicitud", solicitudActualizada.getIdSolicitud()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error al registrar la respuesta", "error", e.getMessage()));
        }
    }

    @PostMapping("/buscar_solicitudes")
    public ResponseEntity<?> buscarPorCodigoSolicitud(@RequestBody Map<String, String> request) {
        String codigoSolicitud = request.get("codigoSolicitud");

        // Validar si el código tiene exactamente 15 caracteres
        if (codigoSolicitud == null || codigoSolicitud.length() != 15) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("mensaje", "El código de solicitud debe tener exactamente 15 caracteres."));
        }

        // Validar si el código sigue el formato SLT-XXXXXXXXXXXX (SLT + 12 números)
// Validar si el código sigue el formato SLT-XXXXXXXXXXX (SLT + 11 números)
        if (!codigoSolicitud.matches("^SLT-\\d{11}$")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("mensaje", "El código de solicitud debe seguir el formato correspondiente. EJEMPLO: SLT-12345678901"));
        }


        // Buscar en la capa de negocio
        Optional<Solicitudes> solicitudOptional = solicitudNegocio.obtenerSolicitudPorCodigo(codigoSolicitud);

        if (solicitudOptional.isPresent()) {
            return ResponseEntity.ok(List.of(solicitudOptional.get())); // Devuelve la solicitud en una lista
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", "No se encontró ninguna solicitud con el código proporcionado."));
        }
    }

}
