import './App.css';
import HeaderAdmin from './Componentes/headerAdmin';
import ListaAdmin from './Componentes/ListaAdmin';

import ContenidoInicio from './Componentes/contenidoInicio';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Aquí definimos las páginas (pueden ser otros componentes)
import Cuenta from './paginas/Cuenta/Cuenta';
import Clientes from './paginas/Clientes/Clientes';
import SolicitudesClientes from './paginas/Clientes/SolicitudesClientes';
import Espacios from './paginas/Espacios/Espacios';
import Boleta from './paginas/Boleta/Boleta';
import Reportes from './paginas/Reportes/Reportes';
import Login from './Login/Login';

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
            <Route path="/cuenta" element={<Cuenta />} />
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
