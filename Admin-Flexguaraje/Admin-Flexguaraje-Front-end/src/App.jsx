import './App.css';
import HeaderAdmin from './Componentes/headerAdmin';
import ListaAdmin from './Componentes/ListaAdmin';
import ContenidoInicio from './Componentes/contenidoInicio';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Aquí definimos las páginas (pueden ser otros componentes)
import Clientes from './paginas/Clientes/Clientes';
import SolicitudesClientes from './paginas/Clientes/solicitudesClientes';
import Espacios from './paginas/Espacios/Espacios';
import Servicios from './paginas/Servicios/Servicios';
import Reportes from './paginas/Reportes/Reportes';

function App() {
  return (
    <Router>
      {/* Layout principal con HeaderAdmin y ListaAdmin */}
      <div className="app-layout">
        <HeaderAdmin />
        <ListaAdmin />


        <div className="content-container">
          <Routes>
            <Route path="/" element={<ContenidoInicio />} /> {/* Página por defecto */}
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/solicitudes" element={<SolicitudesClientes />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </div>
      </div>


    </Router>

  );
}

export default App;
