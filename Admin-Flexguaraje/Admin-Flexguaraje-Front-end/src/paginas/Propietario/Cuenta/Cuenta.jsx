import { useState, useEffect } from "react";
import "./Cuenta.css";
import CuentaBD from "./BASE DE DATOS/CuentaBD";
import Swal from 'sweetalert2';
import { Eye, EyeOff } from 'lucide-react'; // Íconos para mostrar/ocultar contraseña

function GestionCuentas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rolesActivos, setRolesActivos] = useState([]); // Nuevo estado para roles activos
    const [cuentas, setCuentas] = useState([]); // Lista de cuentas cargadas del backend
    const [formData, setFormData] = useState({
        dni: "",
        contraseña: "",
        rol: "Seleccionar"
    });
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        oldPassword: false,
        newPassword: false,
        repeatPassword: false,
    });
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

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
            Swal.fire({
                icon: "error",
                title: "Error al cargar cuentas",
                text: "Hubo un problema al obtener la lista de cuentas.",
            });
            setCuentas([]);
        }
    };

    const fetchRolesActivos = async () => {
        try {
            const response = await CuentaBD.obtenerRolesActivos();
            setRolesActivos(response.data); // Guardar los roles activos
        } catch (error) {
            console.error("Error al obtener los roles activos:", error);
            Swal.fire({
                icon: "error",
                title: "Error al cargar roles activos",
                text: "No se pudieron cargar los roles activos desde el servidor.",
            });
        }
    };

    useEffect(() => {
        fetchCuentas();
        fetchRolesActivos(); // Cargar roles activos al montar el componente
    }, []);

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
        const { dni, password, nombreRol } = formData;

        if (!dni && !password && (!nombreRol || nombreRol === "Seleccionar")) {
            Swal.fire({
                icon: "error",
                title: "Formulario vacío",
                text: "Por favor, completa todos los campos antes de enviar el formulario.", showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        const errores = [];

        if (!nombreRol || nombreRol === "Seleccionar") {
            errores.push("Tienes que seleccionar un Rol para la cuenta.");
        }
        if (!dni) {
            errores.push("El campo DNI no puede ir vacío.");
        } else if (!/^\d{8}$/.test(dni)) {
            errores.push("El DNI debe contener exactamente 8 caracteres numéricos.");
        }

        const passwordRegex = /^(?=.*[A-ZÁÉÍÓÚáéíóúñÑ]{3,})(?=.*[0-9]{3,})(?=.*[!@#$%^&*()_\-+=]{2,})(?=.*[a-z]).{10,}$/;
        if (!password) {
            errores.push("El campo contraseña no puede ir vacío.");
        } else if (!passwordRegex.test(password)) {
            errores.push(
                "La contraseña debe tener al menos 10 caracteres, incluyendo 3 mayúsculas, 3 números, 2 caracteres especiales y minúsculas."
            );
        }

        if (errores.length > 0) {
            Swal.fire({
                icon: "error",
                title: "Errores en el formulario",
                html: errores.join("<br>"),
            });
            return;
        }

        try {
            await CuentaBD.crearCuenta(formData);
            setIsModalOpen(false);
            Swal.fire({
                icon: "success",
                title: "Cuenta creada",
                text: "La cuenta ha sido creada exitosamente.",
                showConfirmButton: false,
                timer: 3000
            });
            fetchCuentas();
        } catch (error) {
            console.error("Error al crear la cuenta:", error.response?.data || error.message);
            Swal.fire({
                icon: "error",
                title: "Error al crear cuenta",
                text: error.response?.data || "Hubo un error al crear la cuenta.",
            });
        }
    };

    const toggleEstado = async (cuenta, index) => {
        const dni = cuenta.usuario.dni; // Usamos el DNI del usuario

        // Mostrar alerta de confirmación con SweetAlert2
        const result = await Swal.fire({
            title: `¿Estás seguro de ${cuenta.estado === "Activo" ? "desactivar" : "activar"} la cuenta?`,
            text: `La cuenta de ${cuenta.nombreUsuario} será ${cuenta.estado === "Activo" ? "desactivada" : "activada"}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        });

        // Si el usuario confirma la acción
        if (result.isConfirmed) {
            try {
                // Realiza la solicitud para actualizar el estado de la cuenta
                const response = await CuentaBD.actualizarEstadoCuenta(dni);
                Swal.fire({
                    icon: "success",
                    title: "Estado actualizado",
                    text: response.data, // Mostrar mensaje del backend
                    showConfirmButton: false,
                    timer: 3000
                });

                // Cambiar el estado en la interfaz
                setCuentas((prevCuentas) =>
                    prevCuentas.map((item, i) =>
                        i === index
                            ? { ...item, estado: item.estado === "Activo" ? "Desactivado" : "Activo" } // Alternar entre "Activo" y "Desactivado"
                            : item
                    )
                );
            } catch (error) {
                console.error("Error al cambiar el estado:", error.response?.data || error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error al cambiar estado",
                    text: error.response?.data || "Hubo un error al intentar cambiar el estado de la cuenta.",
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Cambio cancelado",
                text: "No se realizaron cambios en el estado del permiso.",
                showConfirmButton: false,
                timer: 3000
            });
        }
    };

    const handleChangePasswordClick = async (cuenta) => {
        const dni = cuenta.usuario?.dni;
        const correo = cuenta.email;

        // Validar si la cuenta está activa
        if (cuenta.estado !== "Activo") {
            Swal.fire({
                icon: "warning",
                title: "Cuenta desactivada",
                text: "No se puede cambiar la contraseña porque la cuenta está desactivada.",
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        // Confirmación antes de proceder
        const confirmacion = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Se actualizará automáticamente la contraseña de esta cuenta.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false, // Evita clics fuera del modal
            allowEscapeKey: false, // Evita cerrar el modal con la tecla Esc
        });

        if (!confirmacion.isConfirmed) {
            Swal.fire({
                icon: "info",
                title: "Operación cancelada",
                text: "No se ha realizado ningún cambio.",
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        // Mostrar loader mientras se procesa la solicitud
        Swal.fire({
            title: "Procesando...",
            text: "Por favor espera mientras se actualiza la contraseña.",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            // Actualizar la contraseña automáticamente
            const response = await CuentaBD.actualizarPassAuto(dni, correo);
            Swal.close();
            Swal.fire({
                icon: "success",
                title: "Contraseña actualizada",
                text: `Contraseña actualizada automáticamente para el usuario: ${cuenta.nombreUsuario}`,
                showConfirmButton: false,
                timer: 3000
            });
            await fetchCuentas();
            await fetchRolesActivos();
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            Swal.fire({
                icon: "error",
                title: "Error al cambiar contraseña",
                text: "Hubo un error al intentar actualizar la contraseña.",
            });
        }
    };

    return (
        <div className="cuenta-page">
            <div className="titulo-cuenta">
                <h2>Gestión de Cuentas</h2>
            </div>

            <div className="botones-crear">
                <button className="crear-cuenta-btn btn btn-success" onClick={() => setIsModalOpen(true)}>
                    Crear Cuenta
                </button>
            </div>

            {/* Modal para crear una nueva cuenta */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>CREAR NUEVA CUENTA</h3>
                        <div>
                            <label>Rol:</label>
                            <select name="nombreRol" value={formData.nombreRol} onChange={handleInputChange}>
                                <option value="" className="text-center">Seleccionar</option>
                                {rolesActivos.map((rol, index) => (
                                    <option className="text-center" key={index} value={rol.nombreRol}>
                                        {rol.nombreRol}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>DNI:</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="contraseña-visible-cuenta">
                            <label>Contraseña:</label>
                            <input
                                type={passwordVisibility.password ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <span
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('password')}
                            >
                                {passwordVisibility.password ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>

                        <div className="modal-footer-cuenta">
                            <button className="btn btn-success" onClick={handleCrearCuenta}>Crear</button>
                            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <table className="table table-primary table-hover table-bordered border-primary text-center tabla-cuenta">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Rol</th>
                        <th>Usuario</th>
                        <th>Correo Electrónico</th>
                        <th>Contraseña</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(cuentas) && cuentas.length > 0 ? (
                        cuentas.map((cuenta, index) => (
                            <tr key={index}>
                                <td>{cuenta.usuario.dni}</td>
                                <td>{cuenta.roles ? cuenta.roles.nombreRol : 'Sin rol'}</td>
                                <td>{cuenta.nombreUsuario}</td>
                                <td>{cuenta.email}</td>
                                <td>{cuenta.password} </td>
                                <td className="tabla-cuenta-estado">
                                    <button
                                        className={`btn ${cuenta.estado === "Activo" ? "btn-light" : "btn-dark"}`} // Condición para aplicar la clase correcta
                                        onClick={() => toggleEstado(cuenta, index)} // Cambiar estado real
                                    >
                                        {cuenta.estado} {/* Muestra el estado real */}
                                    </button>
                                </td>
                                <td>
                                    <div className="acciones">

                                        <button
                                            className="cambiar-pass-btn btn btn-primary"
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
                            <td colSpan="7">No hay cuentas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    );
}

export default GestionCuentas;
