import React, { useState } from 'react';
import './Servicios.css';

function Servicios() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        nombres: '',
        DNI: '',
        codigoBoleta: '',
        metodoPago: '',
        costo: '',
        fechaPago: '',
        fechaInicio: '',
        fechaFinal: '',
    });
    const [editingBoletaId, setEditingBoletaId] = useState(null);
    const [boletas, setBoletas] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpenModal = (boleta = null) => {
        if (boleta) {
            setFormData(boleta);
            setEditingBoletaId(boleta.id);
        } else {
            setFormData({
                id: '',
                nombres: '',
                DNI: '',
                codigoBoleta: '',
                metodoPago: '',
                costo: '',
                fechaPago: '',
                fechaInicio: '',
                fechaFinal: '',
            });
            setEditingBoletaId(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBoletaId(null);
    };

    const handleSaveBoleta = () => {
        const { id, nombres, DNI, codigoBoleta, metodoPago, costo, fechaPago, fechaInicio, fechaFinal } = formData;

        if (!id || !nombres || !DNI || !codigoBoleta || !metodoPago || !costo || !fechaPago || !fechaInicio || !fechaFinal) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (editingBoletaId) {
            setBoletas((prevBoletas) =>
                prevBoletas.map((boleta) =>
                    boleta.id === editingBoletaId ? { ...boleta, ...formData } : boleta
                )
            );
            alert(`La boleta de ${formData.nombres} ha sido actualizada.`);
        } else {
            setBoletas([...boletas, { id, ...formData }]);
            alert(`La boleta para ${formData.nombres} ha sido guardada exitosamente.`);
        }
        handleCloseModal();
    };

    const handleDeleteBoleta = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta boleta?')) {
            setBoletas((prevBoletas) => prevBoletas.filter((boleta) => boleta.id !== id));
            alert('La boleta ha sido eliminada.');
        }
    };

    const handleGenerateTablePDF = () => {
        alert('La funcionalidad de generar PDF estará aquí.');
    };

    return (
        <div className="servicios-page">
            <h2 className="title-servicios">Servicios de Boleta</h2>
            <div className="center-button-container">
                <button className="btn-add" onClick={() => handleOpenModal()}>
                    Generar Datos
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className={`modal-content ${editingBoletaId ? 'edit-mode' : 'add-mode'}`}>
                        <h3>{editingBoletaId ? 'Editar Boleta' : 'Datos del Cliente'}</h3>
                        <form>
                            <label>ID:</label>
                            <input
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleInputChange}
                                disabled={!!editingBoletaId} 
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

                            <label>Código de Boleta:</label>
                            <input
                                type="text"
                                name="codigoBoleta"
                                value={formData.codigoBoleta}
                                onChange={handleInputChange}
                            />

                            <label>Fecha de Pago:</label>
                            <input
                                type="date"
                                name="fechaPago"
                                value={formData.fechaPago}
                                onChange={handleInputChange}
                            />

                            <label>Método de Pago:</label>
                            <select
                                name="metodoPago"
                                value={formData.metodoPago}
                                onChange={handleInputChange}
                            >
                    
                                <option value="efectivo">Efectivo</option>
                            </select>

                            <label>Costo (Monto de Pago):</label>
                            <input
                                type="number"
                                name="costo"
                                value={formData.costo}
                                onChange={handleInputChange}
                            />

                            <label>Fecha de Inicio del Alquiler:</label>
                            <input
                                type="date"
                                name="fechaInicio"
                                value={formData.fechaInicio}
                                onChange={handleInputChange}
                            />

                            <label>Fecha Final del Alquiler:</label>
                            <input
                                type="date"
                                name="fechaFinal"
                                value={formData.fechaFinal}
                                onChange={handleInputChange}
                            />

                            <div className="modal-actions">
                                <button type="button" onClick={handleSaveBoleta}>
                                    {editingBoletaId ? 'Actualizar' : 'Guardar'}
                                </button>
                                <button type="button" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table className="boletas-table text-center">
                <thead>
                    <tr>
                        <th className="table-atributos">ATRIBUTOS</th>
                        <th className="table-datos">DATOS</th>
                    </tr>
                </thead>
                <tbody>
                    {boletas.map((boleta, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td className="highlight-column">ID</td>
                                <td>{boleta.id}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Código de Boleta</td>
                                <td>{boleta.codigoBoleta}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">DNI</td>
                                <td>{boleta.DNI}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Nombres</td>
                                <td>{boleta.nombres}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Costo</td>
                                <td>{boleta.costo}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Fecha de Pago</td>
                                <td>{boleta.fechaPago}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Fecha Inicio</td>
                                <td>{boleta.fechaInicio}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Fecha Final</td>
                                <td>{boleta.fechaFinal}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Método de Pago</td>
                                <td>{boleta.metodoPago}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="table-actions">
                <button className="btn-update" onClick={() => handleOpenModal()}>
                    Actualizar
                </button>
                <button className="btn-delete" onClick={() => handleDeleteBoleta()}>
                    Eliminar
                </button>
                <button className="btn-generate" onClick={handleGenerateTablePDF}>
                    Generar PDF
                </button>
            </div>
        </div>
    );
}

export default Servicios;
