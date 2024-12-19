package admin_flexguaraje.back_end.Modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "espacio",
        uniqueConstraints = @UniqueConstraint(columnNames = "codigo_espacio")) // Agregar esta línea
public class Espacio {

    @Id
    @Column(name = "id_espacio")
    private Long idEspacio;

    @Column(name = "codigo_espacio", nullable = false, unique = true, length = 30)
    private String codigoEspacio;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 15)
    private EstadoEspacio estado = EstadoEspacio.Disponible;

    public Long getIdEspacio() {
        return idEspacio;
    }

    public void setIdEspacio(Long idEspacio) {
        this.idEspacio = idEspacio;
    }

    public String getCodigoEspacio() {
        return codigoEspacio;
    }

    public void setCodigoEspacio(String codigoEspacio) {
        this.codigoEspacio = codigoEspacio;
    }

    public EstadoEspacio getEstado() {
        return estado;
    }

    public void setEstado(EstadoEspacio estado) {
        this.estado = estado;
    }

    public enum EstadoEspacio {
        Disponible,
        Ocupado,
        Mantenimiento
    }
}

