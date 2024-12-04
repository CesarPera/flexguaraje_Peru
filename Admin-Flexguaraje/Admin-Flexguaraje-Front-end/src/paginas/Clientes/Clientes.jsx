// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Clientes.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Usar react-router para redirección.

function Clientes() {
    const [clientes, setClientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    correo: "",
    fechaInicio: "",
    dni: "",
    tipo: "Empresa", // Empresa o Persona
    direccion: "",
    provincia: "",
    telefono: "",
    fechaNacimiento: "",
  });

  const [busqueda, setBusqueda] = useState("");
  const [tipoBusqueda, setTipoBusqueda] = useState("dni"); // 'dni' o 'nombre'
  const navigate = useNavigate();

  const manejarNuevoCliente = () => {
    if (Object.values(nuevoCliente).every((campo) => campo.trim())) {
      const nuevoClienteConId = {
        id: clientes.length + 1,
        ...nuevoCliente,
      };
      setClientes([...clientes, nuevoClienteConId]);
      setNuevoCliente({
        nombre: "",
        apellido: "",
        edad: "",
        correo: "",
        fechaInicio: "",
        dni: "",
        tipo: "Empresa",
        direccion: "",
        provincia: "",
        telefono: "",
        fechaNacimiento: "",
      });
      setMostrarFormulario(false);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const buscarCliente = () => {
    if (!busqueda) {
      alert("Por favor ingrese un valor de búsqueda.");
      return;
    }

    navigate("/solicitudesclientes", {
      state: { busqueda, tipoBusqueda },
    });
  };

    return (
        <div className="clientes-page"> {/*NO TOCAR NI MIRAR LA CLASE "clientes-page"*/}
            <h2>Clientes</h2>

            {/* Tabla de Datos de Clientes */}
            <div className="formulario-busqueda">
        <select
          value={tipoBusqueda}
          onChange={(e) => setTipoBusqueda(e.target.value)}
        >
          <option value="dni">Buscar por DNI</option>
          <option value="nombre">Buscar por Nombre Completo</option>
        </select>

        <input
          type="text"
          placeholder={`Buscar por ${tipoBusqueda === "dni" ? "DNI" : "Nombre Completo"}`}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="boton-buscar" onClick={buscarCliente}>
            <Link to="/clientes/solicitudes">
                <span className="full-label animate">Espacios</span>
           </Link> 
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
            <h3>Añadir Nuevo Cliente</h3>
            {/* Formulario */}
            <label>Nombre</label>
            <input
              type="text"
              value={nuevoCliente.nombre}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
              }
            />
            <label>Apellido</label>
            <input
              type="text"
              value={nuevoCliente.apellido}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, apellido: e.target.value })
              }
            />
            <label>Edad</label>
            <input
              type="number"
              value={nuevoCliente.edad}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, edad: e.target.value })
              }
            />
            <label>Correo</label>
            <input
              type="email"
              value={nuevoCliente.correo}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, correo: e.target.value })
              }
            />
            <label>DNI</label>
            <input
              type="text"
              value={nuevoCliente.dni}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, dni: e.target.value })
              }
            />
            <select
              value={nuevoCliente.tipo}
              onChange={(e) =>
                setNuevoCliente({ ...nuevoCliente, tipo: e.target.value })
              }
            >
              <option value="Empresa">Empresa</option>
              <option value="Persona">Persona</option>
            </select>

            <button onClick={manejarNuevoCliente}>Añadir</button>
            <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
            
export default Clientes;
