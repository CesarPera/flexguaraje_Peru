// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SolicitudesClientes.css'



function SolicitudesClientes() {
    const location = useLocation();
  const { busqueda, tipoBusqueda } = location.state || {};

  // Datos de ejemplo de solicitudes de clientes
  const solicitudes = [
    { id: 1, cliente: "Juan Pérez", dni: "12345678", estado: "Pendiente" },
    { id: 2, cliente: "Ana Gómez", dni: "87654321", estado: "Completado" },
    { id: 3, cliente: "Luis Martínez", dni: "11223344", estado: "Pendiente" },
  ];

  // Filtrar las solicitudes según la búsqueda
  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    if (tipoBusqueda === "dni") {
      return solicitud.dni.includes(busqueda);
    } else if (tipoBusqueda === "nombre") {
      return solicitud.cliente.toLowerCase().includes(busqueda.toLowerCase());
    }
    return false;
  });

    
    return (
        
            <div className='solicitud-page'> {/*NO TOCAR NI MIRAR LA CLASE "solicitud-page"*/}
                <h2>VISTA PREVIA</h2>
                <table>
                <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>DNI</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {solicitudesFiltradas.length > 0 ? (
            solicitudesFiltradas.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.id}</td>
                <td>{solicitud.cliente}</td>
                <td>{solicitud.dni}</td>
                <td className={solicitud.estado.toLowerCase()}>{solicitud.estado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron solicitudes.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

        
export default SolicitudesClientes