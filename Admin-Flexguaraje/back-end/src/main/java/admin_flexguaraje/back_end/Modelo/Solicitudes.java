package admin_flexguaraje.back_end.Modelo;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "solicitudes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "codigo_solicitud")})
public class Solicitudes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitudes")
    private Long idSolicitud;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_cliente", nullable = false,
            foreignKey = @ForeignKey(name = "FK_solicitud_cliente"))
    private Cliente cliente;

    @Column(name = "codigo_solicitud", nullable = false, length = 15)
    private String CodigoSolicitud; // AUTOMATICO

    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDate FechaSolicitud; // AUTOMATICO

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_solicitud", nullable = false, length = 15)
    private tipoSolicitud TipoSolicitud;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false, length = 15)
    private Categoria Categoria;

    @Column(name = "descripcion", nullable = false, length = 255)
    private String Descripcion;

    @Enumerated(EnumType.STRING)
    @Column(name = "prioridad", nullable = false, length = 15)
    private Prioridad Prioridad;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 15)
    private Estado Estado;

    @Enumerated(EnumType.STRING)
    @Column(name = "subestado", length = 15)
    private Subestado Subestado;

    @Column(name = "fecha_respuesta")
    private LocalDate FechaRespuesta; // AUTOMATICO

    @Column(name = "respuestas", length = 255)
    private String Respuesta;

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

    public LocalDate getFechaSolicitud() {
        return FechaSolicitud;
    }

    public void setFechaSolicitud(LocalDate fechaSolicitud) {
        FechaSolicitud = fechaSolicitud;
    }

    public String getCodigoSolicitud() {
        return CodigoSolicitud;
    }

    public void setCodigoSolicitud(String codigoSolicitud) {
        CodigoSolicitud = codigoSolicitud;
    }

    public tipoSolicitud getTipoSolicitud() {
        return TipoSolicitud;
    }

    public void setTipoSolicitud(tipoSolicitud tipoSolicitud) {
        TipoSolicitud = tipoSolicitud;
    }

    public Categoria getCategoria() {
        return Categoria;
    }

    public void setCategoria(Categoria categoria) {
        Categoria = categoria;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public void setDescripcion(String descripcion) {
        Descripcion = descripcion;
    }

    public Prioridad getPrioridad() {
        return Prioridad;
    }

    public void setPrioridad(Prioridad prioridad) {
        Prioridad = prioridad;
    }

    public Estado getEstado() {
        return Estado;
    }

    public void setEstado(Estado estado) {
        Estado = estado;
    }

    public Subestado getSubestado() {
        return Subestado;
    }

    public void setSubestado(Subestado subestado) {
        Subestado = subestado;
    }

    public LocalDate getFechaRespuesta() {
        return FechaRespuesta;
    }

    public void setFechaRespuesta(LocalDate fechaRespuesta) {
        FechaRespuesta = fechaRespuesta;
    }

    public String getRespuesta() {
        return Respuesta;
    }

    public void setRespuesta(String respuesta) {
        Respuesta = respuesta;
    }

    public enum tipoSolicitud {
        Consulta,
        Problema,
        Reclamo
    }

    public enum Categoria {
        Cliente,
        Espacio,
        Alquiler,
        Boleta
    }

    public enum Prioridad {
        Bajo,
        Mediano,
        Alta
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

}
