import React from 'react';
import './Reportes.css';

function Reportes() {
    const trabajador = {
        nombre: 'Juan Pérez',
        puesto: 'Desarrollador Frontend',
        id: '12345',
        fechaIngreso: '15/01/2020',
        reportes: [
            { id: 1, titulo: 'Cumplimiento de Tareas', descripcion: 'Cumplió con el 95% de las tareas asignadas.', fecha: '01/11/2024' },
            { id: 2, titulo: 'Asistencia', descripcion: 'Asistencia perfecta en el mes.', fecha: '30/11/2024' },
        ],
    };

    return (
        <div className="reportes-page"> {/* NO TOCAR NI MIRAR LA CLASE "reportes-page" */}
            <h2>Reportes</h2>
            <div className="reporte-container">
                <div className="trabajador-info">
                    <p><strong>Nombre:</strong> {trabajador.nombre}</p>
                    <p><strong>Puesto:</strong> {trabajador.puesto}</p>
                    <p><strong>ID:</strong> {trabajador.id}</p>
                    <p><strong>Fecha de Ingreso:</strong> {trabajador.fechaIngreso}</p>
                </div>
                <div className="reportes">
                    <h3>Historial de Reportes</h3>
                    {trabajador.reportes.map((reporte) => (
                        <div key={reporte.id} className="reporte-item">
                            <h4>{reporte.titulo}</h4>
                            <p><strong>Fecha:</strong> {reporte.fecha}</p>
                            <p>{reporte.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}




export default Reportes;
