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
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [selectedCuenta, setSelectedCuenta] = useState(null);

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
        try {
            await CuentaBD.crearCuenta(formData);
            setIsModalOpen(false);
            alert("Cuenta creada exitosamente");
            fetchCuentas();
        } catch (error) {
            console.error("Error al crear la cuenta:", error);
            alert("Hubo un error al crear la cuenta");
        }
    };

    // Cargar cuentas desde el backend al montar el componente
    useEffect(() => {
        const fetchCuentas = async () => {
            try {
                const response = await CuentaBD.listarCuentas();
                console.log(response.data);
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

        fetchCuentas();
    }, []);

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

    // Función para abrir el modal de cambiar contraseña
    const handleChangePasswordClick = (cuenta) => {
        setSelectedCuenta(cuenta); // Guarda la cuenta seleccionada
        setIsChangePasswordModalOpen(true); // Abre el modal para cambiar la contraseña
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
                            <select name="rol" value={formData.rol} onChange={handleInputChange}>
                                <option value="Seleccionar">Seleccionar</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Propietario">Propietario</option>
                            </select>
                        </label>
                        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        <button onClick={handleCrearCuenta}>Crear Cuenta</button>
                    </div>
                </div>
            )}

            {/* Modal para cambiar la contraseña */}
            {isChangePasswordModalOpen && selectedCuenta && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Cambiar Contraseña</h2>
                        <label>
                            Nueva Contraseña:
                            <input type="password" />
                        </label>
                        <button onClick={() => setIsChangePasswordModalOpen(false)}>Cancelar</button>
                        <button onClick={() => { }}>Guardar</button>
                    </div>
                </div>
            )}

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
                    {Array.isArray(cuentas) && cuentas.length > 0 ? (
                        cuentas.map((cuenta, index) => (
                            <tr key={index}>
                                <td>{cuenta.nombreUsuario}</td> {/* Mostrar el nombre de usuario */}
                                <td>{cuenta.usuario.dni}</td>
                                <td>{cuenta.usuario.email}</td> {/* Mostrar correo electrónico */}
                                <td>{cuenta.roles ? cuenta.roles.nombreRol : 'Sin rol'}</td>
                                <td>{cuenta.roles ? cuenta.roles.estado : 'Sin estado'}</td>

                                <td>
                                    <div className="acciones">
                                        <button
                                            className="desactivar-btn"
                                            onClick={() => toggleEstado(index)}
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
