import React, { useState, useEffect } from 'react';
import './Reportes.css';

function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
    const [codigoBuscar, setCodigoBuscar] = useState('');
    const [nuevoReporte, setNuevoReporte] = useState({
        usuario: '',
        descripcion_reporte: '',
        encargado_resolver: '',
        prioridad: '',
        estado: 'Pendiente',  // Campo de estado agregado
        subestado: 'Acogido', // Campo de subestado agregado
        fecha_reporte: new Date().toLocaleDateString(),
        fecha_respuesta_reporte: '',
        respuestas_reporte: ''
    });
    const [modalAbierto, setModalAbierto] = useState(false); // Estado para controlar la visibilidad del modal de creación de reporte
    const [modalRespuestaAbierto, setModalRespuestaAbierto] = useState(false); // Estado para el modal de respuesta
    const [mostrarFormularioCOMPLETO, setMostrarFormularioCOMPLETO] = useState(false);

    const [respuesta, setRespuesta] = useState(''); // Respuesta del encargado

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

    const manejarDetallesReporte = (reporte) => {
        const reporteActualizado = reportes.find(r => r.id_reportes === reporte.id_reportes);
        setReporteSeleccionado(reporteActualizado); // Guardar los datos del reporte
        setMostrarFormularioCOMPLETO(true); // Mostrar el modal
    };
    

    const cerrarModal = () => {
        setModalAbierto(false); // Cambiar el estado para cerrar el modal de creación
    };

    const cerrarModalRespuesta = () => {
        setModalRespuestaAbierto(false); // Cambiar el estado para cerrar el modal de respuesta
        setRespuesta(''); // Limpiar el campo de respuesta
    };

   

    const responderReporte = (reporte) => {
        setReporteSeleccionado(reporte);
        setModalRespuestaAbierto(true); // Abrir el modal de respuesta
    };
//ayudando ando 
    
    const manejarRespuesta = (e) => {
        e.preventDefault();

        // Simulación de la actualización del reporte con la respuesta
        const reporteActualizado = { 
            ...reporteSeleccionado, 
            descripcion_reporte: nuevoReporte.descripcion_reporte, 
            prioridad: nuevoReporte.prioridad, 
            estado: nuevoReporte.estado, 
            subestado: nuevoReporte.subestado, 
            encargado_resolver: nuevoReporte.encargado_resolver, 
            respuestas_reporte: respuesta,
            fecha_respuesta_reporte: new Date().toLocaleDateString()
        };

        // Actualizar el array de reportes
    const reportesActualizados = reportes.map((reporte) => 
        reporte.id_reportes === reporteSeleccionado.id_reportes ? reporteActualizado : reporte
    );

    setReportes(reportesActualizados);

    // También actualizar el reporte seleccionado para reflejar los cambios
    setReporteSeleccionado(reporteActualizado);

    alert('¡Respuesta enviada exitosamente!');
    cerrarModalRespuesta();
};

    // Función para generar el código del reporte automáticamente
    const generarCodigoReporte = () => {
        const nuevoCodigo = `REP${Math.floor(Math.random() * 1000) + 100}`; // Genera un código como REPXXX
        return nuevoCodigo;
    };

    // Función para manejar el envío del formulario de creación de reporte
    const manejarCreacionReporte = (e) => {
        e.preventDefault();

        const nuevoReporteConCodigo = {
            ...nuevoReporte,
            codigo_reporte: generarCodigoReporte(),
            fecha_respuesta_reporte: '', // Fecha de respuesta vacía al inicio
        };

        setReportes([...reportes, nuevoReporteConCodigo]);
        setNuevoReporte({
            usuario: '',
            descripcion_reporte: '',
            encargado_resolver: '',
            prioridad: '',
            estado: 'Pendiente',
            subestado: 'Acogido',
            fecha_reporte: new Date().toLocaleDateString(),
            fecha_respuesta_reporte: '',
            respuestas_reporte: ''
        });

        // Mostrar la alerta de éxito
        alert('¡Reporte creado exitosamente!');

        // Cerrar el modal
        cerrarModal();
    };

    // Función para cancelar la creación de un reporte
    const manejarCancelacionReporte = () => {
        setNuevoReporte({
            usuario: '',
            descripcion_reporte: '',
            encargado_resolver: '',
            prioridad: '',
            estado: 'Pendiente',
            subestado: 'Acogido',
            fecha_reporte: new Date().toLocaleDateString(),
            fecha_respuesta_reporte: '',
            respuestas_reporte: ''
        });

        // Cerrar el modal
        cerrarModal();
    };

    return (
        <div className="reportes-page">
            <h1 className="titulo">Gestión de Reportes</h1>

            <div className="acciones-container">
                <button 
                    className="btn btn-success" 
                    onClick={() => setModalAbierto(true)} // Abrir modal al hacer clic
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
                    <button className="btn-buscar">Buscar</button>
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

            <table className="table-container">
                <thead>
                    <tr>
                        <th>Código Reporte</th>                       
                        <th>Usuario</th>    
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
                        <tr key={reporte.codigo_reporte}>
                            <td onClick={() => manejarDetallesReporte(reporte)}>{reporte.codigo_reporte}</td>      
                            <td>{reporte.usuario}</td>  
                            <td>{reporte.encargado_resolver}</td>
                            <td>{reporte.prioridad}</td>
                            <td className={`estado-${reporte.estado.toLowerCase()}`}>{reporte.estado}</td>
                            <td>{reporte.subestado}</td>
                            <td>{reporte.fecha_reporte}</td>
                            <td>
                                <button className="btn btn-primary">Actualizar</button>
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
                            <label>Usuario:</label>
                            <input 
                                type="text" 
                                value={nuevoReporte.usuario} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, usuario: e.target.value })} 
                                required
                            />
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
                            <label>Subestado:</label>
                            <select 
                                value={nuevoReporte.subestado} 
                                onChange={(e) => setNuevoReporte({ ...nuevoReporte, subestado: e.target.value })} 
                                required
                            >
                                <option value="Acogido">Acogido</option>
                                <option value="No_acogido">No Acogido</option>
                            </select>
                            <div className="modal-buttons">
                                <button className="btn btn-primary" type="submit">Crear</button>
                                <button className="btn btn-secondary" type="button" onClick={manejarCancelacionReporte}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para mostrar detalles del reporte */}
            {mostrarFormularioCOMPLETO && (
    <div className="modal-overlay">
        <div className="modal-content-completo">
            <div className="titulo-completo-modal">
                <h3 className="text-center">INFORMACIÓN COMPLETA DEL REPORTE</h3>
            </div>

            <div className="formulario-campos-completo">
                <div>
                    <div className="campos-datos">
                        <label>Código Reporte:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.codigo_reporte}
                            disabled
                        />
                    </div>
                    <div className="campos-datos">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.usuario}
                            disabled
                        />
                    </div>
                    <div className="campos-datos">
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.descripcion_reporte}
                            disabled
                        />
                    </div>
                    <div className="campos-datos">
                        <label>Prioridad:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.prioridad}
                            disabled
                        />
                    </div>
                </div>
                <div>
                    <div className="campos-datos">
                        <label>Fecha Reporte:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.fecha_reporte}
                            disabled
                        />
                    </div>
                    <div className="campos-datos">
                        <label>Fecha Respuesta:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.fecha_respuesta_reporte}
                            disabled
                        />
                    </div>
                </div>
                <div>
                    <div className="campos-datos">
                        <label>Estado:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.estado}
                            disabled
                        />
                    </div>
                    <div className="campos-datos">
                        <label>Subestado:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado.subestado}
                            disabled
                        />
                    </div>
                </div>
                <div>
                    <div className="campos-datos">
                        <label>Respuesta:</label>
                        <input
                            type="text"
                            value={reporteSeleccionado?.respuestas_reporte || ""}
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="formulario-botones-completo">
                <button className="btn btn-secondary" onClick={() => setMostrarFormularioCOMPLETO(false)}>Volver</button>
            </div>
        </div>
    </div>
)}


            {/* Modal para responder al reporte */}
            {modalRespuestaAbierto && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Responder Reporte</h2>
                        <form onSubmit={manejarRespuesta}>
                            <label>Respuesta:</label>
                            <textarea 
                                value={respuesta}
                                onChange={(e) => setRespuesta(e.target.value)} 
                                required
                            />
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
