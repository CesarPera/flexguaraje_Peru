package admin_flexguaraje.back_end.Modelo;
import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "espacio")
public class Espacio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_espacio")
    private Long idEspacio;  // Cambié 'id' a 'idEspacio' para que sea consistente con el uso en el negocio

    @Column(name = "codigo_espacio", nullable = false)
    private String codigoEspacio;

    @Column(name = "costo", nullable = false)
    private BigDecimal costo;  // Aquí es donde definimos el costo

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_espacio", nullable = false)
    private EstadoEspacio estadoEspacio;

    @Enumerated(EnumType.STRING)
    @Column(name = "subestado_espacio", nullable = false)
    private SubestadoEspacio subestadoEspacio;

    // Métodos getters y setters

    public Long getIdEspacio() {
        return idEspacio;  // Getter para el ID
    }

    public String getCodigoEspacio() {
        return codigoEspacio;
    }

    public EstadoEspacio getEstado() {
        return estadoEspacio;
    }

    public SubestadoEspacio getSubestado() {
        return subestadoEspacio;
    }

    public BigDecimal getCosto() {
        return costo;  // Aquí definimos el getter para el costo
    }

    public void setIdEspacio(Long idEspacio) {
        this.idEspacio = idEspacio;  // Setter para el ID
    }

    public void setCodigoEspacio(String codigoEspacio) {
        this.codigoEspacio = codigoEspacio;
    }

    public void setEstado(EstadoEspacio estadoEspacio) {
        this.estadoEspacio = estadoEspacio;
    }

    public void setSubestado(SubestadoEspacio subestadoEspacio) {
        this.subestadoEspacio = subestadoEspacio;
    }

    public void setCosto(BigDecimal costo) {
        this.costo = costo;  // Setter para el costo
    }

    // Enumeraciones de estado y subestado

    public enum SubestadoEspacio {
        Activo,
        Inactivo,
        Mantenimiento,
        Desactivado // Añadido aquí
    }

    public enum EstadoEspacio {
        Ocupado,
        Libre,
        Reservado,
        No_Disponible,
        Disponible // Añadido aquí
    }
}
