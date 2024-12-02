import React, { useState } from 'react';
import './Servicios.css';

function Servicios() {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [formData, setFormData] = useState({
        nombres: '',
        DNI: '',
        codigoBoleta: '',
        costo: '',
        fechaInicio: '',
        fechaFinal: '',
    });

    const [boletas, setBoletas] = useState([]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            nombres: '',
            DNI: '',
            codigoBoleta: '',
            costo: '',
            fechaInicio: '',
            fechaFinal: '',
        });
    };

    const handleSaveBoleta = () => {
        setBoletas([...boletas, { id: boletas.length + 1, ...formData }]);
        alert(`La boleta para ${formData.nombres} ha sido guardada exitosamente.`);
        handleCloseModal();
    };

    const handleGenerateTablePDF = () => {
        alert('La funcionalidad de generar PDF estará aquí.');
    };

    return (
        <div className="servicios-page">
            <h2 className="title-servicios">Servicios de Boleta</h2>
            <div className="center-button-container">
            <button className="btn-add" onClick={handleOpenModal}>
                Generar Datos
            </button>
            </div>

            {/* Modal */}
{/* Modal */}
{isModalOpen && (
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Datos del Cliente</h3>
            <form>
                <label>Código de Boleta:</label>
                <input
                    type="text"
                    name="codigoBoleta"
                    value={formData.codigoBoleta}
                    onChange={handleInputChange}
                />

                <label>DNI:</label>
                <input
                    type="text"
                    name="DNI"
                    value={formData.DNI}
                    onChange={handleInputChange}
                />

                <label>Apellidos y Nombres:</label>
                <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                />

                <label>Pago:</label>
                <input
                    type="number"
                    name="costo"
                    value={formData.costo}
                    onChange={handleInputChange}
                />

                <label>Fecha de Inicio:</label>
                <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                />

                <label>Fecha Final:</label>
                <input
                    type="date"
                    name="fechaFinal"
                    value={formData.fechaFinal}
                    onChange={handleInputChange}
                />

                <div className="modal-actions">
                    <button type="button" onClick={handleSaveBoleta}>
                        Guardar
                    </button>
                    <button type="button" onClick={handleCloseModal}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>
)}


           {/* Tabla de Boletas */}
<table className="boletas-table text-center">
    <thead>
        <tr>
            <th className='table-atributos'>ATRIBUTOS</th>
            <th className='table-datos'>DATOS</th>
            
        </tr>
    </thead>
    <tbody>
        {boletas.map((boleta) => (
            <React.Fragment key={boleta.id}>
                <tr>
                    <td className="highlight-column">ID</td>
                    <td className="columna" >{boleta.id}</td>
                </tr>
                <tr>
                    <td className="highlight-column">Código de Boleta</td>
                    <td className="columna">{boleta.codigoBoleta}</td>
                </tr>
                <tr>
                    <td className="highlight-column">DNI</td>
                    <td className="columna">{boleta.DNI}</td>
                </tr>
                <tr>
                    <td className="highlight-column">Nombre y Apellidos</td>
                    <td className="columna">{boleta.nombres}</td>
                </tr>
                <tr>
                    <td className="highlight-column">Pago</td>
                    <td className="columna">S/ {boleta.costo}</td>
                </tr>
                <tr>
                    <td className="highlight-column">Fecha de Inicio</td>
                    <td className="columna">{boleta.fechaInicio}</td>
                </tr>
                <tr>
                    <td className="highlight-column">Fecha Final</td>
                    <td className="columna">{boleta.fechaFinal}</td>
                </tr>
            </React.Fragment>
        ))}
    </tbody>
</table>



            <div className="table-actions">
                <button className="btn-update" onClick={() => alert('Actualizar boletas')}>Actualizar</button>
                <button className="btn-delete" onClick={() => alert('Eliminar boletas')}>Eliminar</button>
                <button className="btn-generate" onClick={handleGenerateTablePDF}>Generar PDF</button>
            </div>
        </div>
    );
}

export default Servicios;
