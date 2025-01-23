import React, { useState } from "react";
import "./Cuenta.css";

function GestionCuentas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false); // Modal para crear usuario
    const [formData, setFormData] = useState({
        usuario: "",
        dni: "",
        email: "",
        contraseña: "",
        rol: "Seleccionar",
    });
    const [userData, setUserData] = useState({
        dni: "",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        telefono: "",
    });
    const [cuentas, setCuentas] = useState([]); // Lista de cuentas creadas

    // Maneja los cambios en el formulario de cuentas
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Maneja los cambios en el formulario de usuario
    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Crear una nueva cuenta
    const handleCreateAccount = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.usuario || !formData.dni || !formData.email || !formData.contraseña || formData.rol === "Seleccionar") {
            alert("Por favor, completa todos los campos y selecciona un rol.");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Añade la nueva cuenta a la lista de cuentas
        setCuentas((prevCuentas) => [
            ...prevCuentas,
            { ...formData, estado: "Activo" },
        ]);

        setFormData({
            usuario: "",
            dni: "",
            email: "",
            contraseña: "",
            rol: "Seleccionar",
        });
        setIsModalOpen(false);
    };

    // Crear un nuevo usuario
    const handleCreateUser = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!userData.dni || !userData.nombre || !userData.apellidoPaterno || !userData.apellidoMaterno || !userData.email || !userData.telefono) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!emailRegex.test(userData.email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        alert(`Usuario creado:\n${JSON.stringify(userData, null, 2)}`);
        setUserData({
            dni: "",
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            email: "",
            telefono: "",
        });
        setIsUserModalOpen(false);
    };

    // Cambiar el estado de una cuenta (activar/desactivar)
    const toggleEstado = (index) => {
        setCuentas((prevCuentas) =>
            prevCuentas.map((cuenta, i) =>
                i === index
                    ? { ...cuenta, estado: cuenta.estado === "Activo" ? "Inactivo" : "Activo" }
                    : cuenta
            )
        );
    };

    return (
        <div>
            {/* Componente Cuenta */}
            <div className="cuenta-page">
                <h2>Crear Cuenta y/o Usuario</h2>
            </div>

            <div className="botones-crear">
                {/* Botones para abrir los modales */}
                <button className="crear-cuenta-btn" onClick={() => setIsModalOpen(true)}>Crear Cuenta</button>
                <button className="crear-usuario-btn" onClick={() => setIsUserModalOpen(true)}>Crear Usuario</button>
            </div>

            {/* Modal para crear una nueva cuenta */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Crear Nueva Cuenta</h2>
                        <label>
                            Usuario:
                            <input
                                type="text"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            DNI:
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Correo Electrónico:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Contraseña:
                            <input
                                type="password"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Rol:
                            <select
                                name="rol"
                                value={formData.rol}
                                onChange={handleInputChange}
                            >
                                <option value="Seleccionar">Seleccionar</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Propietario">Propietario</option>
                            </select>
                        </label>
                        <button onClick={handleCreateAccount}>Crear</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* Modal para crear un nuevo usuario */}
            {isUserModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Crear Nuevo Usuario</h2>
                        <label>
                            DNI:
                            <input
                                type="text"
                                name="dni"
                                value={userData.dni}
                                onChange={handleUserInputChange}
                            />
                        </label>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="nombre"
                                value={userData.nombre}
                                onChange={handleUserInputChange}
                            />
                        </label>
                        <label>
                            Apellido Paterno:
                            <input
                                type="text"
                                name="apellidoPaterno"
                                value={userData.apellidoPaterno}
                                onChange={handleUserInputChange}
                            />
                        </label>
                        <label>
                            Apellido Materno:
                            <input
                                type="text"
                                name="apellidoMaterno"
                                value={userData.apellidoMaterno}
                                onChange={handleUserInputChange}
                            />
                        </label>
                        <label>
                            Correo Electrónico:
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleUserInputChange}
                            />
                        </label>
                        <label>
                            Teléfono:
                            <input
                                type="text"
                                name="telefono"
                                value={userData.telefono}
                                onChange={handleUserInputChange}
                            />
                        </label>
                        <button onClick={handleCreateUser}>Crear</button>
                        <button onClick={() => setIsUserModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* Tabla para mostrar las cuentas creadas */}
            <h2>Cuentas Creadas</h2>
            <table className="tabla-cuenta">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>DNI</th>
                        <th>Correo Electrónico</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cuentas.map((cuenta, index) => (
                        <tr key={index}>
                            <td>{cuenta.usuario}</td>
                            <td>{cuenta.dni}</td>
                            <td>{cuenta.email}</td>
                            <td>{cuenta.rol}</td>
                            <td>{cuenta.estado}</td>
                            <td>
                                <div className="acciones">
                                    <button 
                                        className="desactivar-btn" 
                                        onClick={() => toggleEstado(index)}>
                                        {cuenta.estado === "Activo" ? "Desactivar" : "Activar"}
                                    </button>
                                    <button 
                                        className="cambiar-btn" 
                                        onClick={() => alert("Función de cambiar contraseña no implementada")}>
                                        Cambiar Contraseña
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCuentas;
