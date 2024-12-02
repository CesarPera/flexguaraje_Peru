import React, { useState } from 'react';
import './Espacios.css';

function Espacios() {
    // Datos iniciales con 20 espacios disponibles
    const [datos, setDatos] = useState(
        Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            codigo: `E${index + 1}`,
            dni: '',
            nombre: '',
            contacto: '',
            inicio: '',
            final: '',
            estado: 'DISPONIBLE',
        }))
    );

    // Estado para el filtro de estado
    const [filtroEstado, setFiltroEstado] = useState(''); // Vacío para mostrar todos los estados

    // Estado del modal
    const [showModal, setShowModal] = useState(false);

    // Estado para el nuevo espacio
    const [nuevoEspacio, setNuevoEspacio] = useState({
        dni: '',
        nombre: '',
        contacto: '',
        inicio: '',
        final: '',
        espacio: '',
        estado: 'DISPONIBLE',
    });

    // Espacios disponibles para seleccionar
    const espaciosDisponibles = datos.filter((dato) => dato.estado === 'DISPONIBLE');

    // Función para manejar la apertura/cierre del modal
    const handleModalToggle = () => setShowModal(!showModal);

    // Función para manejar los cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoEspacio({ ...nuevoEspacio, [name]: value });
    };

    // Función para agregar un nuevo espacio
    const agregarEspacio = () => {
        const nuevoDato = {
            ...nuevoEspacio,
            id: datos.length + 1,
            codigo: nuevoEspacio.espacio, // Código del espacio seleccionado
            estado: 'OCUPADO', // Marcar el espacio como ocupado
        };

        // Actualizar los datos y cerrar el modal
        setDatos((prevDatos) =>
            prevDatos.map((dato) =>
                dato.codigo === nuevoEspacio.espacio
                    ? { ...dato, ...nuevoDato } // Actualizar los datos del espacio seleccionado
                    : dato
            )
        );
        setShowModal(false); // Cerrar el modal
        setNuevoEspacio({ dni: '', nombre: '', contacto: '', inicio: '', final: '', espacio: '', estado: 'DISPONIBLE' }); // Limpiar el formulario
    };

    // Filtrar los datos según el estado
    const datosFiltrados = filtroEstado
        ? datos.filter(dato => dato.estado === filtroEstado)
        : datos;

    return (
        <div className="espacios-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="title-espacios">Espacios de Almacenamiento</h2>

                {/* Filtro de estado */}
                <div className="filtro-container">
                    <label htmlFor="filtroEstado" className="form-label">Filtrar por estado</label>
                    <select
                        id="filtroEstado"
                        className="form-select"
                        aria-label="Seleccionar estado para filtrar"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="">TODOS</option>
                        <option value="DISPONIBLE">DISPONIBLE</option>
                        <option value="OCUPADO">OCUPADO</option>
                        <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                    </select>
                </div>
            </div>

            <div className='btn-acciones'>
                <button className="btn-agregar" onClick={handleModalToggle}>
                    Agregar
                </button>

                {/* Modal */}
                {showModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h3 className='text-center'>AGREGAR ESPACIO</h3>
                            <form>
                                <div>
                                    <label>DNI:</label>
                                    <input
                                        type="text"
                                        name="dni"
                                        value={nuevoEspacio.dni}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Nombre y Apellido:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={nuevoEspacio.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Contacto:</label>
                                    <input
                                        type="text"
                                        name="contacto"
                                        value={nuevoEspacio.contacto}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Inicio:</label>
                                    <input
                                        type="date"
                                        name="inicio"
                                        value={nuevoEspacio.inicio}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Final:</label>
                                    <input
                                        type="date"
                                        name="final"
                                        value={nuevoEspacio.final}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Espacio Disponible:</label>
                                    <select className='select-espacios'
                                        name="espacio"
                                        value={nuevoEspacio.espacio}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        {espaciosDisponibles.map((espacio) => (
                                            <option key={espacio.codigo} value={espacio.codigo}>
                                                {espacio.codigo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                            <div className='mobal-btn'>
                                <button className="btn btn-success" onClick={agregarEspacio}>
                                    Guardar
                                </button>
                                <button className="btn btn-secondary" onClick={handleModalToggle}>
                                    Cancelar
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                <button className='btn-actualizar'>Actualizar</button>
                <button className='btn-eliminar'>Eliminar</button>
            </div>

            <table className="table table-primary table-hover table-bordered border-primary text-center tabla-espacios">
                <thead>
                    <tr>
                        <th scope="col" className="espacios-n">Codigo</th>
                        <th scope="col" className="espacios-dni">DNI</th>
                        <th scope="col" className="espacios-na">Nombre y Apellido</th>
                        <th scope="col" className="espacios-na">Contacto</th>
                        <th scope="col" className="espacios-t">Inicio</th>
                        <th scope="col" className="espacios-t">Final</th>
                        <th scope="col" className="espacios-e">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.map((dato) => (
                        <tr key={dato.id}>
                            <th scope="row">{dato.codigo}</th>
                            <td>{dato.dni}</td>
                            <td>{dato.nombre}</td>
                            <td>{dato.contacto}</td>
                            <td>{dato.inicio}</td>
                            <td>{dato.final}</td>
                            <td>{dato.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Espacios;
