// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Clientes.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Usar react-router para redirección.

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({
        tipo: "Empresa",
        nombre: "",
        apellido: "",
        edad: "",
        correo: "",
        fechaInicio: "",
        dni: "",
        ruc: "",
        nombreEmpresa: "",
        direccion: "",
        provincia: "",
        telefono: "",
        fechaNacimiento: "",
    });

    const [busqueda, setBusqueda] = useState("");
    const [tipoBusqueda, setTipoBusqueda] = useState("dni");
    const navigate = useNavigate();

    const manejarNuevoCliente = () => {
        // Validar campos dependiendo del tipo de cliente
        if (nuevoCliente.tipo === "Persona") {
            // Validar los campos obligatorios para Persona
            if (
                nuevoCliente.nombre.trim() &&
                nuevoCliente.apellido.trim() &&
                nuevoCliente.dni.trim() &&
                nuevoCliente.edad.trim() &&
                nuevoCliente.fechaNacimiento.trim() &&
                nuevoCliente.correo.trim() &&
                nuevoCliente.telefono.trim() &&
                nuevoCliente.provincia.trim() &&
                nuevoCliente.fechaInicio.trim()
            ) {
                const nuevoClienteConId = {
                    id: clientes.length + 1,
                    ...nuevoCliente,
                };
                setClientes([...clientes, nuevoClienteConId]);
                setNuevoCliente({
                    tipo: "Empresa",
                    nombre: "",
                    apellido: "",
                    edad: "",
                    correo: "",
                    fechaInicio: "",
                    dni: "",
                    ruc: "",
                    nombreEmpresa: "",
                    direccion: "",
                    provincia: "",
                    telefono: "",
                    fechaNacimiento: "",
                });
                setMostrarFormulario(false);
            } else {
                alert("Por favor, completa todos los campos de la Persona.");
            }
        } else if (nuevoCliente.tipo === "Empresa") {
            // Validar los campos obligatorios para Empresa
            if (
                nuevoCliente.nombreEmpresa.trim() &&
                nuevoCliente.ruc.trim() &&
                nuevoCliente.direccion.trim() &&
                nuevoCliente.correo.trim() &&
                nuevoCliente.telefono.trim() &&
                nuevoCliente.provincia.trim() &&
                nuevoCliente.fechaInicio.trim()
            ) {
                const nuevoClienteConId = {
                    id: clientes.length + 1,
                    ...nuevoCliente,
                };
                setClientes([...clientes, nuevoClienteConId]);
                setNuevoCliente({
                    tipo: "Empresa",
                    nombre: "",
                    apellido: "",
                    edad: "",
                    correo: "",
                    fechaInicio: "",
                    dni: "",
                    ruc: "",
                    nombreEmpresa: "",
                    direccion: "",
                    provincia: "",
                    telefono: "",
                    fechaNacimiento: "",
                });
                setMostrarFormulario(false);
            } else {
                alert("Por favor, completa todos los campos de la Empresa.");
            }
        }
    };

    const buscarCliente = () => {
        if (!busqueda) {
            alert("Por favor ingrese un valor de búsqueda.");
            return;
        }
        navigate("/solicitudesclientes", {
            state: { busqueda, tipoBusqueda },
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
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="boton-buscar" onClick={buscarCliente}>
                    <Link to="/clientes/solicitudes">
                        <span className="full-label animate">Buscar</span>
                    </Link>
                </button>
            </div>

            <button
                className="boton-abrir-formulario"
                onClick={() => setMostrarFormulario(true)}
            >
                Añadir Cliente
            </button>

            {mostrarFormulario && (
                <div className="formulario-flotante">
                    <div className="formulario-contenido">
                        <h3 className='text-center'>Añadir Nuevo Cliente:</h3>
                        <div className="formulario-campos"> {/* Contenedor con desplazamiento vertical */}
                            <label>Nombres:</label>
                            <input
                                type="text"
                                value={nuevoCliente.nombre}
                                onChange={(e) =>
                                    setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
                                }
                            />
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                value={nuevoCliente.apellido}
                                onChange={(e) =>
                                    setNuevoCliente({
                                        ...nuevoCliente,
                                        apellido: e.target.value,
                                    })
                                }
                            />
                            <label>Dni:</label>
                            <input
                                type="text"
                                value={nuevoCliente.dni}
                                onChange={(e) =>
                                    setNuevoCliente({ ...nuevoCliente, dni: e.target.value })
                                }
                            />
                            <label>Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                value={nuevoCliente.fechaNacimiento}
                                onChange={(e) =>
                                    setNuevoCliente({ ...nuevoCliente, fechaNacimiento: e.target.value })
                                }
                            />
                            <label>Edad:</label>
                            <input
                                type="number"
                                value={nuevoCliente.edad}
                                onChange={(e) =>
                                    setNuevoCliente({ ...nuevoCliente, edad: e.target.value })
                                }
                            />
                            <label>Correo Electronico:</label>
                            <input
                                type="email"
                                value={nuevoCliente.correo}
                                onChange={(e) =>
                                    setNuevoCliente({ ...nuevoCliente, correo: e.target.value })
                                }
                            />
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                value={nuevoCliente.telefono}
                                onChange={(e) =>
                                    setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })
                                }
                            />
                            <label>Dirección:</label>
                            <input
                                type="text"
                                value={nuevoCliente.provincia}
                                onChange={(e) =>
                                    setNuevoCliente({ ...nuevoCliente, provincia: e.target.value })
                                }
                            />
                        </div>

                        <div className="formulario-botones">
                            <button className='annadir' onClick={manejarNuevoCliente}>Añadir</button>
                            <button className='cancelar' onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Clientes;
