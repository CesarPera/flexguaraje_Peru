import React from "react";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom

function HeaderAdmin() {
    return (
        <>
            <header>
                {/* Usamos Link para redirigir al inicio */}
                <h1>
                    <Link to="/">Flexguaraje Perú</Link>
                </h1>
                <button>Cerrar Sesión</button>
            </header>
        </>
    );
}

export default HeaderAdmin;
