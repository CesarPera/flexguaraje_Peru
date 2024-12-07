package admin_flexguaraje.back_end.Modelo;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "boleta",
        uniqueConstraints = @UniqueConstraint(columnNames = {"id_alquiler", "fecha_emision"}))
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_boleta")
    private Long idBoleta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_alquiler", nullable = false)
    private Alquileres alquileres;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDate fechaEmision;

    @Column(name = "monto_pagar", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoPagar;

    public Long getIdBoleta() {
        return idBoleta;
    }

    public void setIdBoleta(Long idBoleta) {
        this.idBoleta = idBoleta;
    }

    public Alquileres getAlquileres() {
        return alquileres;
    }

    public void setAlquileres(Alquileres alquileres) {
        this.alquileres = alquileres;
    }

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public BigDecimal getMontoPagar() {
        return montoPagar;
    }

    public void setMontoPagar(BigDecimal montoPagar) {
        this.montoPagar = montoPagar;
    }

    // Validación personalizada
    @PrePersist
    @PreUpdate
    private void validarDatos() {
        if (montoPagar == null || montoPagar.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto a pagar debe ser mayor a 0.");
        }
    }
}

