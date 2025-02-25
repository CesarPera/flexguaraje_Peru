import { Navigate, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const ProtegerRutasUrl = ({ allowedRoles }) => {
    const rolUsuario = localStorage.getItem("rolUsuario"); // Obtener el rol del usuario
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const location = useLocation();

    if (!rolUsuario || !nombreUsuario) {
        Swal.fire({
            icon: "warning",
            title: "Acceso Restringido",
            text: "Debes iniciar sesión para acceder a esta página.",
            showConfirmButton: false,
            timer: 3000
        });

        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(rolUsuario)) {
        Swal.fire({
            icon: "error",
            title: "Acceso Denegado",
            text: "No tienes el rol necesario para acceder a esta página.",
            showConfirmButton: false,
            timer: 3000
        });
        return <Navigate to="/bienvenido_a_flexguaraje_peru" replace />; // Si no tiene permisos, redirige
    }

    return <Outlet />; // Renderiza la ruta protegida
};

export default ProtegerRutasUrl;
