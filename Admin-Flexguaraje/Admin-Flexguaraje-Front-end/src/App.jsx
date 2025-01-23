import './App.css';
import HeaderAdmin from './Componentes/HeaderAdmin';
import ListaAdmin from './Componentes/ListaAdmin';
import ContenidoInicio from './Componentes/ContenidoInicio';  // Verifica esta línea
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Aquí definimos las páginas (pueden ser otros componentes)
// propietario
import Cuenta from './paginas/Propietario/Cuenta/Cuenta';
import Permisos from './paginas/Propietario/Permisos/Permisos';
import Roles from './paginas/Propietario/Roles/Roles';
import Usuario from './paginas/Propietario/Usuario/Usuario';

// administrador
import Clientes from './paginas/Administrador/Clientes/Clientes';
import SolicitudesClientes from './paginas/Administrador/Clientes/SolicitudesClientes';
import Espacios from './paginas/Administrador/Espacios/Espacios';
import Boleta from './paginas/Administrador/Boleta/Boleta';
import Reportes from './paginas/Administrador/Reportes/Reportes';

// para los dos
import Login from './Validacion/Login';

function App() {
  return (
    <Router>
      {/* Layout principal con HeaderAdmin y ListaAdmin */}
      <div className="app-layout">
        <HeaderAdmin />
        <ListaAdmin />

        <div className="content-container">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Página por defecto */}
            <Route path="/bienvenido_a_flexguaraje_peru" element={<ContenidoInicio />} />
            {/* Página para propietario */}
            <Route path="/cuenta" element={<Cuenta />} />
            <Route path="/permisos" element={<Permisos />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/usuario" element={<Usuario />} />

            {/* Página para administrador */}
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/solicitudesclientes" element={<SolicitudesClientes />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/Boleta" element={<Boleta />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
