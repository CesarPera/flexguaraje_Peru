// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Espacios.css';
import EspacioBD from './Servicios/EspacioBD';


function Espacios() {
    // Datos iniciales con 20 espacios disponibles
    const [Espacios, setEspacios] = useState([]);

    const fetchEspacios = async () => {
        try {
            const response = await EspacioBD.getAllEspacios();
            // Verifica que la respuesta sea un array
            if (Array.isArray(response.data)) {
                setEspacios(response.data);
            } else {
                console.error('La respuesta no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error al cargar los espacios:', error);
        }
    };

    useEffect(() => {
        fetchEspacios();
    }, []);



    const [filtroEstado, setFiltroEstado] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    const [nuevoEstado, setNuevoEstado] = useState(''); // Nuevo estado para el espacio a actualizar



    const espaciosDisponibles = Espacios.filter((dato) => dato.estado === 'Disponible');
    const espaciosActualizables = Espacios.filter(
        (dato) => dato.estado === 'Disponible' || dato.estado === 'Ocupado' || dato.estado === 'Mantenimiento'
    );

    const espaciosOcupados = Espacios.filter((dato) => dato.estado === 'Ocupado');

    const handleModalToggle = () => setShowModal(!showModal);
    const handleUpdateModalToggle = () => setShowUpdateModal(!showUpdateModal);
    const handleDeleteModalToggle = () => setShowDeleteModal(!showDeleteModal);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoEspacio({ ...nuevoEspacio, [name]: value });
    };

    const agregarEspacio = () => {
        const nuevoDato = {
            ...nuevoEspacio,
            id: Espacios.length + 1,
            codigo: nuevoEspacio.espacio,
            estado: 'Ocupado',
        };

        setEspacios((prevDatos) =>
            prevDatos.map((dato) =>
                dato.codigo === nuevoEspacio.espacio
                    ? { ...dato, ...nuevoDato }
                    : dato
            )
        );
        setShowModal(false);
        setNuevoEspacio({ dni: '', nombre: '', contacto: '', inicio: '', final: '', espacio: '', estado: 'Disponible' });
    };

    const actualizarEspacio = () => {
        if (!codigoActualizar || !nuevoEstado) {
            alert('Por favor selecciona un espacio y un nuevo estado.');
            return;
        }

        setEspacios((prevDatos) =>
            prevDatos.map((dato) =>
                dato.codigo === codigoActualizar ? { ...dato, estado: nuevoEstado } : dato
            )
        );
        setShowUpdateModal(false);
        setCodigoActualizar('');
        setNuevoEstado('');
    };

    const opcionesEstado = (estadoActual) => {
        switch (estadoActual) {
            case 'Disponible':
            case 'Ocupado':
                return ['Mantenimiento'];
            case 'Mantenimiento':
                return ['Disponible'];
            default:
                return [];
        }
    };

    const eliminarEspacio = () => {
        setEspacios((prevDatos) =>
            prevDatos.map((dato) =>
                dato.codigo === codigoEliminar
                    ? {
                        ...dato,
                        dni: '',
                        nombre: '',
                        contacto: '',
                        inicio: '',
                        final: '',
                        estado: 'Disponible',
                    }
                    : dato
            )
        );
        setShowDeleteModal(false);
        setCodigoEliminar('');
    };

    const datosFiltrados = filtroEstado
        ? Espacios.filter((dato) => dato.estado === filtroEstado)
        : Espacios;

    return (
        <div className="espacios-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="title-espacios">Espacios de Almacenamiento</h2>

                <div className="filtro-container">
                    <label htmlFor="filtroEstado" className="form-label">Filtrar por estado</label>
                    <select
                        id="filtroEstado"
                        className="form-select"
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
                                    <select
                                        className='select-espacios'
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
                            <div className='modal-btn'>
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

                <button className='btn-actualizar' onClick={handleUpdateModalToggle}>Actualizar</button>

                {showUpdateModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h3 className='text-center'>ACTUALIZAR ESPACIO</h3>
                            <form>
                                <div>
                                    <label>Seleccionar Espacio:</label>
                                    <select
                                        value={codigoActualizar}
                                        onChange={(e) => setCodigoActualizar(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        {espaciosActualizables.map((espacio) => (
                                            <option key={espacio.codigo} value={espacio.codigo}>
                                                {espacio.codigo} - {espacio.estado}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {codigoActualizar && (
                                    <div>
                                        <label>Nuevo Estado:</label>
                                        <select
                                            value={nuevoEstado}
                                            onChange={(e) => setNuevoEstado(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            {opcionesEstado(
                                                datos.find((dato) => dato.codigo === codigoActualizar)?.estado
                                            ).map((opcion) => (
                                                <option key={opcion} value={opcion}>
                                                    {opcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </form>
                            <div className='modal-btn'>
                                <button className="btn btn-success" onClick={actualizarEspacio}>
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

                {/* Modal para eliminar */}
                {showDeleteModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h3 className='text-center'>ELIMINAR ESPACIO</h3>
                            <form>
                                <div>
                                    <label>Seleccionar Espacio Ocupado:</label>
                                    <select
                                        value={codigoEliminar}
                                        onChange={(e) => setCodigoEliminar(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        {espaciosOcupados.map((espacio) => (
                                            <option key={espacio.codigo} value={espacio.codigo}>
                                                {espacio.codigo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                            <div className='modal-btn'>
                                <button className="btn btn-danger" onClick={eliminarEspacio}>
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
                        <th scope="col" className="espacios-t">Inicio</th>
                        <th scope="col" className="espacios-t">Final</th>
                        <th scope="col" className="espacios-e">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.map((dato) => (
                        <tr key={dato.idEspacio}>
                            <th scope="row">{dato.codigoEspacio}</th>
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
