package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Modelo.Solicitudes;
import admin_flexguaraje.back_end.Repositorio.SolicitudesRepositorio;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SolicitudNegocio {

    private static final Logger logger = LoggerFactory.getLogger(SolicitudNegocio.class);

    @Autowired
    private SolicitudesRepositorio solicitudesRepositorio;

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    // Generar código de solicitud automático
    private String generarCodigoSolicitud() {
        return "SOL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    // Crear una nueva solicitud
    public Solicitudes crearSolicitud(
            Solicitudes.TipoSolicitud tipoSolicitud,
            Solicitudes.Categoria categoria,
            Cliente cliente,
            String descripcion,
            Solicitudes.Prioridad prioridad,
            Solicitudes.Estado estado,
            Solicitudes.Subestado subestado) {

        try {
            // Validación de parámetros
            if (tipoSolicitud == null || categoria == null || cliente == null ||
                    descripcion == null || prioridad == null || estado == null || subestado == null) {
                throw new IllegalArgumentException("Todos los campos son obligatorios.");
            }

            logger.info("Creando solicitud con: tipoSolicitud={}, categoria={}, prioridad={}, estado={}, subestado={} ",
                    tipoSolicitud, categoria, prioridad, estado, subestado);

            // Creación de la solicitud
            Solicitudes solicitud = new Solicitudes();
            solicitud.setCodigoSolicitud(generarCodigoSolicitud()); // Código automático
            solicitud.setFechaSolicitud(LocalDate.now()); // Fecha automática asignada
            solicitud.setTipoSolicitud(tipoSolicitud);
            solicitud.setCategoria(categoria);
            solicitud.setPrioridad(prioridad);
            solicitud.setEstado(estado);
            solicitud.setSubestado(subestado);
            solicitud.setCliente(cliente);
            solicitud.setDescripcion(descripcion);

            // Guardar en BD
            Solicitudes solicitudGuardada = solicitudesRepositorio.save(solicitud);
            logger.info("Solicitud creada con ID: {}", solicitudGuardada.getIdSolicitud());
            return solicitudGuardada;
        } catch (Exception e) {
            logger.error("Error al crear la solicitud: " + e.getMessage(), e);
            throw new RuntimeException("No se pudo crear la solicitud. Error: " + e.getMessage());
        }
    }

    // Obtener un cliente por su DNI
    public Cliente obtenerClientePorDni(String dni) {
        Cliente cliente = clienteRepositorio.findByDni(dni);
        if (cliente == null) {
            throw new RuntimeException("Cliente con DNI " + dni + " no encontrado.");
        }
        return cliente;
    }

    // Listar todas las solicitudes
    public List<Solicitudes> listarSolicitudes() {
        try {
            List<Solicitudes> solicitudes = solicitudesRepositorio.findAll();
            logger.info("Se encontraron {} solicitudes", solicitudes.size());
            return solicitudes;
        } catch (Exception e) {
            logger.error("Error al listar solicitudes: " + e.getMessage(), e);
            throw new RuntimeException("Error al obtener solicitudes.");
        }
    }

    // Obtener una solicitud por su código
    public Optional<Solicitudes> obtenerSolicitudPorCodigo(String CodigoSolicitud) {
        try {
            return solicitudesRepositorio.findByCodigoSolicitud(CodigoSolicitud);
        } catch (Exception e) {
            logger.error("Error al obtener solicitud con código {}: {}", CodigoSolicitud, e.getMessage());
            throw new RuntimeException("No se pudo obtener la solicitud con el código: " + CodigoSolicitud);
        }
    }

    // Actualizar una solicitud existente
    public Solicitudes actualizarSolicitud(Solicitudes solicitud) {
        try {
            // Validar que la solicitud exista en la base de datos
            if (solicitud == null || solicitud.getIdSolicitud() == null) {
                throw new IllegalArgumentException("La solicitud no puede ser nula o sin ID.");
            }

            // Verificar si la solicitud existe
            Solicitudes solicitudExistente = solicitudesRepositorio.findById(solicitud.getIdSolicitud())
                    .orElseThrow(() -> new RuntimeException("Solicitud con ID " + solicitud.getIdSolicitud() + " no encontrada."));

            // Actualizar datos
            solicitudExistente.setDescripcion(solicitud.getDescripcion() != null ? solicitud.getDescripcion() : solicitudExistente.getDescripcion());
            solicitudExistente.setPrioridad(solicitud.getPrioridad() != null ? solicitud.getPrioridad() : solicitudExistente.getPrioridad());
            solicitudExistente.setEstado(solicitud.getEstado() != null ? solicitud.getEstado() : solicitudExistente.getEstado());
            solicitudExistente.setSubestado(solicitud.getSubestado() != null ? solicitud.getSubestado() : solicitudExistente.getSubestado());

            // Guardar la solicitud actualizada
            Solicitudes solicitudActualizada = solicitudesRepositorio.save(solicitudExistente);
            logger.info("Solicitud con ID {} actualizada correctamente.", solicitudActualizada.getIdSolicitud());
            return solicitudActualizada;
        } catch (Exception e) {
            logger.error("Error al actualizar la solicitud: " + e.getMessage(), e);
            throw new RuntimeException("No se pudo actualizar la solicitud. Error: " + e.getMessage());
        }
    }
}
