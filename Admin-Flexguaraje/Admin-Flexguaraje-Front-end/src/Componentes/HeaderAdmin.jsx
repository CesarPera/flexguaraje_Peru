import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderAdmin() {
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem("nombreUsuario") || ""); // Inicializa con lo que está en localStorage

    useEffect(() => {
        // Actualizar el estado cuando el componente se monta
        const nombreCompleto = localStorage.getItem("nombreUsuario");
        setNombreUsuario(nombreCompleto || ""); // Actualiza el estado con el nombre
    }, []); // Solo se ejecuta una vez al montar el componente

    const handleBackToHome = () => {
        // Limpiar el nombre del usuario en localStorage
        localStorage.removeItem("nombreUsuario");

        // Actualizar el estado de nombreUsuario para que se refleje en la UI
        setNombreUsuario("");

        // Redirigir al login o página principal
        navigate("/");
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

                    <div className="login-datos">
                        {/* Mostrar el nombre completo o "Usuario Invitado" si no está disponible */}
                        <h3>{nombreUsuario || "Usuario Invitado"}</h3>
                        <button onClick={handleBackToHome}>Cerrar sesión</button>
                    </div>

                </div>
            </header>
        </>
    );
}

export default HeaderAdmin;
