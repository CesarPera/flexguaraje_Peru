import React from 'react';
import { useLocation } from 'react-router-dom';
import './SolicitudesClientes.css';

function SolicitudesClientes() {
    const location = useLocation();
    const { cliente } = location.state || {};

    if (!cliente) {
        return <div>No se encontraron datos del cliente.</div>;
    }

    return (
        <div className="solicitud-page">
            <h2>Detalles del Cliente</h2>
            <table>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{cliente.dni}</td>
                        <td>{`${cliente.nombre} ${cliente.apellido}`}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.nota}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SolicitudesClientes;
