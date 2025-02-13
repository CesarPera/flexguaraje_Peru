package admin_flexguaraje.back_end.Modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "solicitudes", uniqueConstraints = {
        @UniqueConstraint(columnNames = "codigo_solicitud")
})
public class Solicitudes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitudes")
    private Long idSolicitud;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_cliente", nullable = false, foreignKey = @ForeignKey(name = "FK_solicitud_cliente"))
    private Cliente cliente;

    @Column(name = "codigo_solicitud", nullable = false, length = 15)
    private String codigoSolicitud; // AUTOMATICO

    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDate fechaSolicitud; // AUTOMATICO

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_solicitud", nullable = false, length = 15)
    private TipoSolicitud tipoSolicitud;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false, length = 15)
    private Categoria categoria;

    @Column(name = "descripcion", nullable = false, length = 255)
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(name = "prioridad", nullable = false, length = 15)
    private Prioridad prioridad;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 15)
    private Estado estado;

    @Enumerated(EnumType.STRING)
    @Column(name = "subestado", length = 15)
    private Subestado subestado;

    @Column(name = "fecha_respuesta")
    private LocalDate fechaRespuesta; // AUTOMATICO

    @Column(name = "respuestas", length = 255)
    private String respuesta;

    // Getters y Setters
    public Long getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(Long idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public String getCodigoSolicitud() {
        return codigoSolicitud;
    }

    public void setCodigoSolicitud(String codigoSolicitud) {
        this.codigoSolicitud = codigoSolicitud;
    }

    public LocalDate getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(LocalDate fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public TipoSolicitud getTipoSolicitud() {
        return tipoSolicitud;
    }

    public void setTipoSolicitud(TipoSolicitud tipoSolicitud) {
        this.tipoSolicitud = tipoSolicitud;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Prioridad getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(Prioridad prioridad) {
        this.prioridad = prioridad;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Subestado getSubestado() {
        return subestado;
    }

    public void setSubestado(Subestado subestado) {
        this.subestado = subestado;
    }

    public LocalDate getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(LocalDate fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    // Enums
    public enum TipoSolicitud {
        Consulta,
        Problema,
        Reclamo
    }

    public enum Categoria {
        Cliente,
        Alquiler,
        Boleta
    }

    public enum Prioridad {
        Bajo,
        Media,
        Alto
    }

    public enum Estado {
        Cancelado,
        Pendiente,
        Cerrado
    }

    public enum Subestado {
        Acogido,
        No_acogido
    }

    @Override
    public String toString() {
        return "Solicitud{" +
                "idSolicitud=" + idSolicitud +
                ", cliente=" + cliente +
                ", codigoSolicitud='" + codigoSolicitud + '\'' +
                ", fechaSolicitud=" + fechaSolicitud +
                ", tipoSolicitud=" + tipoSolicitud +
                ", categoria=" + categoria +
                ", descripcion='" + descripcion + '\'' +
                ", prioridad=" + prioridad +
                ", estado=" + estado +
                ", subestado=" + subestado +
                ", fechaRespuesta=" + fechaRespuesta +
                ", respuesta='" + respuesta + '\'' +
                '}';
    }
}
