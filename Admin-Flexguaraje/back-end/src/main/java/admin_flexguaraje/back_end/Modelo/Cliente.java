package admin_flexguaraje.back_end.Modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "cliente",
        uniqueConstraints = @UniqueConstraint(columnNames = "dni"))
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long idCliente;

    @Column(name = "dni", nullable = false, unique = true, length = 15)
    private String dni;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 100)
    private String apellido;

    @Column(name = "telefono", nullable = false, length = 15)
    private String telefono;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "nota", length = 255)
    private String nota = "Sin Discapacidad";

    // Relación uno a muchos con la entidad Alquileres
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Alquileres> alquileres;

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNota() {
        return nota;
    }

    public void setNota(String nota) {
        this.nota = nota;
    }

    public List<Alquileres> getAlquileres() {
        return alquileres;
    }

    public void setAlquileres(List<Alquileres> alquileres) {
        this.alquileres = alquileres;
    }

    // Validación personalizada
    @PrePersist
    @PreUpdate
    private void validarDatos() {
        if (!dni.matches("\\d{8}")) {
            throw new IllegalArgumentException("El DNI debe contener exactamente 8 dígitos.");
        }
        if (!telefono.matches("\\d{9}")) {
            throw new IllegalArgumentException("El teléfono debe contener exactamente 9 dígitos.");
        }
    }
}
