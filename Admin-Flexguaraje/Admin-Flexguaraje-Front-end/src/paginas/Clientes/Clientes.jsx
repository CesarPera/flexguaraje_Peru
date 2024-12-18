import React, { useState } from 'react';
import './Clientes.css';
import { useNavigate } from 'react-router-dom'; // Usar react-router para redirección
import ClientesBD from './BASE DE DATOS/ClientesBD';

function Clientes() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [tipoBusqueda, setTipoBusqueda] = useState('dni');
    const navigate = useNavigate(); // hook para redirigir

    const handleBuscar = () => {
        if (!busqueda) {
            alert("Por favor ingresa un DNI o nombre completo para buscar.");
            return;
        }

        const buscarCliente = tipoBusqueda === 'dni'
            ? ClientesBD.buscarPorDni(busqueda)
            : ClientesBD.buscarPorNombreCompleto(busqueda.split(' ')[0], busqueda.split(' ')[1]);

        buscarCliente
            .then((clientes) => {
                console.log('Clientes encontrados:', clientes); // Verificar los datos recibidos

                navigate('/solicitudesclientes', {
                    state: {
                        busqueda: busqueda,
                        tipoBusqueda: tipoBusqueda,
                        clientes: datosClientes // Aquí debes asegurar que 'datosClientes' es un array de clientes
                    }
                });
            })
            .catch((error) => {
                alert("Error al realizar la búsqueda. Intenta de nuevo.");
            });
    };


    return (
        <div className="clientes-page">
            <h2>Buscar y/o Agregar Clientes</h2>

            <div className="formulario-busqueda">
                <select
                    onChange={(e) => setTipoBusqueda(e.target.value)}
                    value={tipoBusqueda}
                >
                    <option value="dni">DNI</option>
                    <option value="nombre">Nombre Completo</option>
                </select>
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="boton-buscar" onClick={handleBuscar}>
                    Buscar
                </button>
            </div>

            <button
                className="boton-abrir-formulario"
                onClick={() => setMostrarFormulario(true)}
            >
                Añadir Cliente
            </button>

            {mostrarFormulario && (
                <div className="formulario-flotante">
                    <div className="formulario-contenido">
                        <h3 className="text-center">Añadir Nuevo Cliente:</h3>
                        <div className="formulario-campos">
                            <label>Nombres:</label>
                            <input type="text" required />
                            <label>Apellidos:</label>
                            <input type="text" required />
                            <label>DNI:</label>
                            <input type="text" required />
                            <label>Teléfono:</label>
                            <input type="text" required />
                            <label>Correo Electrónico:</label>
                            <input type="email" required />
                            <label>Notas Extras:</label>
                            <textarea placeholder="Agregar notas adicionales sobre el cliente (opcional)." rows="3" />
                        </div>

                        <div className="formulario-botones">
                            <button className="annadir">Añadir</button>
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
