package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Modelo.Solicitudes;
import admin_flexguaraje.back_end.Repositorio.SolicitudesRepositorio;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SolicitudNegocio {

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
            Solicitudes.tipoSolicitud tipoSolicitud,
            Solicitudes.Categoria categoria,
            Cliente cliente,
            String descripcion,
            Solicitudes.Prioridad prioridad,
            Solicitudes.Estado estado,
            Solicitudes.Subestado subestado) {

        // Validación de parámetros
        if (tipoSolicitud == null || categoria == null || cliente == null ||
                descripcion == null || prioridad == null || estado == null || subestado == null) {
            throw new IllegalArgumentException("Todos los campos son obligatorios.");
        }

        // Creación de la solicitud
        Solicitudes solicitud = new Solicitudes();
        solicitud.setCodigoSolicitud(generarCodigoSolicitud()); // Código automático
        solicitud.setFechaSolicitud(LocalDate.now()); // Fecha automática
        solicitud.setTipoSolicitud(tipoSolicitud);
        solicitud.setCategoria(categoria);
        solicitud.setPrioridad(prioridad);
        solicitud.setEstado(estado);
        solicitud.setSubestado(subestado);
        solicitud.setCliente(cliente);
        solicitud.setDescripcion(descripcion);

        // Guardar en BD
        return solicitudesRepositorio.save(solicitud);
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
        return solicitudesRepositorio.findAll();
    }

    // Obtener una solicitud por su código
    public Optional<Solicitudes> obtenerSolicitudPorCodigo(String CodigoSolicitud) {
        return solicitudesRepositorio.findByCodigoSolicitud(CodigoSolicitud);
    }

    // Actualizar una solicitud existente
    public Solicitudes actualizarSolicitud(Solicitudes solicitud) {
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
        return solicitudesRepositorio.save(solicitudExistente);
    }
}
