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
              <li><a href="#Precio">Precio</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CESARRRRRRRRRRRRRR */}
      <section id="informacion">
        <div className='quienes-somos'>
          <div className='informacion-l'>
            <h2>¿Quienes somos?</h2>
            <p>FlexGuaraje Perú es una empresa dedicada al alquiler de espacios de almacenamiento para personas y empresas. Nuestro objetivo es brindar soluciones prácticas y seguras para el resguardo de bienes, adaptándonos a las necesidades de cada cliente. Nos especializamos en ofrecer mini-almacenes tipo garaje con una ubicación conveniente en la ciudad de Lima.</p>
          </div>
          <div className='informacion-i'>
            <img src="https://s3.eu-west-1.amazonaws.com/bucketeer-e01fe271-7b8b-4ee5-b0b3-cc60bc326895/blog/is-self-storage-commercial-or-industrial/cover/facility-indoor-green.jpg" alt="img-garaje" />
          </div>
        </div>

        <div className='objetivo'>
          <div className='informacion-i'>
            <img src="https://concepto.de/wp-content/uploads/2019/12/objetivo-general-e1576544846604.jpg" alt="objetivo-empresa" />
          </div>
          <div className='informacion-l'>
            <h2>Objetivo</h2>
            <p>Ofrecer espacios de almacenamiento confiables y accesibles, que permitan a nuestros clientes tener una solución segura y conveniente para el resguardo de sus bienes.</p>
          </div>
        </div>

        <div className='mision'>
          <div className='informacion-l'>
            <h2>Misión</h2>
            <p>Brindar un servicio de almacenamiento de alta calidad, caracterizado por la seguridad, accesibilidad y atención personalizada. Nos esforzamos por ser la opción preferida de empresas y personas que buscan un espacio seguro y práctico para almacenar sus pertenencias.</p>
          </div>
          <div className='informacion-i'>
            <img src="https://img.freepik.com/foto-gratis/retrato-guardia-seguridad-masculino-estacion-radio-pantallas-camara_23-2150368714.jpg" alt="mision-empresa" />
          </div>
        </div>

        <div className='vision'>
          <div className='informacion-i'>
            <img src="https://media.istockphoto.com/id/1393131806/es/vector/trofeo-al-%C3%A9xito-empresarial-los-ganadores-de-negocios-suben-las-escaleras-hacia-el-cielo.jpg?s=612x612&w=0&k=20&c=IZIwp1cdUVb880BDL3RuNhPt-4rBN9X4O4aKY9EYnrc=" alt="vision-empresa" />
          </div>
          <div className='informacion-l'>
            <h2>Visión</h2>
            <p>Ser reconocidos como líderes en el sector de almacenamiento en Lima, destacándonos por nuestra innovación, calidad de servicio y compromiso con la satisfacción de nuestros clientes, fomentando una relación de confianza y tranquilidad.</p>
          </div>
        </div>
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
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div class="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
              <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap" /></svg>
            </a>
            <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Flexguaraje-Perú</span>
          </div>
          <div class="d-inline-flex">
            <a href="mailto:tu-email@ejemplo.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-envelope mx-1" style={{ fontSize: '2rem', color: '#000' }}></i> {/* Color negro para correo */}
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook mx-1" style={{ fontSize: '2rem' }}></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-whatsapp mx-1" style={{ fontSize: '2rem', color: '#25D366' }}></i> {/* Color de WhatsApp */}
            </a>
            <i className="bi bi-instagram mx-1 text-danger" style={{ fontSize: '2rem' }}></i> {/* Color de peligro de Bootstrap */}

          </div>
        </footer>
      </section>
    </div>











  );
}

export default App;
