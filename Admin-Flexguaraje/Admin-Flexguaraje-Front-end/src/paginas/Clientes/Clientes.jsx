// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Clientes.css'


function Clientes() {
    const [clientes, setClientes] = useState([
        { id: 1, nombre: "Juan Pérez", email: "juan.perez@example.com", telefono: "555-1234", dni: "12345678" },
        { id: 2, nombre: "Ana Gómez", email: "ana.gomez@example.com", telefono: "555-5678", dni: "23456789" },
        { id: 3, nombre: "Carlos López", email: "carlos.lopez@example.com", telefono: "555-9876", dni: "34567890" }
    ]);

    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: "",
        email: "",
        telefono: "",
        dni: ""
    });

    const [solicitudes, setSolicitudes] = useState([
        { id: 1, clienteId: 1, solicitud: "Cambio de dirección", estado: "pendiente" },
        { id: 2, clienteId: 2, solicitud: "Reembolso", estado: "pendiente" },
        { id: 3, clienteId: 3, solicitud: "Consulta de saldo", estado: "completado" }
    ]);

    const manejarNuevoCliente = () => {
        if (nuevoCliente.nombre.trim() && nuevoCliente.email.trim() && nuevoCliente.telefono.trim() && nuevoCliente.dni.trim()) {
            const nuevoClienteConId = { 
                id: clientes.length + 1, 
                ...nuevoCliente 
            };
            setClientes([...clientes, nuevoClienteConId]);
            setNuevoCliente({ nombre: "", email: "", telefono: "", dni: "" });
        }
    };

    const manejarNuevaSolicitud = (clienteId, nuevaSolicitud) => {
        if (nuevaSolicitud.trim()) {
            const nuevaSolicitudConId = {
                id: solicitudes.length + 1,
                clienteId,
                solicitud: nuevaSolicitud,
                estado: "pendiente"
            };
            setSolicitudes([...solicitudes, nuevaSolicitudConId]);
        }
    };

    const manejarCambioEstado = (solicitudId, nuevoEstado) => {
        setSolicitudes(solicitudes.map(solicitud =>
            solicitud.id === solicitudId
                ? { ...solicitud, estado: nuevoEstado }
                : solicitud
        ));
    };

    return (
        <div className="clientes-page"> {/*NO TOCAR NI MIRAR LA CLASE "clientes-page"*/}
            <h2>Clientes</h2>

            {/* Tabla de Datos de Clientes */}
            <table className="tabla-clientes">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>DNI</th>
                        <th>Solicitudes</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.dni}</td>
                            <td>
                                <ul>
                                    {solicitudes
                                        .filter(solicitud => solicitud.clienteId === cliente.id)
                                        .map(solicitud => (
                                            <li key={solicitud.id}>
                                                {solicitud.solicitud} - 
                                                <span className={`estado-${solicitud.estado}`}>
                                                    {solicitud.estado}
                                                </span>
                                                <select
                                                    value={solicitud.estado}
                                                    onChange={(e) => manejarCambioEstado(solicitud.id, e.target.value)}
                                                >
                                                    <option value="pendiente">Pendiente</option>
                                                    <option value="completado">Completado</option>
                                                </select>
                                            </li>
                                        ))}
                                </ul>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nueva solicitud"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                manejarNuevaSolicitud(cliente.id, e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Sección para Agregar Nuevo Cliente */}
            <div className="seccion-nuevo-cliente">
                <h3>Añadir Nuevo Cliente</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nuevoCliente.nombre}
                        onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={nuevoCliente.email}
                        onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Teléfono"
                        value={nuevoCliente.telefono}
                        onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="DNI"
                        value={nuevoCliente.dni}
                        onChange={(e) => setNuevoCliente({ ...nuevoCliente, dni: e.target.value })}
                    />
                    <button onClick={manejarNuevoCliente}>Añadir Cliente</button>
                </div>
            </div>
        </div>
    );
}
export default Clientes;
