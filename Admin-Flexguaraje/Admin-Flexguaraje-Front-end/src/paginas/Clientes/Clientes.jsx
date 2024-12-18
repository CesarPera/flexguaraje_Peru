import React, { useState } from 'react';
import './Clientes.css';
import { useNavigate } from 'react-router-dom'; // Usar react-router para redirección
import ClientesBD from './BASE DE DATOS/ClientesBD';

function Clientes() {
    // variablessssssssssssssssssssssss de formulario
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    // variablessssssssssssssss de crear cliente
    const [nuevoCliente, setNuevoCliente] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        nota: '',
    });
    // variables para buscar el cliente por nombre completo y DNI
    const [busqueda, setBusqueda] = useState('');
    const [tipoBusqueda, setTipoBusqueda] = useState('dni');
    const navigate = useNavigate();  // Para redirigir a otra página

    // funcion para poder agregar un nuevo cliente
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoCliente({ ...nuevoCliente, [name]: value });
    };

    const handleAñadirCliente = () => {
        if (!nuevoCliente.dni || !nuevoCliente.nombre || !nuevoCliente.apellido || !nuevoCliente.telefono || !nuevoCliente.email) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        const clienteConNotaPredeterminada = {
            ...nuevoCliente,
            nota: nuevoCliente.nota.trim() === '' ? 'sin discapacidad' : nuevoCliente.nota,
        };

        ClientesBD.crearCliente(clienteConNotaPredeterminada)
            .then((response) => {
                alert('Cliente creado exitosamente.');
                setMostrarFormulario(false);
                setNuevoCliente({
                    dni: '',
                    nombre: '',
                    apellido: '',
                    telefono: '',
                    email: '',
                    nota: '',
                });
                console.log('Respuesta:', response.data);
            })
            .catch((error) => {
                console.error('Error al crear cliente:', error);
                alert('Hubo un error al crear el cliente. Por favor, intenta nuevamente.');
            });
    };

    // funcion para poder buscar al cliente por nombre completo o DNI
    const handleBuscarCliente = () => {
        if (!busqueda) {
            alert('Por favor, ingresa un DNI o un nombre para la búsqueda.');
            return;
        }

        // Realizar la búsqueda usando la clase ClientesBD
        ClientesBD.buscarCliente(tipoBusqueda, busqueda)
            .then((response) => {
                const cliente = response.data;
                // Pasar los datos del cliente a la página de SolicitudesClientes
                navigate('/solicitudesclientes', { state: { cliente } });
            })
            .catch((error) => {
                console.error('Error al buscar cliente:', error);
                alert('No se encontró el cliente.');
            });
    };

    return (
        <div className="clientes-page">
            <h2>Buscar y/o Agregar Clientes</h2>

            <div className="formulario-busqueda">
                <select
                    value={tipoBusqueda}
                    onChange={(e) => setTipoBusqueda(e.target.value)}>
                    <option value="dni">DNI</option>
                    <option value="nombre">Nombre Completo</option>
                </select>
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder={tipoBusqueda === 'dni' ? 'Ingrese el DNI' : 'Ingrese el Nombre Completo'} />
                <button className="boton-buscar" onClick={handleBuscarCliente}>Buscar</button>
            </div>

            <button
                className="boton-abrir-formulario"
                onClick={() => setMostrarFormulario(true)}>
                Añadir Cliente
            </button>

            {mostrarFormulario && (
                <div className="formulario-flotante">
                    <div className="formulario-contenido">
                        <h3 className="text-center">Añadir Nuevo Cliente:</h3>
                        <div className="formulario-campos">
                            <label>DNI:</label>
                            <input
                                type="text"
                                name="dni"
                                value={nuevoCliente.dni}
                                onChange={handleChange}
                                required
                            />
                            <label>Nombres:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nuevoCliente.nombre}
                                onChange={handleChange}
                                required
                            />
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                name="apellido"
                                value={nuevoCliente.apellido}
                                onChange={handleChange}
                                required
                            />
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                name="telefono"
                                value={nuevoCliente.telefono}
                                onChange={handleChange}
                                required
                            />
                            <label>Correo Electrónico:</label>
                            <input
                                type="email"
                                name="email"
                                value={nuevoCliente.email}
                                onChange={handleChange}
                                required
                            />
                            <label>Notas Extras:</label>
                            <textarea
                                name="nota"
                                value={nuevoCliente.nota}
                                onChange={handleChange}
                                placeholder="Agregar notas adicionales sobre el cliente (opcional)."
                                rows="3"
                            />
                        </div>

                        <div className="formulario-botones">
                            <button className="annadir" onClick={handleAñadirCliente}>
                                Añadir
                            </button>
                            <button className="cancelar" onClick={() => setMostrarFormulario(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Clientes;
