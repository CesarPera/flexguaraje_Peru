package admin_flexguaraje.back_end.Repositorio;

import admin_flexguaraje.back_end.Modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream

public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
    public Cliente findByDni(String dni);

=======
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
>>>>>>> Stashed changes
}
