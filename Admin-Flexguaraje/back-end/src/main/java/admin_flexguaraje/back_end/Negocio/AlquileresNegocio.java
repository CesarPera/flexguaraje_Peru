package admin_flexguaraje.back_end.Negocio;


import admin_flexguaraje.back_end.Modelo.Alquileres;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Modelo.Espacio;
import admin_flexguaraje.back_end.Repositorio.AlquileresRepositorio;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import admin_flexguaraje.back_end.Repositorio.EspacioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class AlquileresNegocio {
    @Autowired
    private final AlquileresRepositorio AlquileresRepositorio;

    @Autowired
    public AlquileresNegocio(AlquileresRepositorio AlquileresRepositorio) {
        this.AlquileresRepositorio = AlquileresRepositorio;
    }

    @Autowired
    private EspacioRepositorio espacioRepositorio; // Repositorio de la tabla Espacio

    @Autowired
    private ClienteRepositorio ClienteRepositorio; // Repositorio de la tabla Cliente

    public List<Alquileres> listarAlquileres() {
        return AlquileresRepositorio.findAll();
    }

    @Transactional
    public Alquileres agregarClienteAlEspacio(String dni, Long idEspacio, LocalDate fechaInicio, LocalDate fechaFin) {
        // Buscar espacio
        Espacio espacio = espacioRepositorio.findById(idEspacio)
                .orElseThrow(() -> new IllegalArgumentException("El espacio no existe"));

        // Verificar que el espacio esté disponible
        if (!espacio.getEstado().equals(Espacio.EstadoEspacio.Disponible)) {
            throw new IllegalArgumentException("El espacio ya está ocupado");
        }

        // Buscar cliente por DNI
        Cliente cliente = ClienteRepositorio.findByDni(dni);
        if (cliente == null) {
            throw new IllegalArgumentException("El cliente con DNI " + dni + " no existe");
        }

        // Crear el nuevo alquiler
        Alquileres alquiler = new Alquileres();
        alquiler.setEspacio(espacio);
        alquiler.setCliente(cliente);
        alquiler.setFechaInicioAlquiler(fechaInicio);
        alquiler.setFechaFinAlquiler(fechaFin);

        // Guardar el alquiler en la base de datos
        Alquileres nuevoAlquiler = AlquileresRepositorio.save(alquiler);

        // Actualizar el estado del espacio a "OCUPADO"
        espacio.setEstado(Espacio.EstadoEspacio.Ocupado);
        espacioRepositorio.save(espacio);

        return nuevoAlquiler;
    }

    public Long obtenerIdPorCodigoEspacio(String codigoEspacio) {
        // Consulta el repositorio de espacios para obtener el ID correspondiente al código
        return espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .map(Espacio::getIdEspacio)
                .orElse(null); // Retorna null si no encuentra el código
    }

    @Transactional
    public Espacio actualizarEstadoPorCodigo(String codigoEspacio, Espacio.EstadoEspacio nuevoEstado) {
        // Buscar el espacio por su código
        Espacio espacio = espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .orElseThrow(() -> new IllegalArgumentException("El código del espacio no existe"));

        // Verificar si el espacio tiene un cliente asociado a través de un alquiler activo
        boolean tieneCliente = AlquileresRepositorio.existsByEspacioAndFechaFinAlquilerAfter(espacio, LocalDate.now());

        // Reglas de validación según el estado
        if (espacio.getEstado() == Espacio.EstadoEspacio.Ocupado) {
            if (nuevoEstado == Espacio.EstadoEspacio.Disponible) {
                if (tieneCliente) {
                    throw new IllegalArgumentException("El espacio tiene un cliente asociado, no puede marcarse como Disponible.");
                }
            }
        }

        // Actualizar el estado del espacio
        espacio.setEstado(nuevoEstado);
        return espacioRepositorio.save(espacio); // Guardar y retornar el espacio actualizado
    }

    @Transactional
    public Alquileres actualizarClienteEnAlquiler(String codigoEspacio, String nuevoDniCliente, LocalDate nuevaFechaInicio, LocalDate nuevaFechaFin) {
        // Buscar el espacio basado en el códigoEspacio
        Espacio espacio = espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró un espacio con el código proporcionado"));

        // Verificar si existe un alquiler asociado al espacio
        Alquileres alquiler = AlquileresRepositorio.findByEspacio_IdEspacio(espacio.getIdEspacio())
                .orElseThrow(() -> new IllegalArgumentException("No existe un alquiler asociado al espacio"));

        // Buscar el cliente basado en el nuevo DNI
        Cliente nuevoCliente = ClienteRepositorio.findByDni(nuevoDniCliente);
        if (nuevoCliente == null) {
            throw new IllegalArgumentException("No existe un cliente con el DNI proporcionado");
        }

        // Actualizar los datos del alquiler
        alquiler.setCliente(nuevoCliente);
        alquiler.setFechaInicioAlquiler(nuevaFechaInicio);
        alquiler.setFechaFinAlquiler(nuevaFechaFin);

        // Guardar los cambios
        return AlquileresRepositorio.save(alquiler);
    }

    @Transactional
    public void eliminarAlquilerPorCodigoEspacio(String codigoEspacio) {
        // Buscar el espacio por su código
        Espacio espacio = espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .orElseThrow(() -> new IllegalArgumentException("El espacio no existe"));

        // Verificar si existe un alquiler asociado al espacio
        Alquileres alquiler = AlquileresRepositorio.findByEspacio_IdEspacio(espacio.getIdEspacio())
                .orElseThrow(() -> new IllegalArgumentException("No existe un alquiler asociado al espacio"));

        // Eliminar el alquiler
        AlquileresRepositorio.delete(alquiler);

        // Cambiar el estado del espacio a DISPONIBLE
        espacio.setEstado(Espacio.EstadoEspacio.Disponible);
        espacioRepositorio.save(espacio);
    }

}