import React from 'react';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



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

      <section id="Precio">
        <h2>pRECIO</h2>
        <p>Contenido de texto relacionado con el garage.</p>
      </section>

      {/* CAMILAAAAAAAAAAAAAAA */}

      <section id="contacto">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
         <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
      </a>
      <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Flexguaraje-Perú</span>
    </div>
    <div class="d-inline-flex">
    <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-envelope mx-1" style={{ fontSize: '2rem' }}></i></a>
    <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook mx-1"style={{ fontSize: '2rem' }}></i></a>
    <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp mx-1" style={{ fontSize: '2rem' }}></i></a>
    <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram mx-1" style={{ fontSize: '2rem' }}></i></a>

    </div>
      </footer>
      </section>
    </div>











  );
}

export default App;
