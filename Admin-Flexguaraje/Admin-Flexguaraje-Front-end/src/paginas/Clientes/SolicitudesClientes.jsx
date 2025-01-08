import React from 'react';
import { useLocation } from 'react-router-dom';
import './SolicitudesClientes.css';

function SolicitudesClientes() {
    const location = useLocation();
    const { cliente } = location.state || {};

    if (!cliente) {
        return <div className='solicitud-page'>
            <h2>No se encontraron datos del cliente.</h2>
        </div>;
    }

    return (
        <div className="solicitud-page">
            <div className='informacion-cliente'>
                <h2 className='title-solicitud'>Información del cliente</h2>
                <div className='info-cliente row'>
                    <div className='info-dni'>
                        <h3>DNI</h3>
                        <p>{cliente.dni}</p>
                    </div>
                    <div className='info-nombre-completo'>
                        <h3>Nombre Completo</h3>
                        <p>{`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}</p>
                    </div>
                    <div className='info-telefono'>
                        <h3>Telefono</h3>
                        <p>{cliente.telefono}</p>
                    </div>
                    <div className='info-email'>
                        <h3>Email</h3>
                        <p>{cliente.email}</p>
                    </div>
                    <div className='info-direccion'>
                        <h3>Dirección</h3>
                        <p>{cliente.direccion}</p>
                    </div>
                    <div className='info-notas'>
                        <h3>Notas</h3>
                        <p>{cliente.notaAdicional}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolicitudesClientes;
