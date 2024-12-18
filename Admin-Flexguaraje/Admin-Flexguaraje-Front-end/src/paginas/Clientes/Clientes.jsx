// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Clientes.css';
import { useNavigate } from "react-router-dom"; // Usar react-router para redirección.
function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        edad: "",
        correo: "",
        telefono: "",
        direccion: "",
        notas: "",
    });

    const [busqueda, setBusqueda] = useState("");
    const [tipoBusqueda, setTipoBusqueda] = useState("dni");
    const navigate = useNavigate();

    // eslint-disable-next-line no-undef
    useEffect(() => {
        const fetchClientes = async () => {
            const data = await listarClientes();
            setClientes(data);
        };
        fetchClientes();
    }, []);   //recien

    const manejarCambio = (e, campo) => {
        setNuevoCliente({ ...nuevoCliente, [campo]: e.target.value });
    };

    const manejarBusquedaCambio = (e) => {
        setBusqueda(e.target.value);
    };

    const manejarNuevoCliente = async () => {
        const { nombre, apellido, dni, fechaNacimiento, edad, correo, telefono, direccion } = nuevoCliente;

        if (!nombre || !apellido || !dni || !fechaNacimiento || !edad || !correo || !telefono || !direccion) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        if (isNaN(dni) || isNaN(edad)) {
            alert("El DNI y la edad deben ser valores numéricos.");
            return;
        }

    const response = await agregarCliente(nuevoCliente);
        setClientes([...clientes, response]);    //recien

        const nuevoClienteConId = {
            id: clientes.length + 1,
            ...nuevoCliente,
        };

        setClientes([...clientes, nuevoClienteConId]);
        setNuevoCliente({
            nombre: "",
            apellido: "",
            dni: "",
            fechaNacimiento: "",
            edad: "",
            correo: "",
            telefono: "",
            direccion: "",
            notas: "", // Reiniciar el campo de notas extras
        });
        setMostrarFormulario(false);
    };

    const buscarCliente = () => {
        if (!busqueda) {
            alert("Por favor ingrese un valor de búsqueda.");
            return;
        }

        navigate("/solicitudesclientes", {
            state: { busqueda, tipoBusqueda, clientes },
        });
    };

    return (
        <div className="clientes-page"> {/*NO TOCAR NI MIRAR LA CLASE "clientes-page"*/}
            <h2>Clientes</h2>

            {/* Tabla de Datos de Clientes */}
            <div className="formulario-busqueda">
                <select
                    value={tipoBusqueda}
                    onChange={(e) => setTipoBusqueda(e.target.value)}
                >
                    <option value="dni">Buscar por DNI</option>
                    <option value="nombre">Buscar por Nombre Completo</option>
                </select>
                <input
                    type="text"
                    placeholder={`Buscar por ${tipoBusqueda === "dni" ? "DNI" : "Nombre Completo"}`}
                    value={busqueda}
                    onChange={manejarBusquedaCambio}
                />
                <button className="boton-buscar" onClick={buscarCliente}>
                    Buscar
                </button>
            </div>

            {/* Botón para añadir cliente */}
            <button
                className="boton-abrir-formulario"
                onClick={() => setMostrarFormulario(true)}
            >
                Añadir Cliente
            </button>

            {/* Formulario flotante */}
            {mostrarFormulario && (
                <div className="formulario-flotante">
                    <div className="formulario-contenido">
                        <h3 className="text-center">Añadir Nuevo Cliente:</h3>
                        <div className="formulario-campos">
                            <label>Nombres:</label>
                            <input
                                type="text"
                                value={nuevoCliente.nombre}
                                onChange={(e) => manejarCambio(e, "nombre")}
                            />
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                value={nuevoCliente.apellido}
                                onChange={(e) => manejarCambio(e, "apellido")}
                            />
                            <label>DNI:</label>
                            <input
                                type="text"
                                value={nuevoCliente.dni}
                                onChange={(e) => manejarCambio(e, "dni")}
                            />
                            <label>Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                value={nuevoCliente.fechaNacimiento}
                                onChange={(e) => manejarCambio(e, "fechaNacimiento")}
                            />
                            <label>Edad:</label>
                            <input
                                type="number"
                                value={nuevoCliente.edad}
                                onChange={(e) => manejarCambio(e, "edad")}
                            />
                            <label>Correo Electrónico:</label>
                            <input
                                type="email"
                                value={nuevoCliente.correo}
                                onChange={(e) => manejarCambio(e, "correo")}
                            />
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                value={nuevoCliente.telefono}
                                onChange={(e) => manejarCambio(e, "telefono")}
                            />
                            <label>Dirección:</label>
                            <input
                                type="text"
                                value={nuevoCliente.direccion}
                                onChange={(e) => manejarCambio(e, "direccion")}
                            />
                            {/* Campo nuevo para Notas Extras */}
                            <label>Notas Extras:</label>
                            <textarea
                                value={nuevoCliente.notas}
                                onChange={(e) => manejarCambio(e, "notas")}
                                placeholder="Agregar notas adicionales sobre el cliente (opcional)."
                                rows="3"
                            />
                        </div>

                        <div className="formulario-botones">
                            <button className="annadir" onClick={manejarNuevoCliente}>
                                Añadir
                            </button>
                            <button className="cancelar" onClick={() => setMostrarFormulario(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default Clientes;
