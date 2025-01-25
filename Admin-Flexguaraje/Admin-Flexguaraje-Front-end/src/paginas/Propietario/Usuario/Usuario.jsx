import React, { useEffect, useState } from 'react';
import UsuarioBD from './BASE DE DATOS/UsuarioBD';
import './Usuario.css';


function Usuario() {

    const [usuarios, setUsuarios] = useState([]);
    const [dniBuscar, setDniBuscar] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal
    const [nuevoUsuario, setNuevoUsuario] = useState({
        dni: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
        telefono: ''
    });
    const [modalVisibleActualizar, setModalVisibleActualizar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        dni: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
        telefono: ''
    });
    // Abrir y cerrar el modal
    const abrirModal = () => setModalVisible(true);
    const cerrarModal = () => setModalVisible(false);
    const abrirModalActualizar = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModalVisibleActualizar(true);
    };
    const cerrarModalActualizar = () => setModalVisibleActualizar(false);

    useEffect(() => {
        // Llamada al backend para obtener la lista de usuarios
        UsuarioBD.listarUsuarios()
            .then(response => {
                setUsuarios(response.data); // Actualizamos el estado con los usuarios obtenidos
            })
            .catch(error => {
                console.error("Error al listar usuarios:", error);
            });
    }, []);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario({ ...nuevoUsuario, [name]: value });
    };
    const manejarCambioActualizar = (e) => {
        const { name, value } = e.target;
        setUsuarioSeleccionado({ ...usuarioSeleccionado, [name]: value });
    };
    const manejarCambioBuscar = (e) => {
        setDniBuscar(e.target.value);
    };

    // Función para realizar la búsqueda
    const buscarUsuario = () => {
        if (dniBuscar.trim() !== '') {
            // Buscar el usuario por el DNI
            UsuarioBD.buscarUsuarioPorDni(dniBuscar)
                .then(response => {
                    setUsuarios([response.data]); // Mostrar solo el usuario encontrado
                })
                .catch(error => {
                    console.error("Error al buscar usuario:", error);
                    alert("Usuario no encontrado");
                });
        } else {
            // Si el campo está vacío, cargar todos los usuarios
            UsuarioBD.listarUsuarios()
                .then(response => {
                    setUsuarios(response.data); // Mostrar todos los usuarios
                })
                .catch(error => {
                    console.error("Error al listar usuarios:", error);
                });
        }
    };

    // Enviar los datos al backend para crear un usuario
    const CrearUsuario = () => {
        // Aquí puedes llamar a tu backend para guardar el usuario
        UsuarioBD.crearUsuario(nuevoUsuario)
            .then(response => {
                alert("Usuario creado con éxito");
                cerrarModal();
                // Recargar la lista de usuarios después de crear uno
                UsuarioBD.listarUsuarios()
                    .then(res => setUsuarios(res.data))
                    .catch(err => console.error(err));
            })
            .catch(error => {
                console.error("Error al crear usuario:", error);
                alert("Error al crear usuario");
            });
    };

    const actualizarUsuario = () => {
        UsuarioBD.actualizarUsuario(usuarioSeleccionado)
            .then(response => {
                alert("Usuario actualizado con éxito");
                setModalVisibleActualizar(false);
                // Recargar la lista de usuarios después de actualizar uno
                UsuarioBD.listarUsuarios()
                    .then(res => setUsuarios(res.data))
                    .catch(err => console.error(err));
            })
            .catch(error => {
                console.error("Error al actualizar usuario:", error);
                alert("Error al actualizar usuario");
            });
    };

    return (
        <div className="usuario-page">
            <h2 className='titulo-usuario'>Gestion de usuario</h2>

            <div className='acciones-usuario'>
                <div className='acciones-btn-usuario'>
                    <button className='btn btn-success' onClick={abrirModal}>Crear Usuario</button>

                    {/* Modal */}
                    {modalVisible && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Crear Usuario</h3>
                                <form>
                                    <div className="form-group">
                                        <label>DNI</label>
                                        <input type="text" name="dni" value={nuevoUsuario.dni} onChange={manejarCambio} />
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input type="text" name="nombre" value={nuevoUsuario.nombre} onChange={manejarCambio} />
                                    </div>
                                    <div className="form-group">
                                        <label>Apellido Paterno</label>
                                        <input type="text" name="apellidoPaterno" value={nuevoUsuario.apellidoPaterno} onChange={manejarCambio} />
                                    </div>
                                    <div className="form-group">
                                        <label>Apellido Materno</label>
                                        <input type="text" name="apellidoMaterno" value={nuevoUsuario.apellidoMaterno} onChange={manejarCambio} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" value={nuevoUsuario.email} onChange={manejarCambio} />
                                    </div>
                                    <div className="form-group">
                                        <label>Teléfono</label>
                                        <input type="text" name="telefono" value={nuevoUsuario.telefono} onChange={manejarCambio} />
                                    </div>
                                </form>
                                <div className="modal-actions">
                                    <button className='btn btn-success' onClick={CrearUsuario}>Guardar</button>
                                    <button className='btn btn-secondary' onClick={cerrarModal}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="acciones-formulario-buscar">
                    <input
                        type="text"
                        placeholder='Ingresar Dni'
                        value={dniBuscar}
                        onChange={(e) => setDniBuscar(e.target.value)}
                    />
                    <div className='btn-acciones-buscar'>
                        <button className='btn btn-info' onClick={buscarUsuario}>Buscar</button>
                        <button className='btn btn-secondary' onClick={() => {
                            setDniBuscar('');
                            UsuarioBD.listarUsuarios()
                                .then(response => {
                                    setUsuarios(response.data);
                                })
                                .catch(error => {
                                    console.error("Error al listar usuarios:", error);
                                });
                        }}>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            <table className='table table-primary table-hover table-bordered border-primary text-center tabla-usuario'>
                <thead>
                    <tr>
                        <th>Dni</th>
                        <th>Nombres Completo</th>
                        <th>Email Personal</th>
                        <th>Telefono</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.dni}>
                            <td>{usuario.dni}</td>
                            <td>{`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefono}</td>
                            <td>
                                <button className='btn btn-primary btn-actualizar-usuario' onClick={() => abrirModalActualizar(usuario)}>Actualizar</button>

                                {/* Modal Actualizar Usuario */}
                                {modalVisibleActualizar && usuarioSeleccionado.dni === usuario.dni && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <h3>Actualizar Usuario</h3>
                                            <form>
                                                <div className="form-group">
                                                    <label>DNI</label>
                                                    <input
                                                        type="text"
                                                        name="dni"
                                                        value={usuarioSeleccionado.dni}
                                                        disabled // No editable
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Nombre</label>
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={usuarioSeleccionado.nombre}
                                                        onChange={manejarCambioActualizar}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Apellido Paterno</label>
                                                    <input
                                                        type="text"
                                                        name="apellidoPaterno"
                                                        value={usuarioSeleccionado.apellidoPaterno}
                                                        onChange={manejarCambioActualizar}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Apellido Materno</label>
                                                    <input
                                                        type="text"
                                                        name="apellidoMaterno"
                                                        value={usuarioSeleccionado.apellidoMaterno}
                                                        onChange={manejarCambioActualizar}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={usuarioSeleccionado.email}
                                                        onChange={manejarCambioActualizar}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Teléfono</label>
                                                    <input
                                                        type="text"
                                                        name="telefono"
                                                        value={usuarioSeleccionado.telefono}
                                                        onChange={manejarCambioActualizar}
                                                    />
                                                </div>
                                            </form>
                                            <div className="actualizar-btn-usuario">
                                                <button className="btn btn-primary" onClick={actualizarUsuario}>Actualizar</button>
                                                <button className="btn btn-secondary" onClick={cerrarModalActualizar}>Cancelar</button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Usuario;