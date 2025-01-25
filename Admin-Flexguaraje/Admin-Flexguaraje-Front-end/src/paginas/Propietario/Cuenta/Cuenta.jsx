import React, { useState, useEffect } from "react";
import "./Cuenta.css";
import CuentaBD from "./BASE DE DATOS/CuentaBD"; // Importa CuentaBD para acceder a la API

function GestionCuentas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        dni: "",
        contraseña: "",
        rol: "Seleccionar",
    });
    const [cuentas, setCuentas] = useState([]); // Lista de cuentas cargadas del backend

    // Maneja los cambios en el formulario de cuentas
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para manejar la creación de cuenta (agregar la cuenta)
    const handleCrearCuenta = async () => {
        if (formData.nombreRol === "Seleccionar") {
            alert("Por favor selecciona un rol válido.");
            return;
        }

        try {
            await CuentaBD.crearCuenta(formData);
            setIsModalOpen(false);
            alert("Cuenta creada exitosamente.");
            fetchCuentas(); // Refresca la lista de cuentas
        } catch (error) {
            console.error("Error al crear la cuenta:", error.response?.data || error.message);
            alert(error.response?.data || "Hubo un error al crear la cuenta.");
        }
    };

    // Función para cargar cuentas desde el backend
    const fetchCuentas = async () => {
        try {
            const response = await CuentaBD.listarCuentas();
            if (Array.isArray(response.data)) {
                setCuentas(response.data);
            } else {
                console.error("La respuesta no es un arreglo:", response.data);
                setCuentas([]);
            }
        } catch (error) {
            console.error("Error al obtener las cuentas del backend:", error);
            setCuentas([]);
        }
    };

    // Cargar cuentas al montar el componente
    useEffect(() => {
        fetchCuentas();
    }, []);

    // Cambiar el estado de una cuenta (activar/desactivar)
    const toggleEstado = async (cuenta, index) => {
        try {
            const response = await CuentaBD.actualizarEstadoCuenta(cuenta.usuario.dni);
            alert(response.data); // Mostrar mensaje del backend

            // Actualizar el estado en la lista de cuentas
            setCuentas((prevCuentas) =>
                prevCuentas.map((item, i) =>
                    i === index ? { ...item, estado: item.estado === "Activo" ? "Inactivo" : "Activo" } : item
                )
            );
        } catch (error) {
            console.error("Error al cambiar el estado:", error.response?.data || error.message);
            alert(error.response?.data || "Hubo un error al intentar cambiar el estado de la cuenta.");
        }
    };

    // Función para manejar clic en "Cambiar Contraseña"
    const handleChangePasswordClick = async (cuenta) => {
        const dni = cuenta.usuario?.dni;
        const correo = cuenta.email;

        // Validar el formato del correo
        if (!correo.match(/[A-Za-zÁÉÍÓÚáéíóú]+_\d{8}@FLEXGUARAJE_PERU.COM/)) {
            alert("El correo debe tener el formato: apellidoPaterno_DNI@FLEXGUARAJE_PERU.COM");
            return;
        }

        try {
            const response = await CuentaBD.actualizarPassAuto(dni, correo);
            console.log("Respuesta del backend:", response.data);
            alert(`Contraseña actualizada automáticamente para el usuario: ${cuenta.nombreUsuario}`);
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            alert("Hubo un error al intentar actualizar la contraseña.");
        }
    };

    return (
        <div>
            <div className="cuenta-page">
                <h2>Gestión de Cuentas</h2>
            </div>

            <div className="botones-crear">
                <button className="crear-cuenta-btn" onClick={() => setIsModalOpen(true)}>
                    Crear Cuenta
                </button>
            </div>

            {/* Modal para crear una nueva cuenta */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Crear Nueva Cuenta</h2>
                        <label>
                            Rol:
                            <select name="nombreRol" value={formData.nombreRol} onChange={handleInputChange}>
                                <option value="Seleccionar">Seleccionar</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Propietario">Propietario</option>
                            </select>
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
                            Contraseña:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button className="cancelar-modal-btn" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        <button className="crear-cuenta-modal-btn" onClick={handleCrearCuenta}>Crear Cuenta</button>
                    </div>
                </div>
            )}

            <table className="tabla-cuenta">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Usuario</th>
                        <th>Correo Electrónico</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(cuentas) && cuentas.length > 0 ? (
                        cuentas.map((cuenta, index) => (
                            <tr key={index}>
                                <td>{cuenta.usuario.dni}</td>
                                <td>{cuenta.nombreUsuario}</td>
                                <td>{cuenta.usuario.email}</td>
                                <td>{cuenta.roles ? cuenta.roles.nombreRol : 'Sin rol'}</td>
                                <td>{cuenta.estado}</td>
                                <td>
                                    <div className="acciones">
                                        <button
                                            className="desactivar-btn"
                                            onClick={() => toggleEstado(cuenta, index)}
                                        >
                                            {cuenta.estado === "Activo" ? "Desactivar" : "Activar"}
                                        </button>
                                        <button
                                            className="cambiar-pass-btn"
                                            onClick={() => handleChangePasswordClick(cuenta)}
                                        >
                                            Cambiar Contraseña
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay cuentas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCuentas;
