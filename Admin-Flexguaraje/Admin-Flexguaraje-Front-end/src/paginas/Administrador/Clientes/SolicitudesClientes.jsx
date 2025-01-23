import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SolicitudesClientes.css';
import ClientesBD from './BASE DE DATOS/ClientesBD';
import Swal from 'sweetalert2';

function SolicitudesClientes() {
    const location = useLocation();
    const { cliente } = location.state || {};
    const [clienteActualizado, setClienteActualizado] = useState(cliente);

    if (!cliente) {
        return <div className='solicitud-page'>
            <h2>No se encontraron datos del cliente.</h2>
        </div>;
    }

    /* Estado para manejar el DNI */
    const [dni, setDni] = useState(cliente.dni);

    /* Estado para el formulario modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    /* Estado para los datos del formulario */
    const [formData, setFormData] = useState({
        nombre: cliente.nombre,
        apellido_paterno: cliente.apellidoPaterno,
        apellido_materno: cliente.apellidoMaterno,
        telefono: cliente.telefono,
        email: cliente.email,
        direccion: cliente.direccion,
        nota: cliente.notaAdicional
    });

    /* Manejar cambios en los campos del formulario */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    /* Manejar el submit del formulario */
    const handleSubmit = async () => {
        try {
            const updatedData = { dni: cliente.dni, ...formData }; // Incluye el DNI
            const response = await ClientesBD.actualizarCliente(updatedData);
            const clienteActualizadoBD = response.data; // Datos actualizados desde el backend
            setClienteActualizado(clienteActualizadoBD);
            localStorage.setItem('clienteActualizado', JSON.stringify(clienteActualizadoBD));
            Swal.fire({
                icon: 'success',
                title: 'Cliente actualizado exitosamente',
                showConfirmButton: false,
                timer: 3000,
            });
            closeModal(); // Cierra el modal después de actualizar
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el cliente',
                text: error.response?.data || 'Error inesperado',
            });
        }
    };

    /* Usar el efecto para actualizar el DNI automáticamente cuando el cliente se selecciona */
    useEffect(() => {
        if (cliente) {
            setDni(cliente.dni); // Capturamos el DNI automáticamente
        }
    }, [cliente]);

    useEffect(() => {
        const clienteGuardado = localStorage.getItem('clienteActualizado');
        if (clienteGuardado) {
            setClienteActualizado(JSON.parse(clienteGuardado)); // Carga el cliente actualizado desde localStorage
        }
    }, []);

    return (
        <div className="solicitud-page">
            <div className='informacion-cliente'>
                <h2 className='title-solicitud'>Información del cliente</h2>
                <div className='contenido-cliente'>
                    <div className='info-cliente row'>
                        <div className='info-dni'>
                            <h3>DNI</h3>
                            <p>{dni}</p> {/* Mostramos el DNI automáticamente */}
                        </div>
                        <div className='info-nombre-completo'>
                            <h3>Nombre Completo</h3>
                            <p>{`${clienteActualizado.nombre} ${clienteActualizado.apellidoPaterno} ${clienteActualizado.apellidoMaterno}`}</p>
                        </div>
                        <div className='info-telefono'>
                            <h3>Telefono</h3>
                            <p>{clienteActualizado.telefono}</p>
                        </div>
                        <div className='info-email'>
                            <h3>Email</h3>
                            <p>{clienteActualizado.email}</p>
                        </div>
                        <div className='info-direccion'>
                            <h3>Dirección</h3>
                            <p>{clienteActualizado.direccion}</p>
                        </div>
                        <div className='info-notas'>
                            <h3>Notas</h3>
                            <p>{clienteActualizado.notaAdicional}</p>
                        </div>
                    </div>

                    <div>
                        <button className='btn btn-primary btn-act-cliente' onClick={openModal}>Actualizar</button>
                    </div>

                    {isModalOpen && (
                        <div className='modal-overlay'>
                            <div className='modal-content'>
                                <h2 className='text-center'>Actualizar Información del Cliente</h2>
                                <div className='formulario-campos'>
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                                    <label>Apellido Paterno:</label>
                                    <input type="text" name="apellido_paterno"
                                        value={formData.apellido_paterno}
                                        onChange={handleChange} />
                                    <label>Apellido Materno:</label>
                                    <input type="text" name="apellido_materno"
                                        value={formData.apellido_materno}
                                        onChange={handleChange} />
                                    <label>Teléfono:</label>
                                    <input type="text" name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange} />
                                    <label>Email:</label>
                                    <input type="email" name="email"
                                        value={formData.email}
                                        onChange={handleChange} />
                                    <label>Dirección:</label>
                                    <input type="text" name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange} />
                                    <label>Notas:</label>
                                    <input type='text' name="nota"
                                        value={formData.nota}
                                        onChange={handleChange} />
                                </div>

                                <div className='formulario-botones'>
                                    <button type="button" className='btn btn-primary' onClick={handleSubmit}>Actualizar</button>
                                    <button type='button' className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SolicitudesClientes;
