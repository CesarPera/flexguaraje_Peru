import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link de react-router-dom

function ListaAdmin() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className={`overlay ${isExpanded ? "active" : ""}`} />
            <div className={`vertical-menu ${isExpanded ? "expanded" : "collapsed"}`}>
                {/* Imagen que actúa como botón */}
                <div className="logo-container" onClick={toggleMenu}>
                    <img
                        src="https://img.icons8.com/?size=100&id=7KAwJfCSQ1MV&format=png&color=000000"
                        alt="Logo"
                        className="logo-img"
                    />
                </div>
                {/* Opciones del menú */}
                <ul className="menu-items">
                    <li className="menu-item">
                        {!isExpanded && <span className="short-label">C</span>}
                        {isExpanded && (
                            <Link to="/clientes">
                                <span className="full-label animate">Clientes</span>
                            </Link>
                        )}
                    </li>
                    <li className="menu-item">
                        {!isExpanded && <span className="short-label">E</span>}
                        {isExpanded && (
                            <Link to="/espacios">
                                <span className="full-label animate">Espacios</span>
                            </Link>
                        )}
                    </li>
                    <li className="menu-item">
                        {!isExpanded && <span className="short-label">S</span>}
                        {isExpanded && (
                            <Link to="/servicios">
                                <span className="full-label animate">Servicios</span>
                            </Link>
                        )}
                    </li>
                    <li className="menu-item">
                        {!isExpanded && <span className="short-label">R</span>}
                        {isExpanded && (
                            <Link to="/reportes">
                                <span className="full-label animate">Reportes</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ListaAdmin;
