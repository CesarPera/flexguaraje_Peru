import React, { useState } from 'react';
import './Servicios.css';




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
    const [editingBoletaIndex, setEditingBoletaIndex] = useState(null);
    const [boletas, setBoletas] = useState([]);

    // Obtener la fecha actual en formato YYYY-MM-DD
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

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
                fechaPago: getCurrentDate(), // Establece la fecha actual
                espacioAdquirido: '',
            });
            setEditingBoletaIndex(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBoletaIndex(null);
    };

    const handleSaveBoleta = () => {
        const { DNI, codigoBoleta, metodoPago, costo, fechaPago, espacioAdquirido } = formData;

        if (
            !DNI.trim() ||
            !codigoBoleta.trim() ||
            !metodoPago.trim() ||
            !costo ||
            !fechaPago.trim() ||
            !espacioAdquirido.trim()
        ) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (editingBoletaIndex !== null) {
            setBoletas((prevBoletas) =>
                prevBoletas.map((boleta, index) =>
                    index === editingBoletaIndex ? { ...formData } : boleta
                )
            );
            alert(`La boleta ha sido actualizada.`);
        } else {
            setBoletas([...boletas, { ...formData }]);
            alert(`La boleta ha sido guardada exitosamente.`);
        }
        handleCloseModal();
    };

    const handleDeleteBoleta = (index) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta boleta?')) {
            setBoletas((prevBoletas) => prevBoletas.filter((_, i) => i !== index));
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
                    <div className={`modal-content ${editingBoletaIndex !== null ? 'edit-mode' : 'add-mode'}`}>
                        <h3>{editingBoletaIndex !== null ? 'Editar Boleta' : 'Datos del Cliente'}</h3>
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

                            <label>Espacio Adquirido:</label>
                            <input
                                type="text"
                                name="espacioAdquirido"
                                value={formData.espacioAdquirido}
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
                                <option value="">Seleccione</option>
                                <option value="efectivo">Efectivo</option>
                            </select>

                            <label>Monto de Pago:</label>
                            <input
                                type="number"
                                name="costo"
                                value={formData.costo}
                                onChange={handleInputChange}
                            />

                            <div className="modal-actions">
                                <button type="button" onClick={handleSaveBoleta}>
                                    {editingBoletaIndex !== null ? 'Actualizar' : 'Guardar'}
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
                                <td className="highlight-column">Código de Boleta</td>
                                <td>{boleta.codigoBoleta}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">DNI</td>
                                <td>{boleta.DNI}</td>
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
                                <td className="highlight-column">Método de Pago</td>
                                <td>{boleta.metodoPago}</td>
                            </tr>
                            <tr>
                                <td className="highlight-column">Espacio Adquirido</td>
                                <td>{boleta.espacioAdquirido}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="table-actions">
                <button className="btn-update" onClick={() => handleOpenModal()}>
                    Actualizar
                </button>
                <button
                    className="btn-delete"
                    onClick={() => {
                        const index = prompt('Ingrese el índice de la boleta a eliminar:');
                        if (index !== null && !isNaN(index)) handleDeleteBoleta(Number(index));
                    }}
                >
                    Eliminar
                </button>
                <button className="btn-generate" onClick={handleGenerateTablePDF}>
                    Generar PDF
                </button>
            </div>
        </div>

  )}

            {/* Tabla de servicios */}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio) => (
                        <tr key={servicio.codigoServicio}>
                            <td>{servicio.nombre}</td>
                            <td>{servicio.descripcion}</td>
                            <td>{servicio.precio}</td>
                            <td>
                                <button onClick={() => setShowUpdateModal(true)}>Actualizar</button>
                                <button onClick={() => setShowDeleteModal(true)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de actualización */}
            {showUpdateModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>ACTUALIZAR SERVICIO</h3>
                        <form>
                            <div>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={nuevoServicio.nombre}
                                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Descripción:</label>
                                <input
                                    type="text"
                                    name="descripcion"
                                    value={nuevoServicio.descripcion}
                                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={nuevoServicio.precio}
                                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })}
                                    required
                                />
                            </div>
                        </form>
                        <div className="modal-btn">
                            <button className="btn btn-success" onClick={actualizarServicio}>Actualizar</button>
                            <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de eliminación */}
            {showDeleteModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>ELIMINAR SERVICIO</h3>
                        <div>
                            <label>Seleccionar Servicio:</label>
                            <select
                                value={codigoEliminar}
                                onChange={(e) => setCodigoEliminar(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar</option>
                                {servicios.map((servicio) => (
                                    <option key={servicio.codigoServicio} value={servicio.codigoServicio}>
                                        {servicio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-btn">
                            <button className="btn btn-danger" onClick={eliminarServicio}>Eliminar</button>
                            <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

export default Servicios;
