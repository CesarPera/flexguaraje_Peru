package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Espacio;
import admin_flexguaraje.back_end.Modelo.Alquileres;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Repositorio.AlquileresRepositorio;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import admin_flexguaraje.back_end.Repositorio.EspacioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class AlquileresNegocio {

    @Autowired
    private AlquileresRepositorio alquileresRepositorio; // Cambié el nombre aquí

    @Autowired
    public AlquileresNegocio(AlquileresRepositorio alquileresRepositorio) { // Cambié el nombre aquí
        this.alquileresRepositorio = alquileresRepositorio; // Cambié el nombre aquí
    }

    @Autowired
    private EspacioRepositorio espacioRepositorio; // Repositorio de la tabla Espacio

    @Autowired
    private ClienteRepositorio clienteRepositorio; // Repositorio de la tabla Cliente

    public boolean existeDni(String dni) {
        // Consulta en el repositorio ClienteRepositorio para verificar si el DNI existe
        return clienteRepositorio.existsByDni(dni); // Supone que tienes un método existsByDni en ClienteRepositorio
    }

    public boolean existeCodigoEspacio(String codigoEspacio) {
        // Consulta en el repositorio EspacioRepositorio para verificar si el código de espacio existe
        return espacioRepositorio.existsByCodigoEspacio(codigoEspacio); // Supone que tienes un método existsByCodigoEspacio en EspacioRepositorio
    }

    // LISTAR ALQUILERES GENERALES
    public List<Alquileres> listarAlquileres() {
        return alquileresRepositorio.findAll(); // Cambié el nombre aquí
    }

    // LISTAR ALQUILERES CON SOLO ESTADO "NO IGNORAR"
    public List<Alquileres> obtenerAlquileresNoIgnorar() {
        return alquileresRepositorio.findByEstado(Alquileres.estadoAlquiler.No_Ignorar); // Cambié el nombre aquí
    }

    public Long obtenerIdPorCodigoEspacio(String codigoEspacio) {
        // Consulta el repositorio de espacios para obtener el ID correspondiente al código
        return espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .map(Espacio::getIdEspacio)
                .orElse(null); // Retorna null si no encuentra el código
    }

    public boolean espacioTieneAlquiler(String codigoEspacio) {
        // Obtener el ID del espacio a partir del código
        Long idEspacio = obtenerIdPorCodigoEspacio(codigoEspacio);
        if (idEspacio == null) {
            throw new IllegalArgumentException("El código del espacio no existe.");
        }
        // Verificar si existe un alquiler activo para el espacio
        return alquileresRepositorio.findByEspacio_IdEspacioAndEstado(idEspacio, Alquileres.estadoAlquiler.No_Ignorar).isPresent(); // Cambié el nombre aquí
    }

    @Transactional
    public Alquileres agregarClienteAlEspacio(String dni, Long idEspacio, LocalDate fechaFin) {
        // Validar que el DNI existe
        if (!existeDni(dni)) {
            throw new IllegalArgumentException("El DNI proporcionado no existe");
        }

        // Validar que el código de espacio existe
        if (!existeCodigoEspacio(espacioRepositorio.findById(idEspacio).orElseThrow(() -> new IllegalArgumentException("El espacio no existe")).getCodigoEspacio())) {
            throw new IllegalArgumentException("El código del espacio no existe");
        }

        // Buscar el espacio y cliente
        Espacio espacio = espacioRepositorio.findById(idEspacio)
                .orElseThrow(() -> new IllegalArgumentException("El espacio no existe"));

        Cliente cliente = clienteRepositorio.findByDni(dni); // Cambié el nombre aquí
        if (cliente == null) {
            throw new IllegalArgumentException("No se encontró un cliente con el DNI proporcionado");
        }

        // Asignar la fecha de inicio si no se ha recibido
        LocalDate fechaInicio = LocalDate.now(); // Asignar la fecha actual si no se pasa

        // Calcular los días de alquiler
        long diasAlquiler = ChronoUnit.DAYS.between(fechaInicio, fechaFin);
        if (diasAlquiler <= 0) {
            throw new IllegalArgumentException("La fecha de fin debe ser posterior a la fecha de inicio");
        }

        // Crear el nuevo alquiler
        Alquileres alquiler = new Alquileres();
        alquiler.setEspacio(espacio);
        alquiler.setCliente(cliente);
        alquiler.setFechaInicioAlquiler(fechaInicio);
        alquiler.setFechaFinAlquiler(fechaFin);

        String diasTexto = (diasAlquiler == 1) ? diasAlquiler + " Día" : diasAlquiler + " Días";
        alquiler.setDias_alquiler(diasTexto);

        alquiler.setEstado(Alquileres.estadoAlquiler.No_Ignorar);

        // Guardar el alquiler en la base de datos
        Alquileres nuevoAlquiler = alquileresRepositorio.save(alquiler); // Cambié el nombre aquí

        // Actualizar el estado del espacio a "OCUPADO"
        espacio.setEstado(Espacio.EstadoEspacio.Ocupado);
        espacio.setSubestado(Espacio.SubestadoEspacio.Activo);
        espacioRepositorio.save(espacio);

        return nuevoAlquiler;
    }

    @Transactional
    public Espacio actualizarEstadoPorCodigo(String codigoEspacio, Espacio.EstadoEspacio nuevoEstado) {
        // Validar que el código de espacio existe
        if (!existeCodigoEspacio(codigoEspacio)) {
            throw new IllegalArgumentException("El código del espacio no existe");
        }

        // Buscar el espacio por su código
        Espacio espacio = espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .orElseThrow(() -> new IllegalArgumentException("El código del espacio no existe"));

        // Verificar el subestado del espacio
        Espacio.SubestadoEspacio subestado = espacio.getSubestado();

        // Si el subestado es ACTIVO (espacio con cliente)
        if (subestado == Espacio.SubestadoEspacio.Activo) {
            // Buscar el alquiler asociado y verificar su estado
            Optional<Alquileres> alquilerOpt = alquileresRepositorio.findByEspacio_IdEspacioAndEstado(espacio.getIdEspacio(), Alquileres.estadoAlquiler.No_Ignorar);

            if (alquilerOpt.isPresent()) {
                Alquileres alquiler = alquilerOpt.get();
                if (nuevoEstado == Espacio.EstadoEspacio.Disponible) {
                    // Si el alquiler tiene estado NO_IGNORAR, no se puede cambiar el estado del espacio a "Disponible"
                    throw new IllegalArgumentException("El espacio con cliente no puede estar disponible.");
                }
            }
        }

        // Si el subestado es DESACTIVADO (espacio sin cliente)
        else if (subestado == Espacio.SubestadoEspacio.Desactivado) {
            // Si el espacio está en DESACTIVADO, se puede cambiar a cualquier estado, incl. "Ocupado"
            if (nuevoEstado == Espacio.EstadoEspacio.Ocupado) {
                // No es necesario hacer ninguna comprobación adicional, se puede marcar como "Ocupado"
            }
        }

        // Actualizar el estado del espacio
        espacio.setEstado(nuevoEstado);

        // Manejar el cambio de subestado según el estado
        if (nuevoEstado == Espacio.EstadoEspacio.Ocupado && subestado == Espacio.SubestadoEspacio.Desactivado) {
            espacio.setSubestado(Espacio.SubestadoEspacio.Desactivado); // Dejar el subestado como DESACTIVADO si es sin cliente
        } else if (nuevoEstado == Espacio.EstadoEspacio.Ocupado) {
            espacio.setSubestado(Espacio.SubestadoEspacio.Activo); // Cambiar a ACTIVO si el espacio tiene un cliente
        }

        // Guardar el espacio actualizado
        return espacioRepositorio.save(espacio);
    }

    @Transactional
    public Alquileres actualizarClienteEnAlquiler(String codigoEspacio, String nuevoDniCliente) {
        // Validar que el DNI del nuevo cliente existe
        if (!existeDni(nuevoDniCliente)) {
            throw new IllegalArgumentException("No existe un cliente con el DNI proporcionado");
        }

        // Validar que el código de espacio existe
        if (!existeCodigoEspacio(codigoEspacio)) {
            throw new IllegalArgumentException("El código del espacio no existe");
        }

        // Buscar el espacio y el alquiler
        Espacio espacio = espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró un espacio con el código proporcionado"));

        Alquileres alquiler = alquileresRepositorio.findByEspacio_IdEspacioAndEstado(espacio.getIdEspacio(), Alquileres.estadoAlquiler.No_Ignorar)
                .orElseThrow(() -> new IllegalArgumentException("No existe un alquiler activo o en estado 'No_Ignorar' para este espacio"));

        // Buscar el nuevo cliente
        Cliente nuevoCliente = clienteRepositorio.findByDni(nuevoDniCliente);
        if (nuevoCliente == null) {
            throw new IllegalArgumentException("No existe un cliente con el DNI proporcionado");
        }

        alquiler.setCliente(nuevoCliente);
        return alquileresRepositorio.save(alquiler); // Cambié el nombre aquí
    }

    @Transactional
    public void actualizarEstadoAlquilerparaeliminar(String codigoEspacio) {
        // Validar que el código de espacio existe
        if (!existeCodigoEspacio(codigoEspacio)) {
            throw new IllegalArgumentException("El código del espacio no existe");
        }

        // Buscar el espacio y el alquiler asociado
        Espacio espacio = espacioRepositorio.findByCodigoEspacio(codigoEspacio)
                .orElseThrow(() -> new IllegalArgumentException("El espacio no existe"));

        Alquileres alquiler = alquileresRepositorio.findByEspacio_IdEspacioAndEstado(espacio.getIdEspacio(), Alquileres.estadoAlquiler.No_Ignorar)
                .orElseThrow(() -> new IllegalArgumentException("No existe un alquiler activo con el espacio proporcionado"));

        // Cambiar el estado del alquiler a 'IGNORAR'
        alquiler.setEstado(Alquileres.estadoAlquiler.Ignorar);
        alquileresRepositorio.save(alquiler); // Cambié el nombre aquí

        // Cambiar el estado del espacio a DISPONIBLE y subestado a DESACTIVADO
        espacio.setEstado(Espacio.EstadoEspacio.Disponible);
        espacio.setSubestado(Espacio.SubestadoEspacio.Desactivado);
        espacioRepositorio.save(espacio);
    }

}
