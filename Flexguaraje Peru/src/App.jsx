import React from 'react';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



function App() {
  return (
    <div className="App">
      {/* ID "inicio" para que el enlace nos lleve a esta sección */}
      <div id="inicio">
        <nav>
          <div className="nav-container">
            <div className="nav-left">
              <h1>Flexguaraje Peru</h1>
            </div>
            <div className="nav-right">
              <ul>
                <li><a href="#informacion">Información</a></li>
                <li><a href="#precio">Precio</a></li> {/* Cambié 'Precio' a 'precio' en minúscula */}
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Imagen debajo del nav */}
      <section>
        <div className='img-inicio'>
          <img src="https://juujbox.com/cdn/shop/articles/storage_units_1_1.png?v=1688497006" alt="" className='img-fluid' />
        </div>
      </section>

      {/* CESARRRRRRRRRRRRRR */}
      <section id="informacion">
        <div className='quienes-somos'>
          <div className='informacion-l'>
            <h2><b>¿Quienes somos?</b></h2>
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
            <h2><b>Objetivo</b></h2>
            <p>Ofrecer espacios de almacenamiento confiables y accesibles, que permitan a nuestros clientes tener una solución segura y conveniente para el resguardo de sus bienes.</p>
          </div>
        </div>

        <div className='mision'>
          <div className='informacion-l'>
            <h2><b>Misión</b></h2>
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
            <h2><b>Visión</b></h2>
            <p>Ser reconocidos como líderes en el sector de almacenamiento en Lima, destacándonos por nuestra innovación, calidad de servicio y compromiso con la satisfacción de nuestros clientes, fomentando una relación de confianza y tranquilidad.</p>
          </div>
        </div>
      </section>

      {/* LOHANAAAAAAAAAAA */}

      {/* Sección de Precio */}
      <section id="precio"> {/* Asegúrate de que el id sea 'precio' en minúscula */}
        <div className="precio-content">
          <div className="precio-item">
            <h2 className="precio">Precio</h2>
            <h3><b>Formula: m2 + (cantidad x Tiempo)</b></h3>
            <p>m2 = S/ 2<br />hora = S/ 10<br />dia = S/ 100<br />semana = S/ 500<br />mes = S/ 1800</p>
          </div>

        </div>
      </section>

      <section>
        <div className='mapa'>
          <h2><b>¿Donde encontrarnos?</b></h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4132.558129496107!2d-77.00147639611748!3d-12.016518150333596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f336d16f49%3A0x91c6ced90a797ea9!2sZegel%20-%20San%20Juan%20de%20Lurigancho!5e1!3m2!1ses-419!2spe!4v1731299514254!5m2!1ses-419!2spe" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps Embed"></iframe>
        </div>
      </section>

      {/* CAMILAAAAAAAAAAAAAAA */}

      <section id="contacto">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div class="col-md-4 d-flex align-items-center">
            <a href="" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
              <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap" /></svg>
            </a>
            <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Flexguaraje Perú</span>
          </div>
          <div class="d-inline-flex">
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJTKXHpkSrwVZClLbkZzszSrbczPBkhRKthmTdbqmdFnmZFtpmWmPLJlsFHsVmmrtzxsHBV" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-envelope mx-1" style={{ fontSize: '3rem', color: '#000' }}></i> {/* Color negro para correo */}
            </a>
            <a href="https://www.facebook.com/cesar.pera.oficial" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook mx-1" style={{ fontSize: '3rem' }}></i></a>
            <a href="https://wa.me/51934110870" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-whatsapp mx-1" style={{ fontSize: '3rem', color: '#25D366' }}></i> {/* Color de WhatsApp */}
            </a>
            <a href="https://www.instagram.com/cesar_pera_08/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram mx-1 text-danger" style={{ fontSize: '3rem' }}></i> {/* Color de peligro de Bootstrap */}
            </a>

          </div>
        </footer>
      </section>
    </div>



  );
}

export default App;
