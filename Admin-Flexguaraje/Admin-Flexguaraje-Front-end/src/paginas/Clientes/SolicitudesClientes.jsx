import React from 'react';
import { useLocation } from 'react-router-dom';
import './SolicitudesClientes.css';

function SolicitudesClientes() {
    const location = useLocation();
    const { busqueda, tipoBusqueda, clientes = [] } = location.state || {};

    console.log("Datos de clientes recibidos:", clientes);

    // Asegúrate de que clientes es un array antes de usar .filter
    if (!Array.isArray(clientes)) {
        return <div>Error: los datos de clientes no son válidos.</div>;
    }

    const solicitudesFiltradas = clientes.filter((cliente) => {
        if (tipoBusqueda === "dni") {
            return cliente.dni && cliente.dni.includes(busqueda);
        } else if (tipoBusqueda === "nombre") {
            const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`.toLowerCase();
            return nombreCompleto.includes(busqueda.toLowerCase());
        }
        return false;
    });

    return (
        <div className="solicitud-page">
            <h2>Lista de Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>DNI</th>
                        <th>Edad</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudesFiltradas.length > 0 ? (
                        solicitudesFiltradas.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{`${cliente.nombre} ${cliente.apellido}`}</td>
                                <td>{cliente.dni}</td>
                                <td>{cliente.edad}</td>
                                <td>{cliente.correo}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.notas}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No se encontraron clientes.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SolicitudesClientes;
