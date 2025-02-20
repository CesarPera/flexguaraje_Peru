import React, { useState, useEffect } from 'react';
import './Reportes.css';

function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
    const [codigoBuscar, setCodigoBuscar] = useState('');
    const [modalActualizarAbierto, setModalActualizarAbierto] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalRespuestaAbierto, setModalRespuestaAbierto] = useState(false);
    const [respuesta, setRespuesta] = useState('');
    const [nuevoReporte, setNuevoReporte] = useState({
        descripcion_reporte: '',
        encargado_resolver: '',
        prioridad: '',
        estado: 'Pendiente',
        subestado: 'Acogido',
        fecha_reporte: new Date().toLocaleDateString(),
        fecha_respuesta_reporte: '',
        respuestas_reporte: ''
    });
    const [mostrarFormularioCOMPLETO, setMostrarFormularioCOMPLETO] = useState(false);

    useEffect(() => {
        // Simulación de llamada a API para obtener reportes
        setReportes([
            { 
                id_reportes: 1, 
                codigo_reporte: 'REP123', 
                usuario: 'Juan Pérez', 
                descripcion_reporte: 'Error en el sistema', 
                encargado_resolver: 'Carlos Díaz', 
                prioridad: 'Alta', 
                estado: 'Pendiente', 
                subestado: 'Acogido',
                fecha_reporte: '2025-01-01',
                fecha_respuesta_reporte: '2025-01-02',
                respuestas_reporte: 'Respuesta recibida'
            },
            { 
                id_reportes: 2, 
                codigo_reporte: 'REP456', 
                usuario: 'María López', 
                descripcion_reporte: 'No se puede acceder', 
                encargado_resolver: 'Luis González', 
                prioridad: 'Media', 
                estado: 'Cancelado', 
                subestado: 'No_acogido',
                fecha_reporte: '2025-01-10',
                fecha_respuesta_reporte: '2025-01-11',
                respuestas_reporte: 'Respuesta no recibida'
            },
            { 
                id_reportes: 3, 
                codigo_reporte: 'REP789', 
                usuario: 'Carlos Díaz', 
                descripcion_reporte: 'Fallo en la carga', 
                encargado_resolver: 'Ana Fernández', 
                prioridad: 'Baja', 
                estado: 'Cerrado', 
                subestado: 'Acogido',
                fecha_reporte: '2025-01-15',
                fecha_respuesta_reporte: '2025-01-16',
                respuestas_reporte: 'Problema solucionado'
            },
        ]);
    }, []);

    const filtrarReportes = () => {
        return reportes.filter((reporte) => {
            const estadoCoincide = filtroEstado === 'Todos' || reporte.estado === filtroEstado;
            const codigoCoincide = reporte.codigo_reporte.toLowerCase().includes(codigoBuscar.toLowerCase());
            return estadoCoincide && codigoCoincide;
        });
    };

    const manejarActualizacion = (e) => {
        e.preventDefault();
        const reportesActualizados = reportes.map((reporte) => 
            reporte.id_reportes === reporteSeleccionado.id_reportes ? { ...reporte, ...nuevoReporte } : reporte
        );
        setReportes(reportesActualizados);
        setModalActualizarAbierto(false);
        alert('¡Reporte actualizado exitosamente!');
    };

    const cerrarModalActualizar = () => setModalActualizarAbierto(false);
    
    const cerrarModal = () => {
        setModalAbierto(false);
    };

    const cerrarModalRespuesta = () => {
        setModalRespuestaAbierto(false);
        setRespuesta('');
    };

    const responderReporte = (reporte) => {
        setReporteSeleccionado(reporte);
        setModalRespuestaAbierto(true);
    };

    const manejarRespuesta = (e) => {
        e.preventDefault();
        const reporteActualizado = { 
            ...reporteSeleccionado, 
            respuestas_reporte: respuesta,
            fecha_respuesta_reporte: new Date().toLocaleDateString(),
            subestado: nuevoReporte.subestado
        };
        const reportesActualizados = reportes.map((reporte) => 
            reporte.id_reportes === reporteSeleccionado.id_reportes ? reporteActualizado : reporte
        );
        setReportes(reportesActualizados);
        setReporteSeleccionado(reporteActualizado);
        alert('¡Respuesta enviada exitosamente!');
        cerrarModalRespuesta();
    };

    const generarCodigoReporte = () => {
        const nuevoCodigo = `REP${Math.floor(Math.random() * 1000) + 100}`;
        return nuevoCodigo;
    };

    const manejarCreacionReporte = (e) => {
        e.preventDefault();
        const nuevoReporteConCodigo = {
            ...nuevoReporte,
            codigo_reporte: generarCodigoReporte(),
            fecha_respuesta_reporte: '',
        };
        setReportes([...reportes, nuevoReporteConCodigo]);
        setNuevoReporte({
            descripcion_reporte: '',
            encargado_resolver: '',
            prioridad: '',
            estado: 'Pendiente',
            subestado: 'Acogido',
            fecha_reporte: new Date().toLocaleDateString(),
            fecha_respuesta_reporte: '',
            respuestas_reporte: ''
        });
        alert('¡Reporte creado exitosamente!');
        cerrarModal();
    };

    const manejarCancelacionReporte = () => {
        setNuevoReporte({
            descripcion_reporte: '',
            encargado_resolver: '',
            prioridad: '',
            estado: 'Pendiente',
            subestado: 'Acogido',
            fecha_reporte: new Date().toLocaleDateString(),
            fecha_respuesta_reporte: '',
            respuestas_reporte: ''
        });
        cerrarModal();
    };

    const mostrarDetallesReporte = (reporte) => {
        setReporteSeleccionado(reporte);
        setMostrarFormularioCOMPLETO(true);
    };

    return (
        <div className="reportes-page">
            <h1 className="titulo-reporte">Gestión de Reportes</h1>

            <div className="acciones-container">
                <button 
                    className="btn btn-success" 
                    onClick={() => setModalAbierto(true)}
                >
                    Crear Reporte
                </button>
                <div className="buscar-container">
                    <input 
                        type="text" 
                        placeholder="Código del reporte" 
                        value={codigoBuscar}
                        onChange={(e) => setCodigoBuscar(e.target.value)} 
                    />
                    <button className="btn btn-info">Buscar</button>
                </div>
                <div className="filtro-container">
                    <label>Filtrar por estado:</label>
                    <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                        <option value="Todos">Todos</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Cerrado">Cerrado</option>
                    </select>
                </div>
            </div>
            <table className="table table-primary table-hover table-bordered border-primary text-center tabla-usuario">
                <thead>
                    <tr>
                        <th>Código Reporte</th>                         
                        <th>Encargado Resolver</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Subestado</th>
                        <th>Fecha Reporte</th>    
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarReportes().map((reporte) => (
                        <tr key={reporte.id_reportes}>        
                            <td>
                                <button 
                                    className="btn btn-link" 
                                    onClick={() => mostrarDetallesReporte(reporte)}
                                >
                                    {reporte.codigo_reporte}
                                </button>
                            </td>
                            <td>{reporte.encargado_resolver}</td>
                            <td>{reporte.prioridad}</td>
                            <td className={`estado-${reporte.estado.toLowerCase()}`}>{reporte.estado}</td>
                            <td>{reporte.subestado}</td>
                            <td>{reporte.fecha_reporte}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => setModalActualizarAbierto(true)}>Actualizar</button>
                                <button className="btn-responder" onClick={() => responderReporte(reporte)}>Responder</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal para creación de reporte */}
            {modalAbierto && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Crear Reporte</h2>
                        <form onSubmit={manejarCreacionReporte}>
                            <label>Descripción:</label>
                            <textarea 
                                value={nuevoReporte.descripcion_reporte} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, descripcion_reporte: e.target.value })} 
                                required
                            />
                            <label>Encargado Resolver:</label>
                            <input 
                                type="text" 
                                value={nuevoReporte.encargado_resolver} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, encargado_resolver: e.target.value })} 
                                required
                            />
                            <label>Prioridad:</label>
                            <select 
                                value={nuevoReporte.prioridad} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, prioridad: e.target.value })} 
                                required
                            >
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                            </select>                           
                            <div className="modal-buttons">
                                <button className="btn btn-primary" type="submit">Crear</button>
                                <button className="btn btn-secondary" type="button" onClick={manejarCancelacionReporte}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal Actualizar Reporte */}
            {modalActualizarAbierto && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Actualizar Reporte</h2>
                        <form onSubmit={manejarActualizacion}>
                            <label>Descripción del Reporte:</label>
                            <textarea 
                                value={nuevoReporte.descripcion_reporte} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, descripcion_reporte: e.target.value })} 
                                required
                            />
                            <label>Encargado a Resolver:</label>
                            <input 
                                type="text" 
                                value={nuevoReporte.encargado_resolver} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, encargado_resolver: e.target.value })} 
                                required
                            />
                            <label>Prioridad:</label>
                            <select 
                                value={nuevoReporte.prioridad} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, prioridad: e.target.value })} 
                                required
                            >
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                            </select>
                            <label>Estado:</label>
                            <select 
                                value={nuevoReporte.estado} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, estado: e.target.value })} 
                                required
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Cerrado">Cerrado</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                                <button type="button" className="btn btn-secondary" onClick={cerrarModalActualizar}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal Información Completa del Reporte */}
            {mostrarFormularioCOMPLETO && reporteSeleccionado && (
                <div className="modal-overlay">
                    <div className="modal-content-completo">
                        <h3 className="text-center">INFORMACIÓN COMPLETA DEL REPORTE</h3>
                        <div className="formulario-campos-completo">
                            <div className="campos-datos">
                                <label>Código Reporte:</label>
                                <input type="text" value={reporteSeleccionado.codigo_reporte} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Encargado Resolver:</label>
                                <input type="text" value={reporteSeleccionado.encargado_resolver} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Descripción:</label>
                                <input type="text" value={reporteSeleccionado.descripcion_reporte} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Prioridad:</label>
                                <input type="text" value={reporteSeleccionado.prioridad} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Fecha Reporte:</label>
                                <input type="text" value={reporteSeleccionado.fecha_reporte} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Fecha Respuesta:</label>
                                <input type="text" value={reporteSeleccionado.fecha_respuesta_reporte} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Estado:</label>
                                <input type="text" value={reporteSeleccionado.estado} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Subestado:</label>
                                <input type="text" value={reporteSeleccionado.subestado} disabled />
                            </div>
                            <div className="campos-datos">
                                <label>Respuesta:</label>
                                <input type="text" value={reporteSeleccionado.respuestas_reporte} disabled />
                            </div>
                        </div>
                        <div className="formulario-botones-completo">
                            <button className="btn btn-secondary" onClick={() => setMostrarFormularioCOMPLETO(false)}>Volver</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Responder Reporte */}
            {modalRespuestaAbierto && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Responder Reporte</h2>
                        <form onSubmit={manejarRespuesta}>
                            <label>Respuesta:</label>
                            <textarea 
                                value={respuesta}
                                onChange={(e) => setRespuesta(e.target.value)}
                                placeholder="Escribe la respuesta aquí..." 
                                required
                            />
                            <label>Subestado:</label>
                            <select 
                                value={nuevoReporte.subestado}
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, subestado: e.target.value })} 
                                required
                            >
                                <option value="">Seleccione</option>
                                <option value="Acogido">Acogido</option>
                                <option value="No_acogido">No Acogido</option>
                            </select>
                            <div className="modal-buttons">
                                <button className="btn btn-primary" type="submit">Responder</button>
                                <button className="btn btn-secondary" type="button" onClick={cerrarModalRespuesta}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reportes;