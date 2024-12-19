import React, { useState, useEffect } from 'react';
import './Servicios.css';
import BoletasBD from './BASE DE DATOS/BoletasBD';
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Asegúrate de importar esta librería

function Servicios() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        DNI: '',
        codigoBoleta: '',
        metodoPago: '',
        costo: '',
        fechaPago: '',
        espacioAdquirido: '',
    });
    const [boletas, setBoletas] = useState([]);
    const [editingBoletaIndex, setEditingBoletaIndex] = useState(null);

    // Cargar boletas al iniciar la página
    useEffect(() => {
        BoletasBD.getAllBoletas()
            .then((response) => {
                setBoletas(response.data);
            })
            .catch((error) => alert("Error al cargar boletas: " + error.message));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpenModal = (boleta = null, index = null) => {
        if (boleta) {
            setFormData(boleta);
            setEditingBoletaIndex(index);
        } else {
            setFormData({
                DNI: '',
                codigoBoleta: '',
                metodoPago: '',
                costo: '',
                fechaPago: new Date().toISOString().split('T')[0],
                espacioAdquirido: '',
            });
            setEditingBoletaIndex(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSaveBoleta = () => {
        const boleta = {
            dni: formData.DNI,
            codigoBoleta: formData.codigoBoleta,
            metodoPago: formData.metodoPago,
            montoPagar: formData.costo,
            fechaEmision: formData.fechaPago,
            codigoEspacio: formData.espacioAdquirido,
        };

        if (editingBoletaIndex !== null) {
            BoletasBD.actualizarBoleta(boleta)
                .then(() => {
                    const updatedBoletas = [...boletas];
                    updatedBoletas[editingBoletaIndex] = {
                        ...boletas[editingBoletaIndex],
                        ...boletaData
                    };
                    setBoletas(updatedBoletas);
                    alert("Boleta actualizada exitosamente.");
                    handleCloseModal();
                })
                .catch((error) => {
                    alert("Error al actualizar la boleta: " + error.message);
                });
        } else {
            BoletasBD.agregarBoleta(boleta)
                .then((response) => {
                    setBoletas([...boletas, response.data]);
                    alert("Boleta agregada exitosamente.");
                    handleCloseModal();
                })
                .catch((error) => {
                    alert("Error al agregar la boleta: " + error.message);
                });
        }
    };

    // Función para generar el PDF
    const handleGenerateTablePDF = (boleta) => {
        const doc = new jsPDF();

        // Título del PDF
        doc.setFontSize(18);
        doc.text("Boleta de Pago", 14, 20);

        // Contenido de la boleta
        const tableData = [
            ["Código de Boleta", boleta.codigoBoleta],
            ["DNI", boleta.dni],
            ["Espacio Adquirido", boleta.codigoEspacio],
            ["Fecha de Pago", boleta.fechaEmision],
            ["Método de Pago", boleta.metodoPago],
            ["Monto de Pago", boleta.montoPagar]
        ];

        // Usando autotable para agregar la tabla
        doc.autoTable({
            head: [["Detalle", "Información"]],
            body: tableData,
            startY: 30, // Establece el inicio de la tabla
        });

        // Guardar el PDF
        doc.save(`${boleta.codigoBoleta}.pdf`);
    };

    return (
        <div className="servicios-page">
            <h2 className="title-servicios">Servicios de Boleta</h2>

            <div className="center-button-container">
                <button className="btn-generate" onClick={() => handleOpenModal()}>
                    Generar Boletas
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editingBoletaIndex !== null ? 'Editar Boleta' : 'Generar Boleta'}</h3>
                        <form>
                            <div className="form-group">
                                <label>Código de Boleta:</label>
                                <input type="text" name="codigoBoleta" value={formData.codigoBoleta} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>DNI:</label>
                                <input type="text" name="DNI" value={formData.DNI} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Espacio Adquirido:</label>
                                <input type="text" name="espacioAdquirido" value={formData.espacioAdquirido} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Fecha de Pago:</label>
                                <input type="date" name="fechaPago" value={formData.fechaPago} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Método de Pago:</label>
                                <select name="metodoPago" value={formData.metodoPago} onChange={handleInputChange}>
                                    <option value="">Seleccione</option>
                                    <option value="Efectivo">Efectivo</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Monto de Pago:</label>
                                <input type="number" name="costo" value={formData.costo} onChange={handleInputChange} />
                            </div>
                        </form>
                        <div className="modal-actions">
                            <button type="button" className="btn-save" onClick={handleSaveBoleta}>
                                {editingBoletaIndex !== null ? 'Actualizar' : 'Generar'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <table className="boletas-table">
                <thead>
                    <tr>
                        <th>Código de Boleta</th>
                        <th>DNI del Cliente</th>
                        <th>Nombre Completo</th>
                        <th>Espacio Alquilado</th>
                        <th>Fecha de Emisión</th>
                        <th>Método de Pago</th>
                        <th>Monto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {boletas.map((boleta, index) => (
                        <tr key={index}>
                            <td>{boleta.codigoBoleta}</td>
                            <td>{boleta.alquileres?.cliente?.dni}</td>
                            <td>{`${boleta.alquileres?.cliente?.nombre} ${boleta.alquileres?.cliente?.apellido}`}</td>
                            <td>{boleta.alquileres?.espacio?.codigoEspacio}</td>
                            <td>{boleta.fechaEmision}</td>
                            <td>{boleta.metodoPago}</td>
                            <td>{boleta.montoPagar}</td>
                            <td className="actions">
                                <button className="btn-generate" onClick={() => handleGenerateTablePDF(boleta)}>Generar PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Servicios;
