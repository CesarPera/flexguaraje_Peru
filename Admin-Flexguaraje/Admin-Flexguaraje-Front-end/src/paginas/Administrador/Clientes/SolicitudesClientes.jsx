import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SolicitudesClientes.css';
import ClientesBD from './BASE DE DATOS/ClientesBD';
import Swal from 'sweetalert2';
// hasta aqui nomas
function SolicitudesClientes() {
    const location = useLocation();
    const navigate = useNavigate(); // Inicializa el hook useNavigate
    const { cliente } = location.state || {};
    const [clienteActualizado, setClienteActualizado] = useState(cliente); // Inicializa con los datos actuales del cliente
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarFormularioACT, setMostrarFormularioACT] = useState(false);
    const [mostrarFormularioRESPUESTA, setMostrarFormularioRESPUESTA] = useState(false);
    const [mostrarFormularioCOMPLETO, setMostrarFormularioCOMPLETO] = useState(false);


    if (!cliente) {
        return <div className='solicitud-page'>
            <h2>No se encontraron datos del cliente.</h2>
        </div>;
    }

    /* Estado para el formulario modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        // Solo si ya tenemos un cliente, hacemos la consulta
        if (clienteActualizado?.dni) {
            const obtenerDatosCliente = async () => {
                try {
                    const response = await ClientesBD.buscarCliente('dni', clienteActualizado.dni);
                    setClienteActualizado(response.data);
                } catch (error) {
                    console.error('Error al obtener los datos del cliente', error);
                }
            };
            obtenerDatosCliente();
        }
    }, [clienteActualizado?.dni]); // Este hook se ejecuta cuando el clienteActualizado cambia

    /* Estado para los datos del formulario */
    const [formData, setFormData] = useState({
        dni: cliente.dni,
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
        setFormData(prevState => {
            const updatedData = {
                ...prevState,
                [name]: value,
            };
            // Comprobar si el valor del campo ha cambiado con respecto al cliente original
            if (updatedData[name] !== cliente[name]) {
                setIsUpdated(true); // Si hay un cambio, marcar que se actualizó
            }
            return updatedData;
        });
    };

    const actualizarinfocliente = async () => {


        const formulariovacio = `${formData.nombre || ''} ${formData.apellido_paterno || ''} 
        ${formData.apellido_materno || ''} ${formData.telefono || ''} ${formData.email || ''} 
        ${formData.direccion || ''} ${formData.nota || ''}`;

        if (!formulariovacio.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Formulario Vacío',
                text: 'El formulario no puede estar vacío, por favor rellene los datos.',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        if (!isUpdated) {
            Swal.fire({
                icon: 'info',
                title: 'No se han realizado cambios',
                text: 'No has realizado ninguna actualización en los datos.',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        const errores = [];

        if (!formData.nombre.trim()) {
            errores.push('El Nombre no puede ir vacío.');
        } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/.test(formData.nombre.trim())) {
            errores.push('El Nombre solo debe contener letras.');
        }

        if (!formData.apellido_paterno.trim()) {
            errores.push('El Apellido Paterno no puede ir vacío.');
        } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$/.test(formData.apellido_paterno.trim())) {
            errores.push('El Apellido Paterno solo debe contener letras y una palabra.');
        }

        if (!formData.apellido_materno.trim()) {
            errores.push('El Apellido Materno no puede ir vacío.');
        } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$/.test(formData.apellido_materno.trim())) {
            errores.push('El Apellido Materno solo debe contener letras y una palabra.');
        }

        if (!formData.telefono.trim()) {
            errores.push('El Teléfono no puede ir vacío.');
        } else if (!/^\d{9}$/.test(formData.telefono.trim())) {
            errores.push('El Teléfono debe tener exactamente 9 caracteres numéricos.');
        }

        if (!formData.email.trim()) {
            errores.push('El Correo Electrónico no puede ir vacío.');
        } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
            // Cambié la expresión regular para aceptar cualquier dominio válido (no solo .com y .pe)
            errores.push('El Correo Electrónico debe ser válido (ejemplo@dominio.com).');
        }

        if (!formData.direccion.trim()) {
            errores.push('La Dirección no puede ir vacía.');
        }

        if (!formData.nota.trim()) {
            errores.push('La Nota no puede ir vacía.');
        } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s,.-]+$/.test(formData.nota.trim())) {
            errores.push('La Nota solo puede contener letras, espacios, comas, guiones y puntos.');
        }

        if (errores.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Errores en el formulario',
                html: errores.map(error => `<p>${error}</p>`).join(''),
                showConfirmButton: true,
            });
            return; // Detener la ejecución si hay errores
        }

        const updatedData = {
            dni: formData.dni, // Aquí te aseguras de que el DNI se incluya correctamente
            nombre: formData.nombre,
            apellido_paterno: formData.apellido_paterno,
            apellido_materno: formData.apellido_materno,
            telefono: formData.telefono,
            email: formData.email,
            direccion: formData.direccion,
            nota: formData.nota
        };

        try {
            await ClientesBD.actualizarCliente(updatedData);
            const response = await ClientesBD.buscarCliente('dni', formData.dni); // Usar 'dni' como tipo de búsqueda
            setClienteActualizado(response.data);
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

    // Manejar el botón de volver
    const handleVolver = () => {
        navigate('/clientes'); // Redirige a la ruta "/cliente"
    };

    // Manejar el cancelado y restaurar el formulario
    const handleCancelar = () => {
        setFormData({
            dni: cliente.dni,
            nombre: cliente.nombre,
            apellido_paterno: cliente.apellidoPaterno,
            apellido_materno: cliente.apellidoMaterno,
            telefono: cliente.telefono,
            email: cliente.email,
            direccion: cliente.direccion,
            nota: cliente.notaAdicional
        });
        closeModal(); // Cierra el modal al cancelar
    };

    return (
        <div className="solicitud-page">
            <div className='informacion-cliente'>
                <h2 className='title-solicitud'>Información del cliente</h2>
                <div className='contenido-cliente'>
                    <div className='info-cliente row'>
                        <div className='info-dni'>
                            <h3>DNI</h3>
                            <p>{clienteActualizado.dni}</p> {/* Mostramos el DNI automáticamente */}
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

                    <div className='btn-acciones-infocliente'>
                        <button className='btn btn-primary btn-act-cliente' onClick={openModal}>Actualizar</button>

                        {isModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2 className="text-center">ACTUALIZAR INFORMACION DEL CLIENTE</h2>
                                    <div className="formulario-campos">
                                        <label>DNI:</label>
                                        <input type="text" name="dni" value={formData.dni} disabled />
                                        <label>Nombre:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                        <label>Apellido Paterno:</label>
                                        <input
                                            type="text"
                                            name="apellido_paterno"
                                            value={formData.apellido_paterno}
                                            onChange={handleChange}
                                        />
                                        <label>Apellido Materno:</label>
                                        <input
                                            type="text"
                                            name="apellido_materno"
                                            value={formData.apellido_materno}
                                            onChange={handleChange}
                                        />
                                        <label>Teléfono:</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                        />
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <label>Dirección:</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            value={formData.direccion}
                                            onChange={handleChange}
                                        />
                                        <label>Notas:</label>
                                        <input
                                            type="text"
                                            name="nota"
                                            value={formData.nota}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="formulario-botones">
                                        <button type="button" className="btn btn-primary" onClick={actualizarinfocliente}>
                                            Actualizar
                                        </button>
                                        <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            className="btn btn-secondary btn-act-cliente"
                            onClick={handleVolver}>
                            Volver
                        </button>

                    </div>
                </div>
            </div>

            <div className="solicitud-cliente">
                <div className='button-acciones-permisos'>
                    <button className='btn btn-success' onClick={() => setMostrarFormulario(true)}>Crear Solicitud</button>

                    {mostrarFormulario && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h3 className="text-center">CREAR NUEVA SOLICITUD</h3>
                                <div className="formulario-campos">
                                    <label>Tipo Solicitud:</label>
                                    <select>
                                        <option value="">Sin seleccionar</option>
                                        <option value="">Consulta</option>
                                        <option value="">Problema</option>
                                        <option value="">Reclamo</option>
                                    </select>
                                    <label>Categoria:</label>
                                    <select>
                                        <option value="">Sin seleccionar</option>
                                        <option value="">Espacio</option>
                                        <option value="">Cliente</option>
                                        <option value="">Alquiler</option>
                                        <option value="">Boleta</option>
                                    </select>
                                    <label>Descripción:</label>
                                    <input
                                        type="text"
                                        name="apellido_paterno"
                                        required
                                    />
                                    <label>Prioridad:</label>
                                    <select>
                                        <option value="">Sin seleccionar</option>
                                        <option value="">Baja</option>
                                        <option value="">Media</option>
                                        <option value="">Alta</option>
                                    </select>
                                    <label>Estado:</label>
                                    <select>
                                        <option value="">Sin seleccionar</option>
                                        <option value="">Cancelado</option>
                                        <option value="">Pendiente</option>
                                        <option value="">Cerrado</option>
                                    </select>
                                    <label>Sub estado:</label>
                                    <select>
                                        <option value="">Sin seleccionar</option>
                                        <option value="">Acogido</option>
                                        <option value="">No_acogido</option>
                                    </select>
                                </div>

                                <div className="formulario-botones">
                                    <button className="btn btn-success">Crear</button>
                                    <button className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <table className='table table-primary table-hover table-bordered border-primary text-center tabla-espacios'>
                    <thead>
                        <tr>
                            <th>codigo Solicitud</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Prioridad</th>
                            <th>Estado</th>
                            <th>Sub estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <button className='btn-codigo' onClick={() => setMostrarFormularioCOMPLETO(true)}>SLT-12345678901</button>

                                {mostrarFormularioCOMPLETO && (
                                    <div className="modal-overlay">
                                        <div className="modal-content-completo">
                                            <div className='titulo-completo-modal'>
                                                <h3 className="text-center">INFORMACIÓN COMPLETO DE LA SOLICITUD</h3>

                                            </div>

                                            <div className="formulario-campos-completo">
                                                <div>
                                                    <div className='campos-datos'>
                                                        <label>Codigo Solicitud:</label>
                                                        <input
                                                            type="text"
                                                            name="apellido_paterno"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className='campos-datos'>
                                                        <label>Tipo:</label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className='campos-datos'>
                                                        <label>Categoria:</label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className='campos-datos'>
                                                        <label>Prioridad:</label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='campos-datos'>
                                                        <label>Fecha Solicitud:</label>
                                                        <input
                                                            type="text"
                                                            name="apellido_paterno"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className='campos-datos'>
                                                        <label>Descripción:</label>
                                                        <input
                                                            type="text"
                                                            name="apellido_paterno"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='campos-datos'>
                                                        <label>Fecha Respuesta:</label>
                                                        <input
                                                            type="text"
                                                            name="apellido_paterno"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className='campos-datos'>
                                                        <label>Respuesta:</label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                                <div >
                                                    <div className='campos-datos'>
                                                        <label>Estado:</label>
                                                        <input
                                                            type="text"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className='campos-datos'>
                                                        <label>Sub estado:</label>
                                                        <input
                                                            type="text"
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
                            </td>
                            <td>12/02/2025</td>
                            <td>Consulta</td>
                            <td>Alquiler</td>
                            <td>Baja</td>
                            <td>Cerrado</td>
                            <td>Acogido</td>
                            <td className='tabla-acciones-permisos'>
                                <button className='btn btn-primary' onClick={() => setMostrarFormularioACT(true)}>Actualizar</button>

                                {mostrarFormularioACT && (
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <h3 className="text-center">ACTUALIZAR SOLICITUD</h3>
                                            <div className="formulario-campos">
                                                <label>Descripción:</label>
                                                <input
                                                    type="text"
                                                    name="apellido_paterno"
                                                    required
                                                />
                                                <label>Prioridad:</label>
                                                <select>
                                                    <option value="">Sin seleccionar</option>
                                                    <option value="">Baja</option>
                                                    <option value="">Media</option>
                                                    <option value="">Alta</option>
                                                </select>
                                                <label>Estado:</label>
                                                <select>
                                                    <option value="">Sin seleccionar</option>
                                                    <option value="">Cancelado</option>
                                                    <option value="">Pendiente</option>
                                                    <option value="">Cerrado</option>
                                                </select>
                                                <label>Sub estado:</label>
                                                <select>
                                                    <option value="">Sin seleccionar</option>
                                                    <option value="">Acogido</option>
                                                    <option value="">No_acogido</option>
                                                </select>
                                            </div>

                                            <div className="formulario-botones">
                                                <button className="btn btn-primary">Actualizar</button>
                                                <button className="btn btn-secondary" onClick={() => setMostrarFormularioACT(false)}>Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <button className='btn btn-success' onClick={() => setMostrarFormularioRESPUESTA(true)}>Responder</button>

                                {mostrarFormularioRESPUESTA && (
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <h3 className="text-center">RESPONDER SOLICITUD</h3>
                                            <div className="formulario-campos">
                                                <label>Respuesta:</label>
                                                <input
                                                    type="text"
                                                    name="apellido_paterno"
                                                    required
                                                />
                                            </div>

                                            <div className="formulario-botones">
                                                <button className="btn btn-success">Responder</button>
                                                <button className="btn btn-secondary" onClick={() => setMostrarFormularioRESPUESTA(false)}>Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SolicitudesClientes;
