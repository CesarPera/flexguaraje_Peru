package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Alquileres;
import admin_flexguaraje.back_end.Modelo.Boleta;
import admin_flexguaraje.back_end.Modelo.Cliente;
import admin_flexguaraje.back_end.Modelo.Espacio;
import admin_flexguaraje.back_end.Repositorio.AlquileresRepositorio;
import admin_flexguaraje.back_end.Repositorio.BoletaRepositorio;
import admin_flexguaraje.back_end.Repositorio.ClienteRepositorio;
import admin_flexguaraje.back_end.Repositorio.EspacioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BoletaNegocio {

    @Autowired
    private BoletaRepositorio boletaRepositorio;

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @Autowired
    private EspacioRepositorio EspacioRepositorio;

    @Autowired
    private AlquileresRepositorio alquileresRepositorio;

    public List<Boleta> listarBoleta() {
        return boletaRepositorio.findAll();
    }

    @Transactional
    public Boleta agregarBoleta(String dni, String codigoEspacio, String codigoBoleta, String metodoPago,
                                LocalDate fechaEmision, BigDecimal montoPagar) {
        // Buscar al cliente por el DNI
        Cliente cliente = clienteRepositorio.findByDni(dni);
        if (cliente == null) {
            throw new RuntimeException("Cliente no encontrado");
        }

        // Buscar el alquiler correspondiente al cliente y el código de espacio
        List<Alquileres> alquileres = alquileresRepositorio.findByClienteAndEspacioCodigoEspacio(cliente, codigoEspacio);
        if (alquileres.isEmpty()) {
            throw new RuntimeException("El cliente no tiene alquileres activos para ese espacio");
        }

        // Seleccionar el alquiler (supongamos que seleccionamos el primero de los activos)
        Alquileres alquilerSeleccionado = alquileres.stream()
                .filter(alquiler -> alquiler.getEspacio().getEstado() == Espacio.EstadoEspacio.Ocupado)  // Comparación con el ENUM
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No hay alquileres 'Ocupado' para ese espacio"));

        // Crear la boleta
        Boleta boleta = new Boleta();
        boleta.setAlquileres(alquilerSeleccionado);
        boleta.setCodigoBoleta(codigoBoleta);
        boleta.setMetodoPago(metodoPago);
        boleta.setFechaEmision(fechaEmision);
        boleta.setMontoPagar(montoPagar);

        // Guardar la boleta
        return boletaRepositorio.save(boleta);
    }

    @Transactional
    public String actualizarBoleta(String dni, String codigoBoleta, String codigoEspacio, BigDecimal montoPagar, LocalDate fechaEmision) {
        // Buscar cliente por DNI
        Cliente cliente = clienteRepositorio.findByDni(dni);
        if (cliente == null) {
            throw new RuntimeException("Cliente no encontrado.");
        }

        // Buscar alquiler asociado al cliente, sin necesidad de verificar si está activo o no
        List<Alquileres> alquileres = alquileresRepositorio.findByClienteAndEspacioCodigoEspacio(cliente, codigoEspacio);
        if (alquileres.isEmpty()) {
            throw new RuntimeException("Alquiler no encontrado para el cliente con el código de espacio especificado.");
        }

        // Buscar boleta por código de boleta y alquiler
        Boleta boleta = boletaRepositorio.findFirstByAlquileresAndCodigoBoleta(alquileres.get(0), codigoBoleta)
                .orElseThrow(() -> new RuntimeException("Boleta no encontrada."));

        // Actualizar boleta
        boleta.setMontoPagar(montoPagar);
        boleta.setFechaEmision(fechaEmision);

        // Guardar la boleta actualizada
        boletaRepositorio.save(boleta);
        return "Boleta actualizada correctamente.";
    }
    @Transactional
    public String eliminarBoleta(String dni, String codigoBoleta) {
        // Verificar si la boleta existe
        Boleta boleta = boletaRepositorio.findByAlquileresClienteDniAndCodigoBoleta(dni, codigoBoleta)
                .orElseThrow(() -> new RuntimeException("Boleta no encontrada con DNI: " + dni + " y Código: " + codigoBoleta));

        // Eliminar la boleta
        boletaRepositorio.deleteByAlquileresClienteDniAndCodigoBoleta(dni, codigoBoleta);

        return "Boleta eliminada correctamente";
    }
}

