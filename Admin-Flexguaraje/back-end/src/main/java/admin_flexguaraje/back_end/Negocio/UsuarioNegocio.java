package admin_flexguaraje.back_end.Negocio;

import admin_flexguaraje.back_end.Modelo.Usuario;
import admin_flexguaraje.back_end.Repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class UsuarioNegocio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;


    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    public Optional<Usuario> buscarUsuarioPorDni(String dni) {
        return usuarioRepositorio.findByDni(dni);
    }

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario); // Guardar el usuario en la base de datos
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario); // Guardar cambios en la base de datos
    }
}
