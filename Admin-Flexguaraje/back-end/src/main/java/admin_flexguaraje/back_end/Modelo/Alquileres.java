package admin_flexguaraje.back_end.Modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "alquileres",
        uniqueConstraints = @UniqueConstraint(columnNames = {"id_espacio", "fecha_inicio_alquiler", "fecha_fin_alquiler"}))
public class Alquileres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alquiler")
    private Long idAlquiler;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_cliente", referencedColumnName = "id_cliente", nullable = false,
            foreignKey = @ForeignKey(name = "FK_Alquiler_Cliente"))
    @JsonManagedReference
    private Cliente cliente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_espacio", referencedColumnName = "id_espacio", nullable = false,
            foreignKey = @ForeignKey(name = "FK_Alquiler_Espacio"))
    private Espacio espacio;

    @Column(name = "fecha_inicio_alquiler", nullable = false)
    private LocalDate fechaInicioAlquiler;

    @Column(name = "fecha_fin_alquiler", nullable = false)
    private LocalDate fechaFinAlquiler;

    public Long getIdAlquiler() {
        return idAlquiler;
    }

    public void setIdAlquiler(Long idAlquiler) {
        this.idAlquiler = idAlquiler;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Espacio getEspacio() {
        return espacio;
    }

    public void setEspacio(Espacio espacio) {
        this.espacio = espacio;
    }

    public LocalDate getFechaInicioAlquiler() {
        return fechaInicioAlquiler;
    }

    public void setFechaInicioAlquiler(LocalDate fechaInicioAlquiler) {
        this.fechaInicioAlquiler = fechaInicioAlquiler;
    }

    public LocalDate getFechaFinAlquiler() {
        return fechaFinAlquiler;
    }

    public void setFechaFinAlquiler(LocalDate fechaFinAlquiler) {
        this.fechaFinAlquiler = fechaFinAlquiler;
    }

    @PrePersist
    @PreUpdate
    private void validarFechas() {
        if (fechaInicioAlquiler.isAfter(fechaFinAlquiler)) {
            throw new IllegalArgumentException("La fecha de inicio debe ser menor o igual a la fecha de fin.");
        }
    }
}
