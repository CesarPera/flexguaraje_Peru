import React, { useState } from "react";
import "./Cuenta.css";

function GestionCuentas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        dni: "",
        contraseña: "",
        rol: "Seleccionar",
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

    // Crear una nueva cuenta
    const handleCreateAccount = () => {
        if (!formData.dni || !formData.contraseña || formData.rol === "Seleccionar") {
            alert("Por favor, completa todos los campos y selecciona un rol.");
            return;
        }

        // Añade la nueva cuenta a la lista de cuentas
        setCuentas((prevCuentas) => [
            ...prevCuentas,
            { ...formData, estado: "Activo" },
        ]);

        setFormData({
            dni: "",
            contraseña: "",
            rol: "Seleccionar",
        });
        setIsModalOpen(false);
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
                <h2>Crear Cuenta</h2>
            </div>

            <div className="botones-crear">
                {/* Botón para abrir el modal */}
                <button className="crear-cuenta-btn" onClick={() => setIsModalOpen(true)}>Crear Cuenta</button>
            </div>

            {/* Modal para crear una nueva cuenta */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Crear Nueva Cuenta</h2>
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

            {/* Tabla para mostrar las cuentas creadas */}
            <h2>Cuentas Creadas</h2>
            <table className="tabla-cuenta">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cuentas.map((cuenta, index) => (
                        <tr key={index}>
                            <td>{cuenta.dni}</td>
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
                                        onClick={() => alert("Función de cambiar contraseña no implementada")}
                                    >
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
