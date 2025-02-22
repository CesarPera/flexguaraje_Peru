import React, { useState, useEffect } from 'react';
import ReportesBD from './BASE DE DATOS/ReportsBD'; // Ajusta la ruta según la ubicación real
import Swal from 'sweetalert2';
import './Reportes.css';

function Reportes() {
  const [reportes, setReportes] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [filtroPrioridad, setFiltroPrioridad] = useState('Todos');
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [codigoBuscar, setCodigoBuscar] = useState('');
  const [modalActualizarAbierto, setModalActualizarAbierto] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalRespuestaAbierto, setModalRespuestaAbierto] = useState(false);
  const [respuesta, setRespuesta] = useState('');
  const [nuevoReporte, setNuevoReporte] = useState({
    descripcionReporte: '',
    encargadoResolver: '',
    prioridad: 'Seleccione',
    estado: 'Pendiente',
    subestado: 'Seleccione',
    fechaReporte: new Date().toLocaleDateString(),
    fechaRespuestaReporte: '',
    respuestaReporte: ''
  });
  const [mostrarFormularioCOMPLETO, setMostrarFormularioCOMPLETO] = useState(false);
  const [reportesFiltrados, setReportesFiltrados] = useState([]);

  // Función de ayuda para mostrar valor o fantasmitas (en caso de campo vacío)
  const mostrarValor = (valor) => {
    return valor && valor !== "" ? valor : '👻👻👻';
  };

  useEffect(() => {
    ReportesBD.getAllReportes()
      .then(response => {
        console.log("Reportes obtenidos:", response.data);
        setReportes(response.data);
        
      })
      .catch(error => {
        console.error("Error al obtener los reportes:", error);
        Swal.fire('Error', 'No se pudieron obtener los reportes.', 'error');
      });
  }, []);

  useEffect(() => {
    // Cuando cambien estado, prioridad o la lista de reportes,
    // solo filtras localmente, ignorando codigoBuscar
    const nuevosFiltrados = reportes.filter((reporte) => {
      const estadoCoincide = filtroEstado === 'Todos' || reporte.estado === filtroEstado;
      const prioridadCoincide = filtroPrioridad === 'Todos' || reporte.prioridad === filtroPrioridad;
      return estadoCoincide && prioridadCoincide;
    });
    setReportesFiltrados(nuevosFiltrados);
  }, [filtroEstado, filtroPrioridad, reportes]);


  const filtrarReportes = (codigo) => {
    return reportes.filter((reporte) => {
      const estadoCoincide = filtroEstado === 'Todos' || reporte.estado === filtroEstado;
      const prioridadCoincide = filtroPrioridad === 'Todos' || reporte.prioridad === filtroPrioridad;
      const codigoCoincide = reporte.codigoReporte?.toLowerCase().includes(codigo.toLowerCase());
      return estadoCoincide && prioridadCoincide && codigoCoincide;
    });
  };

  const buscarReporte = () => {
    // Validación: campo vacío
    if (!codigoBuscar.trim()) {
      Swal.fire({
        title: '¡Campo vacío!',
        text: 'Por favor, ingresa un código de Reporte.',
        icon: 'warning'
      });
      return;
    }
    
    // Validación: longitud exacta de 15 caracteres
    if (codigoBuscar.length !== 15) {
      Swal.fire({
        title: '¡Código inválido!',
        text: 'El código de reporte debe tener exactamente 15 caracteres.',
        icon: 'warning'
      });
      return;
    }
    
    // Validación: formato (ejemplo: RPT-12345678901)
    const formato = /^RPT-\d{11}$/;
    if (!formato.test(codigoBuscar)) {
      Swal.fire({
        title: '¡Código inválido!',
        text: 'El código de reporte debe seguir el formato correspondiente. EJEMPLO: RPT-12345678901',
        icon: 'warning'
      });
      return;
    }
    
    // Realiza la petición al backend
    ReportesBD.buscarReporte(codigoBuscar)
      .then(response => {
        setReportesFiltrados([response.data]);
      })
      .catch(error => {
        console.error("Error al buscar reporte:", error);
        // Si el backend envía el mensaje "Reporte no encontrado con el código: " + codigoReporte, se muestra
        Swal.fire({
          title: 'Error',
          text: error.response?.data || ("Reporte no encontrado con el código: " + codigoBuscar),
          icon: 'error'
        });
      });
  };
    

  // Función para actualizar reporte
  const manejarActualizacion = (e) => {
    e.preventDefault();
  
    // 1. Verificamos si todos los campos están vacíos
    const todosLosCampos = [
      nuevoReporte.descripcionReporte,
      nuevoReporte.encargadoResolver,
      nuevoReporte.prioridad,
      nuevoReporte.estado
    ];
    
    const formularioVacio = todosLosCampos.every(
      (campo) => !campo || !campo.trim()
    );
  
    if (formularioVacio) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario Vacío',
        text: 'El formulario no puede estar vacío, por favor rellenar datos.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
  
    // 2. Validamos campos individuales
    const errores = [];
  
    // Validar campo "Descripción"
    if (!nuevoReporte.descripcionReporte || !nuevoReporte.descripcionReporte.trim()) {
      errores.push("La descripción no puede estar vacía.");
    }
  
    // Validar campo "Encargado a Resolver"
    if (!nuevoReporte.encargadoResolver || !nuevoReporte.encargadoResolver.trim()) {
      errores.push("Encargado a Resolver no puede estar vacío.");
    }
  
    // Validar campo "Prioridad"
    if (!nuevoReporte.prioridad || !nuevoReporte.prioridad.trim()) {
      errores.push("Debe seleccionar una prioridad.");
    }
  
    // Validar campo "Estado"
    if (!nuevoReporte.estado || !nuevoReporte.estado.trim()) {
      errores.push("Debe seleccionar un estado.");
    }
  
    // Si existen errores, se muestran y se detiene el proceso
    if (errores.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: errores.join("<br/>") // Cada mensaje en una línea distinta
      });
      return;
    }
  
    // 2.1. Verificar si se han realizado cambios
    const noHayCambios =
      nuevoReporte.descripcionReporte === reporteSeleccionado.descripcionReporte &&
      nuevoReporte.encargadoResolver === reporteSeleccionado.encargadoResolver &&
      nuevoReporte.prioridad === reporteSeleccionado.prioridad &&
      nuevoReporte.estado === reporteSeleccionado.estado;
  
    if (noHayCambios) {
      Swal.fire({
        icon: 'warning',
        title: 'No se han realizado cambios',
        text: 'No has realizado ninguna actualización en los datos.'
      });
      return;
    }
  
    // 3. Si todo está correcto y hay cambios, crear el objeto con los datos a actualizar
    const reporteAActualizar = {
      codigoReporte: reporteSeleccionado.codigoReporte,
      descripcionReporte: nuevoReporte.descripcionReporte,
      encargadoResolver: nuevoReporte.encargadoResolver,
      prioridad: nuevoReporte.prioridad,
      estado: nuevoReporte.estado
    };
  
    // Llamar al servicio para actualizar el reporte
    ReportesBD.actualizarReporte(reporteAActualizar)
      .then(response => {
        // Actualizar la lista de reportes en el estado
        const reportesActualizados = reportes.map((reporte) =>
          reporte.idReportes === reporteSeleccionado.idReportes ? response.data : reporte
        );
        setReportes(reportesActualizados);
  
        // Cerrar el modal
        setModalActualizarAbierto(false);
  
        // Mostrar mensaje de éxito
        Swal.fire('¡Actualizado!', 'El reporte se actualizó exitosamente.', 'success');
      })
      .catch(error => {
        console.error("Error al actualizar el reporte:", error);
        Swal.fire('Error', error.response?.data || "Error al actualizar el reporte.", 'error');
      });
  };
  
  

  const cerrarModalActualizar = () => setModalActualizarAbierto(false);
  const cerrarModal = () => setModalAbierto(false);
  const cerrarModalRespuesta = () => {
    setModalRespuestaAbierto(false);
    setRespuesta('');
  };

  // Función para abrir modal de responder
  const responderReporte = (reporte) => {
    setReporteSeleccionado(reporte);
    setModalRespuestaAbierto(true);
  };

  // Función para enviar la respuesta al backend
  const manejarRespuesta = (e) => {
    e.preventDefault();
  
    // Concatenamos los valores de los campos para evaluar si están vacíos
    const formularioVacio = `${respuesta || ''} ${nuevoReporte.subestado || ''}`;
    if (!formularioVacio.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario Vacío',
        text: 'El formulario no puede estar vacío, por favor rellenar datos.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
  
    // Array para acumular errores de validación específica
    const errores = [];
  
    // Validación: Si se ingresa respuesta, se valida que el subestado no esté vacío
    if (respuesta && respuesta.trim() !== '') {
      if (!nuevoReporte.subestado || nuevoReporte.subestado.trim() === '') {
        errores.push("Debe seleccionar un subestado.");
      }
    }
  
    // Validación: Si se selecciona un subestado pero la respuesta está vacía
    if (nuevoReporte.subestado && nuevoReporte.subestado.trim() !== '') {
      if (!respuesta || respuesta.trim() === '') {
        errores.push("La respuesta no puede estar vacía.");
      }
    }
  
    // Si hay errores, se muestran y se detiene el envío
    if (errores.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: errores.join('<br/>')
      });
      return;
    }
  
    // Si la validación es correcta, proceder con la respuesta
    const reporteRespuesta = {
      codigoReporte: reporteSeleccionado.codigoReporte,
      respuesta: respuesta,
      subestado: nuevoReporte.subestado
    };
  
    ReportesBD.responderReporte(reporteRespuesta)
      .then(response => {
        const reportesActualizados = reportes.map((reporte) =>
          reporte.idReportes === reporteSeleccionado.idReportes ? response.data : reporte
        );
        setReportes(reportesActualizados);
        setReporteSeleccionado(response.data);
        Swal.fire('¡Respondido!', 'La respuesta se envió exitosamente.', 'success');
        cerrarModalRespuesta();
      })
      .catch(error => {
        console.error("Error al responder el reporte:", error);
        Swal.fire('Error', error.response?.data || "Error al responder el reporte.", 'error');
      });
  };

  // Función para crear reporte usando la Solución 1
  const manejarCreacionReporte = (e) => {
    e.preventDefault();
  
    // Validación general: concatenar valores de los campos y verificar si están todos vacíos
    const formularioVacio = `${nuevoReporte.descripcionReporte || ''} ${nuevoReporte.encargadoResolver || ''} ${nuevoReporte.prioridad || ''}`;
    if (!formularioVacio.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario Vacío',
        text: 'El formulario no puede estar vacío, por favor rellenar datos.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
  
    // Array para acumular errores de validación específica
    const errores = [];
  
    // Validación 1: Si se ingresa dato en la descripción, se valida que encargado y prioridad no estén vacíos
    if (nuevoReporte.descripcionReporte && nuevoReporte.descripcionReporte.trim() !== '') {
      if (!nuevoReporte.encargadoResolver || nuevoReporte.encargadoResolver.trim() === '') {
        errores.push("Encargado a Resolver no puede estar vacío.");
      }
      // Unificamos el mensaje de prioridad
      if (!nuevoReporte.prioridad || nuevoReporte.prioridad.trim() === '') {
        errores.push("Debe seleccionar una prioridad.");
      }
    }
  
    // Validación 2: Si se ingresa dato en "Encargado a Resolver" pero la descripción o la prioridad están vacíos
    if (nuevoReporte.encargadoResolver && nuevoReporte.encargadoResolver.trim() !== '') {
      const mensajePartes = [];
      if (!nuevoReporte.descripcionReporte || nuevoReporte.descripcionReporte.trim() === '') {
        mensajePartes.push("La Descripcion no puede estar vacio");
      }
      // Unificamos el mensaje de prioridad
      if (!nuevoReporte.prioridad || nuevoReporte.prioridad.trim() === '') {
        mensajePartes.push("Debe seleccionar una prioridad.");
      }
      if (mensajePartes.length > 0) {
        errores.push(mensajePartes.join(" <br/> "));
      }
    }
  
    // Validación 3: Si se ingresa dato en "Prioridad" pero los demás campos (Descripción y Encargado a Resolver) están vacíos
    if (nuevoReporte.prioridad && nuevoReporte.prioridad.trim() !== '') {
      const mensajePartes = [];
      if (!nuevoReporte.descripcionReporte || nuevoReporte.descripcionReporte.trim() === '') {
        mensajePartes.push("La Descripcion no puede estar vacio");
      }
      if (!nuevoReporte.encargadoResolver || nuevoReporte.encargadoResolver.trim() === '') {
        mensajePartes.push("Encargado a Resolver no puede estar vacío.");
      }
      if (mensajePartes.length > 0) {
        errores.push(mensajePartes.join(" <br/> "));
      }
    }
  
    // ELIMINAR DUPLICADOS
    const erroresUnicos = [...new Set(errores)];
  
    // Si hay errores, se muestran y se detiene el envío
    if (erroresUnicos.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: erroresUnicos.join('<br/>')
      });
      return;
    }
  
    // Si la validación es correcta, continuar con la creación del reporte
    ReportesBD.crearReporte(
      nuevoReporte.encargadoResolver,
      nuevoReporte.descripcionReporte,
      nuevoReporte.prioridad
    )
      .then(response => {
        const reporteCreado = response.data;
        setReportes(prevReportes => [...prevReportes, reporteCreado]);
        setNuevoReporte({
          descripcionReporte: '',
          encargadoResolver: '',
          prioridad: '',
          estado: '',
          subestado: '',
          fechaReporte: new Date().toLocaleDateString(),
          fechaRespuestaReporte: '',
          respuestaReporte: ''
        });
        setModalAbierto(false);
        Swal.fire('¡Reporte creado!', 'El reporte se creó exitosamente.', 'success');
      })
      .catch(error => {
        console.error("Error al crear reporte:", error);
        Swal.fire('Error', error.response?.data || "Error al crear el reporte.", 'error');
      });
  };
  

  const manejarCancelacionReporte = () => {
    setNuevoReporte({
      descripcionReporte: '',
      encargadoResolver: '',
      prioridad: '',
      estado: '',
      subestado: '',
      fechaReporte: new Date().toLocaleDateString(),
      fechaRespuestaReporte: '',
      respuestaReporte: ''
    });
    cerrarModal();
  };

  const mostrarDetallesReporte = (reporte) => {
    setReporteSeleccionado(reporte);
    setMostrarFormularioCOMPLETO(true);
  };

  return (
    <div className="reportes-page">
      <h1 className="titulo-reporte">Gestión de Reportes</h1>

      <div className="acciones-container">
  <button className="btn btn-success" onClick={() => setModalAbierto(true)}>
    Crear Reporte
  </button>
  <div className="buscar-container">
  <input
    type="text"
    placeholder="Código del reporte"
    value={codigoBuscar}
    onChange={(e) => setCodigoBuscar(e.target.value)}
  />
  <div className='btn-accion-buscarN'>
  <button className="btn btn-info" onClick={buscarReporte}>
    Buscar
  </button>
  <button className='btn btn-secondary btn-normalidad' onClick={() => {
      setCodigoBuscar('');
      ReportesBD.getAllReportes()
          .then(response => {
              setReportes(response.data);
              setReportesFiltrados(response.data);
          })
          .catch(error => {
              console.error("Error al listar reportes:", error);
              Swal.fire('Error', 'No se pudieron obtener los reportes.', 'error'); // Muestra un mensaje de error
          });
  }}>
      Normalidad
  </button>
  </div>
</div>
</div>
      <table className="table table-primary table-hover table-bordered border-primary text-center tabla-usuario">
        <thead>
          <tr>
            <th>Código Reporte</th>
            <th>Fecha Reporte</th>
            <th>Encargado a Resolver</th>
            <th>
              Prioridad
              <select className='filtro-option' value={filtroPrioridad} onChange={(e) => setFiltroPrioridad(e.target.value)}>
                <option value="Todos">Todos</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </th>
            <th>
              Estado
              <select className='filtro-option' value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </th>
            <th>Subestado</th>
            <th>Fecha Respuesta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportesFiltrados.map((reporte) => ( // Cambiado de reportesFiltrados() a reportesFiltrados
            <tr key={reporte.idReportes}>
              <td>
                <button className="btn btn-link" onClick={() => mostrarDetallesReporte(reporte)}>
                  {mostrarValor(reporte.codigoReporte)}
                </button>
              </td>
              <td>{mostrarValor(reporte.fechaReporte)}</td>
              <td>{mostrarValor(reporte.encargadoResolver)}</td>
              <td>{mostrarValor(reporte.prioridad)}</td>
              <td className={`estado-${reporte.estado ? reporte.estado.toLowerCase() : ''}`}>
                {mostrarValor(reporte.estado)}
              </td>
              <td>{mostrarValor(reporte.subestado)}</td>
              <td>{mostrarValor(reporte.fechaRespuestaReporte)}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setReporteSeleccionado(reporte);
                    setNuevoReporte({
                      descripcionReporte: reporte.descripcionReporte,
                      encargadoResolver: reporte.encargadoResolver,
                      prioridad: reporte.prioridad,
                      estado: reporte.estado,
                      subestado: reporte.subestado,
                      fechaReporte: reporte.fechaReporte,
                      fechaRespuestaReporte: reporte.fechaRespuestaReporte,
                      respuestaReporte: reporte.respuestaReporte
                    });
                    setModalActualizarAbierto(true);
                  }}
                >
                  Actualizar
                </button>
                <button className="btn-responder" onClick={() => responderReporte(reporte)}>
                  Responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para creación de reporte */}
      {modalAbierto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear Reporte</h2>
            <form onSubmit={manejarCreacionReporte} noValidate>
              <label>Descripción:</label>
              <textarea
                value={nuevoReporte.descripcionReporte}
                onChange={(e) =>
                  setNuevoReporte({ ...nuevoReporte, descripcionReporte: e.target.value })
                }
              />
              <label>Encargado Resolver:</label>
              <input
                type="text"
                value={nuevoReporte.encargadoResolver}
                onChange={(e) =>
                  setNuevoReporte({ ...nuevoReporte, encargadoResolver: e.target.value })
                }
              />
              <label>Prioridad:</label>
              <select
                value={nuevoReporte.prioridad}
                onChange={(e) => setNuevoReporte({ ...nuevoReporte, prioridad: e.target.value })}
              >
                <option value="">Seleccione</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
              <div className="modal-buttons">
                <button className="btn btn-primary" type="submit">
                  Crear
                </button>
                <button className="btn btn-secondary" type="button" onClick={manejarCancelacionReporte}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Actualizar Reporte */}
      {modalActualizarAbierto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Actualizar Reporte</h2>
            <form onSubmit={manejarActualizacion}>
              <label>Descripción del Reporte:</label>
              <textarea
                value={nuevoReporte.descripcionReporte}
                onChange={(e) =>
                  setNuevoReporte({ ...nuevoReporte, descripcionReporte: e.target.value })
                }
              />
              <label>Encargado a Resolver:</label>
              <input
                type="text"
                value={nuevoReporte.encargadoResolver}
                onChange={(e) =>
                  setNuevoReporte({ ...nuevoReporte, encargadoResolver: e.target.value })
                }
              />
              <label>Prioridad:</label>
              <select
                value={nuevoReporte.prioridad}
                onChange={(e) => setNuevoReporte({ ...nuevoReporte, prioridad: e.target.value })}
                
              >
                <option value="">Seleccione</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
              <label>Estado:</label>
              <select
                value={nuevoReporte.estado}
                onChange={(e) => setNuevoReporte({ ...nuevoReporte, estado: e.target.value })}
                
              >
                <option value="">Seleccione</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Cerrado">Cerrado</option>
              </select>
              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
                <button type="button" className="btn btn-secondary" onClick={cerrarModalActualizar}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Información Completa del Reporte */}
      {mostrarFormularioCOMPLETO && reporteSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-content-completo">
            <h3 className="text-center">INFORMACIÓN COMPLETA DEL REPORTE</h3>
            <div className="formulario-campos-completo">
              <div className="campos-datos">
                <label>Código Reporte:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.codigoReporte)} disabled />
              </div>
              <div className="campos-datos">
                <label>Encargado Resolver:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.encargadoResolver)} disabled />
              </div>
              <div className="campos-datos">
                <label>Descripción:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.descripcionReporte)} disabled />
              </div>
              <div className="campos-datos">
                <label>Prioridad:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.prioridad)} disabled />
              </div>
              <div className="campos-datos">
                <label>Fecha Reporte:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.fechaReporte)} disabled />
              </div>
              <div className="campos-datos">
                <label>Fecha Respuesta:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.fechaRespuestaReporte)} disabled />
              </div>
              <div className="campos-datos">
                <label>Estado:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.estado)} disabled />
              </div>
              <div className="campos-datos">
                <label>Subestado:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.subestado)} disabled />
              </div>
              <div className="campos-datos">
                <label>Respuesta:</label>
                <input type="text" value={mostrarValor(reporteSeleccionado.respuestaReporte)} disabled />
              </div>
            </div>
            <div className="formulario-botones-completo">
              <button className="btn btn-secondary" onClick={() => setMostrarFormularioCOMPLETO(false)}>
                Volver
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Responder Reporte */}
      {modalRespuestaAbierto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Responder Reporte</h2>
            <form onSubmit={manejarRespuesta}>
              <label>Respuesta:</label>
              <textarea
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                placeholder="Escribe la respuesta aquí..."
              />
              <label>Subestado:</label>
              <select
                value={nuevoReporte.subestado}
                onChange={(e) => setNuevoReporte({ ...nuevoReporte, subestado: e.target.value })}
              >
                <option value="">Seleccione</option>
                <option value="Acogido">Acogido</option>
                <option value="No_acogido">No Acogido</option>
              </select>
              <div className="modal-buttons">
                <button className="btn btn-primary" type="submit">
                  Responder
                </button>
                <button className="btn btn-secondary" type="button" onClick={cerrarModalRespuesta}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reportes;