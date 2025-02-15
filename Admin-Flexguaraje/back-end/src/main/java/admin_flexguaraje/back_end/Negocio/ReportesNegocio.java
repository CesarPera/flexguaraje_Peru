package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Reportes;
import admin_flexguaraje.back_end.Modelo.Usuario;
import admin_flexguaraje.back_end.Repositorio.ReportesRepositorio;
import admin_flexguaraje.back_end.Repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class ReportesNegocio {

    @Autowired
    private ReportesRepositorio reportesRepositorio;

    public List<Reportes> listarTodos() {
        return reportesRepositorio.findAll();
    }

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;  // Inyectar el repositorio de Usuario
    private final Random random = new Random();

    public ReportesNegocio(ReportesRepositorio reportesRepository, UsuarioRepositorio usuarioRepository) {
        this.reportesRepositorio = reportesRepository;
        this.usuarioRepositorio = usuarioRepository;
    }

    public Reportes crearReporte(String encargadoResolver, String descripcion, Reportes.PrioridadR prioridad) {
        // Buscar el usuario por DNI
        Usuario usuario = usuarioRepositorio.findByDni(encargadoResolver)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con DNI: " + encargadoResolver));

        // Generar código de reporte automático en formato RPT-12345678901
        String codigoReporte = generarCodigoReporte();

        // Crear un nuevo reporte
        Reportes reporte = new Reportes();
        reporte.setUsuario(usuario);
        reporte.setEncargadoResolver(usuario.getDni()); // Asignar el DNI del usuario
        reporte.setCodigoReporte(codigoReporte); // Código automático
        reporte.setFechaReporte(LocalDate.now()); // Fecha automática
        reporte.setDescripcionReporte(descripcion);
        reporte.setPrioridad(prioridad);
        reporte.setEstado(Reportes.EstadoR.Pendiente); // Estado predeterminado
        reporte.setSubestado(null); // Subestado no obligatorio

        // Guardar el reporte en la base de datos
        return reportesRepositorio.save(reporte);
    }

    private String generarCodigoReporte() {
        long numeroAleatorio = 10000000000L + (long) (random.nextDouble() * 90000000000L); // Número entre 10^10 y 10^11
        return "RPT-" + numeroAleatorio;
    }
    public Reportes buscarPorCodigo(String codigoReporte) {
        return reportesRepositorio.findByCodigoReporte(codigoReporte)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado con código: " + codigoReporte));
    }
}

