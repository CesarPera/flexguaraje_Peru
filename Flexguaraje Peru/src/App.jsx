import React from 'react';
import './index.css';

function App() {
  return (
    <div className="App">
      {/* ALEXANDERRRRRRR */}
      <nav>
        <div className="nav-container">
          <div className="nav-left">
            <h1>Flexguaraje Peru</h1>
          </div>
          <div className="nav-right">
            <ul>
              <li><a href="#informacion">Información</a></li>
              <li><a href="#texto">Precio</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CESARRRRRRRRRRRRRR */}
      <section id="informacion">
        <h2>Información</h2>
        <p>Aquí va la información sobre el garage.</p>
      </section>

      {/* LOHANAAAAAAAAAAA */}

      <section id="precio">
        <h2>Precios</h2>
        <div className="precio-content">
          <div className="precio-item">
            <h3>Plan Básico</h3>
            <p>Acceso a servicios básicos del garaje.</p>
            <p className="precio">$50 / mes</p>
          </div>
          <div className="precio-item">
            <h3>Plan Estándar</h3>
            <p>Incluye servicios adicionales como limpieza y mantenimiento.</p>
            <p className="precio">$100 / mes</p>
          </div>
          <div className="precio-item">
            <h3>Plan Premium</h3>
            <p>Acceso completo a todos los servicios, incluyendo asistencia 24/7.</p>
            <p className="precio">$150 / mes</p>
          </div>
        </div>
      </section>

      {/* CAMILAAAAAAAAAAAAAAA */}

      <section id="contacto">
        <h2>Contacto</h2>
        <p>Información de contacto del garageeeee.</p>
      </section>
    </div>











  );
}

export default App;
