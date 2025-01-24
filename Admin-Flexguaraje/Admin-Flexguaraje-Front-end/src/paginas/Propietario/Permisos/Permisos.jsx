import React, { useState, useEffect } from "react";
import PermisosBD from "./BASE DE DATOS/PermisosBD";
import './Permisos.css';


function Permisos() {
    const [permisos, setPermisos] = useState([]); // Estado para guardar la lista de permisos
    const [roles, setRoles] = useState([]); // Estado para guardar los roles
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [showModalActualizar, setShowModalActualizar] = useState(false); // Estado para controlar el modal de actualización
    const [nombrePermiso, setNombrePermiso] = useState(""); // Estado para el nombre del permiso
    const [selectedRole, setSelectedRole] = useState(""); // Estado para el rol seleccionado
    const [permisoSeleccionado, setPermisoSeleccionado] = useState(null); // Estado para el permiso a actualizar

    // Función para obtener los permisos desde el backend
    const fetchPermisos = async () => {
        try {
            const response = await PermisosBD.listarPermisos();
            setPermisos(response.data); // Actualizamos el estado con los permisos obtenidos
        } catch (error) {
            console.error("Error al obtener los permisos:", error);
        }
    };

    // Función para obtener los roles activos desde el backend
    const fetchRolesActivos = async () => {
        try {
            const response = await PermisosBD.listarRolesActivos();
            setRoles(response.data); // Guardamos los roles activos en el estado
        } catch (error) {
            console.error("Error al obtener los roles activos:", error);
        }
    };

    // Llamadas a las funciones cuando se carga el componente
    useEffect(() => {
        fetchPermisos(); // Llamar al backend para obtener permisos al cargar el componente
        fetchRolesActivos(); // Llamar al backend para obtener roles activos
    }, []);

    // Función para manejar la creación del permiso
    const handleCrearPermiso = async () => {
        if (!nombrePermiso || !selectedRole) {
            alert("Por favor complete todos los campos.");
            return;
        }

        const nuevoPermiso = {
            nombreRol: selectedRole,  // Asumiendo que el backend espera 'nombreRol'
            nombrePermiso: nombrePermiso
        };

        try {
            await PermisosBD.crearPermiso(nuevoPermiso); // Llamamos al método de creación del permiso
            alert("Permiso creado con éxito.");
            setShowModal(false); // Cerramos el modal después de la creación
            fetchPermisos(); // Refrescamos la lista de permisos
        } catch (error) {
            console.error("Error al crear el permiso:", error);
            alert("Error al crear el permiso.");
        }
    };

    // Función para manejar la actualización del permiso
    const handleActualizarPermiso = async () => {
        if (!nombrePermiso) {
            alert("Por favor, ingrese un nuevo nombre de permiso.");
            return;
        }

        // Convertir el idPermiso a String antes de enviarlo
        const permisoData = {
            idPermiso: String(permisoSeleccionado.idPermiso),  // Aseguramos que el ID sea un String
            nuevoNombre: nombrePermiso                // Nuevo nombre del permiso
        };

        try {
            const response = await PermisosBD.actualizarNombrePermiso(permisoData);
            alert(response.data);  // Mensaje de éxito
            setShowModalActualizar(false); // Cerrar el modal
            fetchPermisos();  // Actualizar la lista de permisos
        } catch (error) {
            console.error("Error al actualizar el permiso:", error);
            alert("Error al actualizar el permiso.");
        }
    };

    // Función para actualizar el estado del permiso
    const handleActualizarEstado = async (idPermiso) => {
        try {
            await PermisosBD.actualizarEstadoPermiso(idPermiso); // Llamamos al método para actualizar el estado
            fetchPermisos(); // Refrescamos la lista de permisos
        } catch (error) {
            console.error("Error al actualizar el estado del permiso:", error);
            alert("Error al actualizar el estado.");
        }
    };

    // Función para eliminar un permiso
    const handleEliminarPermiso = async (idPermiso) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el permiso con ID ${idPermiso}?`)) {
            try {
                await PermisosBD.eliminarPermiso(idPermiso);  // Llamamos al método de eliminación del permiso
                alert("Permiso eliminado con éxito.");
                fetchPermisos(); // Refrescamos la lista de permisos
            } catch (error) {
                console.error("Error al eliminar el permiso:", error);
                alert("Error al eliminar el permiso.");
            }
        }
    };

    return (
        <div className="permisos-page">
            <h2 className="titulo-permisos">Gestion de permisos</h2>

            <div className="button-acciones-permisos">
                <button className="btn btn-success" onClick={() => setShowModal(true)}>Crear Permisos</button>

                {/* Modal para Crear Permiso */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Permiso</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="role">Seleccionar Rol</label>
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map((role) => (
                                            <option key={role.idRoles} value={role.nombreRol}>
                                                {role.nombreRol}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="permiso">Nombre Permiso</label>
                                    <input
                                        type="text"
                                        id="permiso"
                                        className="form-control"
                                        value={nombrePermiso}
                                        onChange={(e) => setNombrePermiso(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleCrearPermiso}>
                                    Crear Permiso
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <table className="table table-primary table-hover table-bordered border-primary text-center tabla-permisos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Roles</th>
                        <th>Nombre Permisos</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {permisos.map((permiso) => (
                        <tr key={permiso.idPermiso}>
                            <td>{permiso.idPermiso}</td>
                            <td>{permiso.roles?.nombreRol}</td>
                            <td>{permiso.nombrePermiso}</td>
                            <td>
                                <button
                                    className={`btn ${permiso.estado === "Activo" ? "btn-warning" : "btn-danger"}`}
                                    onClick={() => handleActualizarEstado(permiso.idPermiso)}>
                                    {permiso.estado}
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => {
                                    setPermisoSeleccionado(permiso);
                                    setNombrePermiso(permiso.nombrePermiso);
                                    setShowModalActualizar(true); // Abre el modal de actualización
                                }}>Actualizar</button>

                                {/* Modal para Actualizar Permiso */}
                                {showModalActualizar && permisoSeleccionado && (
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Actualizar Permiso</h5>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label htmlFor="nombrePermiso">Nuevo Nombre Permiso</label>
                                                    <input
                                                        type="text"
                                                        id="nombrePermiso"
                                                        className="form-control"
                                                        value={nombrePermiso}
                                                        onChange={(e) => setNombrePermiso(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={handleActualizarPermiso}>
                                                    Actualizar Permiso
                                                </button>
                                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalActualizar(false)}>
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleEliminarPermiso(permiso.idPermiso)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Permisos;