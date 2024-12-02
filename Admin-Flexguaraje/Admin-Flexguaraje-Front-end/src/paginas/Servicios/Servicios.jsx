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
            <h2>Servicios</h2>
            <button className="btn-add" onClick={handleOpenModal}>
                Generar Datos
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Datos del Cliente</h3>
                        <form>
                            <label>Codigo de Boleta:</label>
                            <input
                                type="text"
                                name="codigoBoleta"
                                value={formData.codigoBoleta}
                                onChange={handleInputChange}
                            />

                            <label>Nombres y Apellidos:</label>
                            <input
                                type="text"
                                name="nombres"
                                value={formData.nombres}
                                onChange={handleInputChange}
                            />

                            <label>DNI:</label>
                            <input
                                type="text"
                                name="DNI"
                                value={formData.DNI}
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
            <table className="boletas-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código de Boleta</th>
                        <th>Nombre y Apellidos</th>
                        <th>DNI</th>
                        <th>Pago</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha Final</th>
                    </tr>
                </thead>
                <tbody>
                    {boletas.map((boleta) => (
                        <tr key={boleta.id}>
                            <td>{boleta.id}</td>
                            <td>{boleta.codigoBoleta}</td>
                            <td>{boleta.nombres}</td>
                            <td>{boleta.DNI}</td>
                            <td>S/ {boleta.costo}</td>
                            <td>{boleta.fechaInicio}</td>
                            <td>{boleta.fechaFinal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="table-actions">
                <button onClick={handleGenerateTablePDF}>Generar PDF</button>
                <button onClick={() => alert('Actualizar boletas')}>Actualizar</button>
                <button onClick={() => alert('Eliminar boletas')}>Eliminar</button>
            </div>
        </div>
    );
}

export default Servicios;
