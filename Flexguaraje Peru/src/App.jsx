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
              <li><a href="#texto">Texto</a></li>
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

      <section id="texto">
        <h2>Texto</h2>
        <p>Contenido de texto relacionado con el garage.</p>
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
