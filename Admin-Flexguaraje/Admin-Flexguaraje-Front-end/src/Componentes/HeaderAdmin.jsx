import React from "react";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import { useNavigate } from 'react-router-dom';

function HeaderAdmin() {
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate("/");  // Redirige a la página de login o página principal
    };

    return (
        <>
            <header>
                {/* Usamos Link para redirigir al inicio */}
                <div className="header-contenido">
                    <div>
                        <h1>
                            <Link to="/bienvenido_a_flexguaraje_peru">Flexguaraje Perú</Link>
                        </h1>
                    </div>

                    {/*<button>Cerrar Sesión</button>*/}
                    <div className="login-datos">
                        <h3>CESAR DANIEL CARHUAS ALDANA</h3>
                        <button onClick={handleBackToHome}>cerrar sesion</button>
                    </div>

                </div>
            </header>
        </>
    );
}

export default HeaderAdmin;
