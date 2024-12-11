// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Espacios.css';
import EspacioBD from './BASE_DE_DATOS/EspacioBD';
import AlquileresBD from './BASE_DE_DATOS/AlquileresBD';

function Espacios() {
    // ===========================================
    //  variables generales
    // ===========================================
    const [Espacios, setEspacios] = useState([]);
    const [Alquileres, setAlquileres] = useState([]);
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [nuevoEspacio, setNuevoEspacio] = useState({
        dni: '',
        nombre: '',
        contacto: '',
        inicio: '',
        final: '',
        espacio: '',
        estado: 'Disponible',
    });
    const [codigoActualizar, setCodigoActualizar] = useState('');
    const [codigoEliminar, setCodigoEliminar] = useState('');
    const [accionSeleccionada, setAccionSeleccionada] = useState('');
    const [dniCliente, setDniCliente] = useState('');
    const [inicioAlquiler, setInicioAlquiler] = useState('');
    const [finAlquiler, setFinAlquiler] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');

    // ===========================================
    // variables del formulario Modal o Flotante
    // ===========================================
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleModalToggle = () => setShowModal(!showModal);
    const handleUpdateModalToggle = () => setShowUpdateModal(!showUpdateModal);
    const handleDeleteModalToggle = () => setShowDeleteModal(!showDeleteModal);

    // ===========================================
    // Funciones para cargar datos
    // ===========================================
    // para cargar la tabla espacio.
    const fetchEspacios = async () => {
        try {
            const response = await EspacioBD.getAllEspacios();
            setEspacios(response.data);
        } catch (error) {
            console.error("Error al cargar los espacios:", error);
        }
    };
    // para cargar la tabla alquiler
    const fetchAlquileres = async () => {
        try {
            const response = await AlquileresBD.getAllAlquileres();
            setAlquileres(response.data);
        } catch (error) {
            console.error("Error al cargar los alquileres:", error);
        }
    };
    // para cargar los dos juntos al mismo tiempo
    const espaciosCombinados = Espacios.map((espacio) => {
        const alquiler = Alquileres.find(
            (alquiler) => alquiler.espacio.idEspacio === espacio.idEspacio
        );
        return {
            ...espacio,
            dni: alquiler?.cliente.dni || '👻👻👻', // Datos del cliente
            nombreyapellido: alquiler
                ? `${alquiler.cliente.nombre} ${alquiler.cliente.apellido}`
                : '👻👻👻',
            telefono: alquiler?.cliente.telefono || '👻👻👻',
            fechaInicioAlquiler: alquiler?.fechaInicioAlquiler || '👻👻👻',
            fechaFinAlquiler: alquiler?.fechaFinAlquiler || '👻👻👻',
        };
    });
    // para que se pueda visualizar los datos de los dos.
    useEffect(() => {
        fetchEspacios();
        fetchAlquileres();
    }, []);

    // para que se pueda visualizar datos en actualizar
    useEffect(() => {
        if (codigoActualizar && accionSeleccionada === 'Actualizar_alquiler') {
            const alquiler = Alquileres.find((alquiler) => alquiler.codigoEspacio === codigoActualizar);
            console.log("Datos del alquiler encontrado:", alquiler);

            if (alquiler) {
                setDniCliente(alquiler.cliente.dni);
                setInicioAlquiler(alquiler.fechaInicioAlquiler);
                setFinAlquiler(alquiler.fechaFinAlquiler);
            } else {
                console.warn("No se encontró un alquiler con el código:", codigoActualizar);
                setDniCliente('');
                setInicioAlquiler('');
                setFinAlquiler('');
            }
        }
    }, [codigoActualizar, accionSeleccionada, Alquileres]);

    // ===========================================
    // funciones para agregar, actualizar y eliminar.
    // ===========================================
    // agregar alquiler
    const espaciosDisponibles = Espacios.filter((dato) => dato.estado === 'Disponible');

    const agregarAlquiler = async () => {
        const alquiler = {
            dni: nuevoEspacio.dni,
            codigoEspacio: nuevoEspacio.espacio,
            fechaInicio: nuevoEspacio.inicio,
            fechaFin: nuevoEspacio.final
        };

        try {
            setEspacios((prevDatos) =>
                prevDatos.map((dato) =>
                    dato.codigoEspacio === nuevoEspacio.espacio
                        ? { ...dato, estado: 'Ocupado' }
                        : dato
                )
            );

            const response = await AlquileresBD.agregarAlquiler(alquiler);
            console.log("Respuesta del servidor:", response.data);

            setAlquileres((prevAlquileres) => [
                ...prevAlquileres,
                response.data
            ]);

            setShowModal(false);
            setNuevoEspacio({
                dni: '',
                nombre: '',
                contacto: '',
                inicio: '',
                final: '',
                espacio: '',
                estado: 'Disponible',
            });
        } catch (error) {
            console.error("Error al agregar el alquiler:", error);
        }
    };

    // actualizar alquiler
    const actualizarAlquiler = async () => {
        if (!codigoActualizar || !dniCliente || !inicioAlquiler || !finAlquiler) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const alquilerActualizado = {
            dni: dniCliente,
            fechaInicio: inicioAlquiler,
            fechaFin: finAlquiler
        };

        try {
            const response = await AlquileresBD.actualizarAlquilerBD(codigoActualizar, alquilerActualizado);
            console.log("Alquiler actualizado:", response.data);

            setAlquileres((prevAlquileres) =>
                prevAlquileres.map((alquiler) =>
                    alquiler.codigoEspacio === codigoActualizar
                        ? { ...alquiler, ...alquilerActualizado }
                        : alquiler
                )
            );

            setEspacios((prevEspacios) =>
                prevEspacios.map((espacio) =>
                    espacio.codigoEspacio === codigoActualizar
                        ? { ...espacio, estado: 'Ocupado' }  // Puedes cambiar el estado si corresponde
                        : espacio
                )
            );

            setShowUpdateModal(false);
        } catch (error) {
            console.error("Error al actualizar el alquiler:", error);
            alert('Error al actualizar el alquiler.');
        }
    };

    // Actualizar Estado
    const espaciosActualizables = Espacios.filter(
        (dato) => dato.estado === 'Disponible' || dato.estado === 'Ocupado' || dato.estado === 'Mantenimiento'
    );

    const actualizarEstado = async () => {
        if (!codigoActualizar || !nuevoEstado) {
            alert('Por favor selecciona un espacio y un nuevo estado.');
            return;
        }

        try {
            const response = await AlquileresBD.actualizarEstadoEspacio(codigoActualizar, nuevoEstado);
            console.log("Estado actualizado:", response.data);

            setEspacios((prevDatos) =>
                prevDatos.map((dato) =>
                    dato.codigoEspacio === codigoActualizar ? { ...dato, estado: nuevoEstado } : dato
                )
            );

            setShowUpdateModal(false);
        } catch (error) {
            console.error("Error al actualizar el estado del espacio:", error);
            alert('Error al actualizar el estado del espacio.');
        }
    };

    const opcionesEstado = (estadoActual, codigoEspacio) => {
        const alquiler = Alquileres.find((alquiler) => alquiler.codigoEspacio === codigoEspacio);

        if (alquiler) {
            return estadoActual === 'Ocupado' ? ['Mantenimiento'] : ['Mantenimiento', 'Ocupado'];
        } else {
            return ['Disponible', 'Mantenimiento', 'Ocupado'];
        }
    };


    // Eliminar Alquiler
    const espaciosOcupados = Espacios.filter((dato) => dato.estado === 'Ocupado');

    const EliminarAlquiler = async () => {
        if (!codigoEliminar) {
            alert('Por favor selecciona un espacio para eliminar.');
            return;
        }

        console.log("Código seleccionado para eliminar:", codigoEliminar);

        const espacioEliminar = Espacios.find(espacio => espacio.codigoEspacio === codigoEliminar);

        if (espacioEliminar) {
            console.log("Espacio a eliminar:", espacioEliminar);

            setEspacios(prevEspacios =>
                prevEspacios.map(espacio =>
                    espacio.codigoEspacio === codigoEliminar
                        ? { ...espacio, estado: 'Disponible', dni: '', nombre: '', contacto: '', inicio: '', final: '' }
                        : espacio
                )
            );

            try {
                await AlquileresBD.eliminarAlquilerBD(codigoEliminar);
                console.log("Alquiler eliminado con éxito.");
            } catch (error) {
                console.error("Error al eliminar el alquiler:", error);
            }

            setShowDeleteModal(false);
            setCodigoEliminar('');
        } else {
            console.log("No se encontró el espacio con el código proporcionado.");
        }
    };

    // =========================
    // Funciones del filtro
    // =========================
    const espaciosFiltrados = filtroEstado
        ? espaciosCombinados.filter((espacio) => espacio.estado.toLowerCase() === filtroEstado.toLowerCase())
        : espaciosCombinados;
    const handleFiltroChange = (e) => setFiltroEstado(e.target.value);

    // =============================
    // Funciones para manejar cambios en el formulario
    // =============================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoEspacio({ ...nuevoEspacio, [name]: value });
    };

    return (
        <div className="espacios-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="title-espacios">Espacios de Almacenamiento</h2>
                <div className="filtro-container">
                    <label htmlFor="filtroEstado" className="form-label">Filtrar por estado</label>
                    <select
                        id="filtroEstado" className="form-select"
                        value={filtroEstado} onChange={handleFiltroChange}>
                        <option value="">Todos</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupado">Ocupado</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                </div>
            </div>

            <div className='btn-acciones'>
                <button className="btn-agregar" onClick={handleModalToggle}>Agregar</button>
                {showModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h3 className='text-center'>AGREGAR ESPACIO</h3>
                            <form>
                                <div>
                                    <label>DNI:</label>
                                    <input
                                        type="text" name="dni" value={nuevoEspacio.dni}
                                        onChange={handleInputChange} required
                                        placeholder="Ingrese DNI del cliente" />
                                </div>
                                <div>
                                    <label>Espacio Disponible:</label>
                                    <select
                                        className='select-espacios' name="espacio"
                                        value={nuevoEspacio.espacio} onChange={handleInputChange}
                                        required>
                                        <option value="">Seleccionar</option>
                                        {espaciosDisponibles.length > 0 ? (
                                            espaciosDisponibles.map((espacio) => (
                                                <option key={espacio.codigoEspacio} value={espacio.codigoEspacio}>
                                                    {espacio.codigoEspacio}
                                                </option>
                                            ))
                                        ) : (
                                            <option>No hay espacios disponibles</option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label>Inicio del alquiler:</label>
                                    <input
                                        type="date" name="inicio" value={nuevoEspacio.inicio}
                                        onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label>Final del alquiler:</label>
                                    <input
                                        type="date" name="final" value={nuevoEspacio.final}
                                        onChange={handleInputChange} required />
                                </div>
                            </form>
                            <div className='modal-btn'>
                                <button className="btn btn-success" onClick={agregarAlquiler}>
                                    Guardar
                                </button>
                                <button className="btn btn-secondary" onClick={handleModalToggle}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <button className='btn-actualizar' onClick={handleUpdateModalToggle}>Actualizar</button>
                {showUpdateModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h3 className='text-center'>ACTUALIZAR ESPACIO</h3>
                            <form>
                                <div>
                                    <label>Selecciona la acción:</label>
                                    <select
                                        value={accionSeleccionada} onChange={(e) => setAccionSeleccionada(e.target.value)} required>
                                        <option value="">Seleccionar</option>
                                        <option value="Actualizar_alquiler">Actualizar Alquiler</option>
                                        <option value="Actualizar_estado">Actualizar Estado</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Seleccionar Espacio:</label>
                                    <select
                                        value={codigoActualizar} onChange={(e) => setCodigoActualizar(e.target.value)} required>
                                        <option value="">Seleccionar</option>
                                        {espaciosActualizables.map((espacio) => (
                                            <option key={espacio.codigoEspacio} value={espacio.codigoEspacio}>
                                                {espacio.codigoEspacio} - {espacio.estado}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {accionSeleccionada === 'Actualizar_estado' && codigoActualizar && (
                                    <div>
                                        <label>Nuevo Estado:</label>
                                        <select
                                            value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)} required>
                                            <option value="">Seleccionar</option>
                                            {opcionesEstado(
                                                Espacios.find((dato) => dato.codigoEspacio === codigoActualizar)?.estado,
                                                codigoActualizar
                                            ).map((opcion) => (
                                                <option key={opcion} value={opcion}>
                                                    {opcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {accionSeleccionada === 'Actualizar_alquiler' && codigoActualizar && (
                                    <div>
                                        <label>DNI del cliente:</label>
                                        <input
                                            type="text" value={dniCliente} onChange={(e) => setDniCliente(e.target.value)} required />
                                        <label>Fecha de Inicio:</label>
                                        <input
                                            type="date" value={inicioAlquiler} onChange={(e) => setInicioAlquiler(e.target.value)} required />
                                        <label>Fecha de Fin:</label>
                                        <input
                                            type="date" value={finAlquiler} onChange={(e) => setFinAlquiler(e.target.value)} required />
                                    </div>
                                )}
                            </form>
                            <div className='modal-btn'>
                                <button
                                    className="btn btn-success"
                                    onClick={accionSeleccionada === 'Actualizar_alquiler' ? actualizarAlquiler : actualizarEstado}>
                                    Actualizar
                                </button>
                                <button className="btn btn-secondary" onClick={handleUpdateModalToggle}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <button className='btn-eliminar' onClick={handleDeleteModalToggle}>Eliminar</button>
                {showDeleteModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h3 className='text-center'>ELIMINAR ESPACIO</h3>
                            <form>
                                <div>
                                    <label>Seleccionar Espacio Ocupado:</label>
                                    <select
                                        value={codigoEliminar} onChange={(e) => setCodigoEliminar(e.target.value)} required >
                                        <option value="">Seleccionar</option>
                                        {espaciosOcupados.map((espacio) => (
                                            <option key={espacio.codigoEspacio} value={espacio.codigoEspacio}>
                                                {espacio.codigoEspacio}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                            <div className='modal-btn'>
                                <button className="btn btn-danger" onClick={EliminarAlquiler}>
                                    Eliminar
                                </button>
                                <button className="btn btn-secondary" onClick={handleDeleteModalToggle}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <table className="table table-primary table-hover table-bordered border-primary text-center tabla-espacios">
                <thead>
                    <tr>
                        <th scope="col" className="espacios-n">Codigo</th>
                        <th scope="col" className="espacios-dni">DNI</th>
                        <th scope="col" className="espacios-na">Nombre y Apellido</th>
                        <th scope="col" className="espacios-na">Contacto</th>
                        <th scope="col" className="espacios-t">Inicio del alquiler</th>
                        <th scope="col" className="espacios-t">Final del alquiler</th>
                        <th scope="col" className="espacios-e">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {espaciosFiltrados.map((dato) => (
                        <tr key={dato.codigoEspacio}>
                            <th scope="row">{dato.codigoEspacio}</th>
                            <td>{dato.dni}</td>
                            <td>{dato.nombreyapellido}</td>
                            <td>{dato.telefono}</td>
                            <td>{dato.fechaInicioAlquiler}</td>
                            <td>{dato.fechaFinAlquiler}</td>
                            <td>{dato.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Espacios;
