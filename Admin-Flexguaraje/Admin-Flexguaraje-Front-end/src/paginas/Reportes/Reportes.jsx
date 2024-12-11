import React, { useState } from 'react';
import './Reportes.css';

function Reportes() {

    const [espacios, setEspacios] = useState([
        { id: 1, codigo: 'A123', dni: '75117638', nombre: 'Cesar Daniel Carhuas Aldana', descripcion: 'Problema con el espacio A123', estado: 'DISPONIBLE' },
        { id: 2, codigo: 'B456', dni: '45678912', nombre: 'María Pérez', descripcion: 'Espacio en uso por mantenimiento', estado: 'OCUPADO' },
        { id: 3, codigo: 'C789', dni: '78912345', nombre: 'Juan López', descripcion: 'Necesita reparaciones', estado: 'MANTENIMIENTO' },
        { id: 4, codigo: 'D012', dni: '7500003', nombre: 'Cliente 3', descripcion: 'Espacio disponible', estado: 'DISPONIBLE' },
    ]);

    const [nuevoReporte, setNuevoReporte] = useState({
        codigo: '',
        dni: '',
        nombre: '',
        descripcion: '',
        estado: 'DISPONIBLE'
    });

    const agregarReporte = () => {
        if (nuevoReporte.codigo && nuevoReporte.dni && nuevoReporte.nombre && nuevoReporte.descripcion) {
            setEspacios([
                ...espacios,
                {
                    ...nuevoReporte,
                    id: espacios.length + 1 // Generamos un id único
                }
            ]);
            setNuevoReporte({
                codigo: '',
                dni: '',
                nombre: '',
                descripcion: '',
                estado: 'DISPONIBLE'
            });
        } else {
            alert('Todos los campos deben estar completos');
        }
    };

    const actualizarReporte = (id) => {
        const reporteActualizado = espacios.find((espacio) => espacio.id === id);
        if (reporteActualizado) {
            const nuevoEstado = reporteActualizado.estado === 'DISPONIBLE' ? 'OCUPADO' : 'DISPONIBLE';
            setEspacios(espacios.map((espacio) =>
                espacio.id === id ? { ...espacio, estado: nuevoEstado } : espacio
            ));
        }
    };

    const eliminarReporte = (id) => {
        setEspacios(espacios.filter((espacio) => espacio.id !== id));
    };

    return (
        <div className="reportes-page">
            <h1>Reportes - Pronto estaria habilitado.</h1>

            {/* por el momento no 
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Código"
                    value={nuevoReporte.codigo}
                    onChange={(e) => setNuevoReporte({ ...nuevoReporte, codigo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="DNI"
                    value={nuevoReporte.dni}
                    onChange={(e) => setNuevoReporte({ ...nuevoReporte, dni: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nuevoReporte.nombre}
                    onChange={(e) => setNuevoReporte({ ...nuevoReporte, nombre: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={nuevoReporte.descripcion}
                    onChange={(e) => setNuevoReporte({ ...nuevoReporte, descripcion: e.target.value })}
                />
                <select
                    value={nuevoReporte.estado}
                    onChange={(e) => setNuevoReporte({ ...nuevoReporte, estado: e.target.value })}
                >
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="OCUPADO">Ocupado</option>
                    <option value="MANTENIMIENTO">Mantenimiento</option>
                </select>
                <button onClick={agregarReporte}>Agregar Reporte</button>
            </div>

            {/* Tabla de reportes 
            <table className="table-container">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>DNI</th>
                        <th>Nombre y Apellido</th>
                        <th>Descripción del Problema</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {espacios.map((espacio) => (
                        <tr key={espacio.id}>
                            <td>{espacio.id}</td>
                            <td>{espacio.codigo}</td>
                            <td>{espacio.dni}</td>
                            <td>{espacio.nombre}</td>
                            <td>{espacio.descripcion}</td>
                            <td>
                                <span className={`estado-${espacio.estado.toLowerCase()}`}>
                                    {espacio.estado}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn-accion editar"
                                    onClick={() => actualizarReporte(espacio.id)}
                                >
                                    Actualizar Estado
                                </button>
                                <button
                                    className="btn-accion eliminar"
                                    onClick={() => eliminarReporte(espacio.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            */}
        </div>
    );
}

export default Reportes;
