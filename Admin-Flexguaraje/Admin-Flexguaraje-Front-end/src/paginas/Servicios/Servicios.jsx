import React, { useState, useEffect } from 'react';
import './Servicios.css';
import BoletasBD from './BASE DE DATOS/BoletasBD';
import AlquileresBD from '../Espacios/BASE_DE_DATOS/AlquileresBD';

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
    const [alquileres, setAlquileres] = useState([]);
    const [editingBoletaIndex, setEditingBoletaIndex] = useState(null);

    // Cargar boletas al iniciar la página
    const fetchBoleta = async () => {
        try {
            const response = await BoletasBD.getAllBoletas();
            console.log("Boletas recibidas:", response.data); // Verifica los datos de boletas
            setBoletas(response.data);
        } catch (error) {
            console.error("Error al cargar las boletas:", error);
        }
    };
    
    const fetchAlquileres = async () => {
        try {
            const response = await AlquileresBD.getAllAlquileres();
            console.log("Alquileres recibidos:", response.data); // Verifica los datos de alquileres
            setAlquileres(response.data);
        } catch (error) {
            console.error("Error al cargar los alquileres:", error);
        }
    };
    

    // Combinación de boletas y alquileres
    const BoletasCombinados = boletas.map((boleta) => {
        const alquiler = alquileres.find(
            (alquiler) => alquiler.id_alquiler === boleta.id_alquiler
        );

        const cliente = alquiler ? alquiler.id_cliente : null;
        const clienteData = cliente ? alquileres.find(a => a.id_cliente === cliente).cliente : {};

        const codigoEspacio = alquiler ? alquiler.id_espacio : '';
        const combinedBoleta = {
            ...boleta,
            dni: clienteData.dni || '',
            codigoespacio: codigoEspacio,
            fechaPago: boleta.fecha_emision,
            metodo: boleta.metodo_pago,
            montoPagar: boleta.monto_pagar,
        };

        console.log(combinedBoleta); // Verifica los datos combinados
        return combinedBoleta;
    });


    useEffect(() => {
        fetchBoleta();
        fetchAlquileres();
    }, []);  // Solo se ejecuta al montar el componente

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
            BoletasBD.actualizarBoleta(boleta) // Actualizar boleta en el backend
                .then(() => {
                    const updatedBoletas = [...boletas];
                    updatedBoletas[editingBoletaIndex] = boleta; // Actualiza el estado local
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

    const handleGenerateTablePDF = () => {
        alert('La funcionalidad de generar PDF estará aquí.');
    };

    return (
        <div className="servicios-page">
            <h2 className="title-servicios">Servicios de Boleta</h2>

            {/* Contenedor para centrar el botón */}
            <div className="center-button-container">
                {/* Botón para abrir el modal y generar boletas */}
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
                                    <option value="Tarjeta">Tarjeta</option>
                                    <option value="Transferencia">Transferencia</option>
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
                        <th>DNI</th>
                        <th>Espacio</th>
                        <th>Fecha</th>
                        <th>Método</th>
                        <th>Monto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {BoletasCombinados.map((dato, index) => (
                        <tr key={`${dato.codigoBoleta}-${dato.dni}-${dato.codigoespacio}-${index}`}>
                            <td>{dato.codigoBoleta}</td>
                            <td>{dato.dni}</td>
                            <td>{dato.codigoespacio}</td>
                            <td>{dato.fechaPago}</td>
                            <td>{dato.metodo}</td>
                            <td>{dato.montoPagar}</td>
                            <td className="actions">
                                <button className="btn-update" onClick={() => handleOpenModal(dato, dato.codigoBoleta)}>
                                    Actualizar
                                </button>
                                <button className="btn-generate" onClick={handleGenerateTablePDF}>
                                    Generar PDF
                                </button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    );
}

export default Servicios;
