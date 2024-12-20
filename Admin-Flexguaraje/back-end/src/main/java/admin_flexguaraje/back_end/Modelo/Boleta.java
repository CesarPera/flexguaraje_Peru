package admin_flexguaraje.back_end.Modelo;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "boleta",
        uniqueConstraints = @UniqueConstraint(columnNames = {"id_alquiler", "fecha_emision", "codigo_boleta"}))
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_boleta")
    private Long idBoleta;

    @ManyToOne
    @JoinColumn(name = "id_alquiler", nullable = false, foreignKey = @ForeignKey(name = "FK_boleta_Alquiler"))
    private Alquileres alquileres; // Cambiar de List<Alquileres> a Alquileres

    @Column(name = "codigo_boleta", nullable = false, length = 30)
    private String codigoBoleta;

    @Column(name = "metodo_pago", nullable = false, length = 30)
    private String metodoPago;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDate fechaEmision; // Cambiado a LocalDate

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

    public String getCodigoBoleta() {
        return codigoBoleta;
    }

    public void setCodigoBoleta(String codigoBoleta) {
        this.codigoBoleta = codigoBoleta;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
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

    @PrePersist
    @PreUpdate
    public void validarDatos() {
        if (montoPagar == null || montoPagar.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto a pagar debe ser mayor a 0.");
        }
    }
}
