import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBD from './BASE DE DATOS/LoginBD';  // Asegúrate de que la ruta sea correcta
import './login.css';

const Login = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar los errores

  const navigate = useNavigate();

  const handlePasswordChangeMode = () => {
    setIsChangingPassword(true);
    setErrorMessage(''); // Limpiar el mensaje de error al cambiar al modo de cambio de contraseña
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos para el inicio de sesión
    if (!isChangingPassword) {
      if (!email || !password) {
        setErrorMessage('Por favor, completa todos los campos');
        return; // No enviar el formulario si algún campo está vacío
      }
    }

    // Validación de campos vacíos para cambiar contraseña
    if (isChangingPassword) {
      if (!oldPassword || !newPassword) {
        setErrorMessage('Por favor, completa todos los campos');
        return; // No enviar el formulario si algún campo está vacío
      }

      // Validación para que las contraseñas sean diferentes
      if (oldPassword === newPassword) {
        setErrorMessage('La nueva contraseña no puede ser igual a la actual');
        return;
      }

      try {
        // Cambiar la contraseña
        await LoginBD.cambiarContraseña(email, oldPassword, newPassword, newPassword);
        setIsChangingPassword(false); // Regresar al modo inicial
        setErrorMessage(''); // Limpiar mensaje de error
        navigate("/bienvenido_a_flexguaraje_peru"); // Redirige a la página de bienvenida
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        setErrorMessage(error.message);  // Mostrar el mensaje de error
      }
    } else {
      // Iniciar sesión
      try {
        const result = await LoginBD.login(email, password);
        navigate("/bienvenido_a_flexguaraje_peru"); // Redirige a la página de bienvenida
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        setErrorMessage(error.message); // Mostrar el mensaje de error
      }
    }
  };

  return (
    <div className='general-login'>
      <div className="login-container">
        {!isChangingPassword ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Iniciar Sesión</h2>
            <div className="input-group">
              <label htmlFor="email" className="animated-label">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                className="animated-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="animated-label">Contraseña</label>
              <input
                type="password"
                id="password"
                className="animated-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar error */}
            <button type="submit" className="animated-button">
              Iniciar Sesión
            </button>
            <p className="toggle-text" onClick={handlePasswordChangeMode}>
              ¿Olvidaste tu contraseña?
            </p>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Cambiar Contraseña</h2>
            <div className="input-group">
              <label htmlFor="email" className="animated-label">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                className="animated-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
              />
            </div>
            <div className="input-group">
              <label htmlFor="oldPassword" className="animated-label">Contraseña Actual</label>
              <input
                type="password"
                id="oldPassword"
                className="animated-input"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder=" "
              />
            </div>
            <div className="input-group">
              <label htmlFor="newPassword" className="animated-label">Nueva Contraseña</label>
              <input
                type="password"
                id="newPassword"
                className="animated-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder=" "
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar error */}
            <button type="submit" className="animated-button">Actualizar Contraseña</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;