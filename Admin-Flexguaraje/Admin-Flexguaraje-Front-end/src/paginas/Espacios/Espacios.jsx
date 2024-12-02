import React, { useState } from 'react';
import './Espacios.css';

function Espacios() {
    // Datos iniciales
    const [datos, setDatos] = useState([
        { id: 1, dni: '75117638', nombre: 'Cesar Daniel Carhuas Aldana', inicio: '10/10/24', final: `24/12/24`, estado: 'DISPONIBLE' },
        { id: 2, dni: '45678912', nombre: 'María Pérez', inicio: '10/10/24', final: `24/12/24`, estado: 'OCUPADO' },
        { id: 3, dni: '78912345', nombre: 'Juan López', inicio: '10/10/24', final: `24/12/24`, estado: 'MANTENIMIENTO' },
    ]);

    // Estado para el filtro de estado
    const [filtroEstado, setFiltroEstado] = useState(''); // Vacío para mostrar todos los estados

    // Completar con datos ficticios
    while (datos.length < 20) {
        datos.push({
            id: datos.length + 1,
            dni: `750000${datos.length}`,
            nombre: `Cliente ${datos.length}`,
            inicio: `10/10/24`,
            final: `24/12/24`,
            estado: 'DISPONIBLE',
        });
    }

    // Manejar el cambio de estado
    const handleEstadoChange = (id, nuevoEstado) => {
        const nuevosDatos = datos.map((dato) =>
            dato.id === id ? { ...dato, estado: nuevoEstado } : dato
        );
        setDatos(nuevosDatos);
    };

    // Filtrar los datos según el estado
    const datosFiltrados = filtroEstado
        ? datos.filter(dato => dato.estado === filtroEstado)
        : datos;

    return (
        <div className="espacios-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="title-espacios">Espacios de Almacenamiento</h2>

                {/* Filtro de estado */}
                <div className="filtro-container">
                    <label htmlFor="filtroEstado" className="form-label">Filtrar por estado</label>
                    <select
                        id="filtroEstado"
                        className="form-select"
                        aria-label="Seleccionar estado para filtrar"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="">TODOS</option>
                        <option value="DISPONIBLE">DISPONIBLE</option>
                        <option value="OCUPADO">OCUPADO</option>
                        <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                    </select>
                </div>
            </div>

            <table className="table table-primary table-hover table-bordered border-primary text-center tabla-espacios">
                <thead>
                    <tr>
                        <th scope="col" className="espacios-n">#</th>
                        <th scope="col" className="espacios-dni">DNI</th>
                        <th scope="col" className="espacios-na">Nombre y Apellido</th>
                        <th scope="col" className="espacios-c">Contacto</th>
                        <th scope="col" className="espacios-t">Inicio</th>
                        <th scope="col" className="espacios-t">Final</th>
                        <th scope="col" className="espacios-e">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.map((dato) => (
                        <tr key={dato.id}>
                            <th scope="row">{dato.id}</th>
                            <td>
                                <div className="dni-content">
                                    <span>{dato.dni}</span>
                                    <div className="dni-buttons">
                                        <button className="btn btn-success btn-sm mx-1">✅</button>
                                        <button className="btn btn-danger btn-sm mx-1">❌</button>
                                    </div>
                                </div>
                            </td>
                            <td>{dato.nombre}</td>
                            <td></td>
                            <td>{dato.inicio}</td>
                            <td>{dato.final}</td>
                            <td>
                                <select
                                    value={dato.estado}
                                    className={`form-select estado-${dato.estado.toLowerCase()}`}
                                    aria-label="Seleccionar estado"
                                    onChange={(e) => handleEstadoChange(dato.id, e.target.value)}
                                >
                                    <option value="DISPONIBLE">DISPONIBLE</option>
                                    <option value="OCUPADO">OCUPADO</option>
                                    <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Espacios;
