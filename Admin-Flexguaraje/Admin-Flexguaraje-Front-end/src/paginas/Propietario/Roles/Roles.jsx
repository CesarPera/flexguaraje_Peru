import React, { useState, useEffect } from "react";
import RolesBD from "./BASE DE DATOS/RolesBD";
import './Roles.css';


function Roles() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState(null);

    // Función para obtener los roles desde el backend
    const fetchRoles = async () => {
        try {
            const response = await RolesBD.listarRoles();
            setRoles(response.data); // Actualizamos el estado con los datos recibidos
        } catch (error) {
            console.error("Error al obtener los roles:", error);
        }
    };

    useEffect(() => {
        fetchRoles(); // Llamar al backend al cargar el componente
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setRoleName(""); // Limpia el campo del formulario al cerrar
    };

    const handleCreateRole = async () => {
        try {
            if (!roleName.trim()) {
                alert("El nombre del rol no puede estar vacío.");
                return;
            }

            // Llamar al backend para crear el nuevo rol
            await RolesBD.crearRol(roleName);

            // Actualizar la lista de roles después de crear uno nuevo
            fetchRoles();

            alert("Rol creado exitosamente.");
            handleCloseModal(); // Cerrar el modal
        } catch (error) {
            console.error("Error al crear el rol:", error);
            alert("No se pudo crear el rol. Verifica los datos e intenta nuevamente.");
        }
    };

    const handleOpenUpdateModal = (role) => {
        setCurrentRole(role);
        setRoleName(role.nombreRol); // Inicializar el campo con el nombre actual del rol
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setRoleName("");
        setCurrentRole(null);
    };

    const handleUpdateRole = async () => {
        try {
            if (!roleName.trim()) {
                alert("El nombre del rol no puede estar vacío.");
                return;
            }

            // Verificar qué datos se están enviando
            console.log("Datos enviados para actualizar el rol:", {
                idRol: String(currentRole.idRoles), // Convertir idRol a string
                nombreRol: roleName
            });

            // Llamar al backend para actualizar el nombre del rol
            await RolesBD.actualizarNombreRol(String(currentRole.idRoles), roleName); // Pasar roleName sin convertir a mayúsculas

            // Actualizar la lista de roles para reflejar los cambios
            fetchRoles();
            alert("Rol actualizado exitosamente.");
            handleCloseUpdateModal(); // Cerrar el modal
        } catch (error) {
            console.error("Error al actualizar el rol:", error);
            alert("No se pudo actualizar el rol. Verifica los datos e intenta nuevamente.");
        }
    };



    const toggleRoleStatus = async (roleId, currentStatus) => {
        try {
            // Cambiar el estado entre 'Activo' y 'Desactivado'
            const newStatus = currentStatus === "Activo" ? "Desactivado" : "Activo";

            // Convertir el idRol a String
            const idRolString = String(roleId);

            // Llamar al backend para actualizar el estado
            await RolesBD.actualizarEstadoRol(idRolString, newStatus);

            // Actualizar el estado en el frontend
            const updatedRoles = roles.map((role) =>
                role.idRoles === roleId ? { ...role, estado: newStatus } : role
            );
            setRoles(updatedRoles);

            alert(`Estado actualizado a: ${newStatus}`);
        } catch (error) {
            console.error("Error al actualizar el estado del rol:", error);
            alert("No se pudo actualizar el estado del rol. Verifica los datos e intenta nuevamente.");
        }
    };

    const handleDeleteRole = async (idRol) => {
        try {
            const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este rol?");
            if (!confirmDelete) return;

            // Llamar al backend para eliminar el rol
            await RolesBD.eliminarRol(idRol);

            // Actualizar la lista de roles después de eliminar el rol
            fetchRoles();

            alert("Rol eliminado exitosamente.");
        } catch (error) {
            console.error("Error al eliminar el rol:", error);
            alert("No se pudo eliminar el rol. Verifica los datos e intenta nuevamente.");
        }
    };

    return (
        <div className="roles-page">
            <h2 className="titulo-roles">Gestion de Roles</h2>

            <div className="button-acciones-roles">
                <button className="btn btn-success" onClick={handleOpenModal}>Crear Permisos</button>

                {/* Modal personalizado */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Crear Nuevo Rol</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="roleName">Nombre del Rol</label>
                                        <input
                                            type="text"
                                            id="roleName"
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                            placeholder="Ingrese el nombre del rol"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleCreateRole}>
                                    Crear
                                </button>
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>

            <table className="table table-primary table-hover table-bordered border-primary text-center tabla-roles">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.idRoles}>
                            <th>{role.idRoles}</th>
                            <td>{role.nombreRol}</td>
                            <td className="table-acciones-roles">
                                <button
                                    className={`btn ${role.estado === "Activo" ? "btn-warning" : "btn-warning"}`}
                                    onClick={() => toggleRoleStatus(role.idRoles, role.estado)}>
                                    {role.estado || "Activo"}
                                </button>
                            </td>
                            <td className="table-acciones-roles">
                                <button className="btn btn-primary" onClick={() => handleOpenUpdateModal(role)}
                                >Actualizar</button>

                                {/* Modal para actualizar roles */}
                                {isUpdateModalOpen && (
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5>Actualizar Rol</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="roleName">Nombre del Rol</label>
                                                        <input
                                                            type="text"
                                                            id="roleName"
                                                            value={roleName}
                                                            onChange={(e) => setRoleName(e.target.value)}
                                                            placeholder="Ingrese el nuevo nombre del rol"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-primary" onClick={handleUpdateRole}>
                                                    Guardar
                                                </button>
                                                <button className="btn btn-secondary" onClick={handleCloseUpdateModal}>
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button className="btn btn-danger" onClick={() => handleDeleteRole(role.idRoles)}
                                >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Roles;