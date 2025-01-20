import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Usamos el hook useNavigate

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handlePasswordChangeMode = () => {
    setIsChangingPassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChangingPassword) {
      alert('Contraseña actualizada con éxito.');
    } else if (isRegistering) {
      // Simulamos la creación de cuenta
      alert('Cuenta creada con éxito.');
      navigate("/bienvenido_a_flexguaraje_peru"); // Redirige a la página de bienvenida después de crear la cuenta
    } else {
      alert('Inicio de sesión exitoso.');
      navigate("/bienvenido_a_flexguaraje_peru"); // Redirige a la página de bienvenida después de iniciar sesión
    }
  };

  return (
    <div className='general-login'>
      <div className="login-container">
        {!isChangingPassword ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">{isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
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
            <button type="submit" className="animated-button">
              {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </button>
            <p className="toggle-text" onClick={handlePasswordChangeMode}>
              {isRegistering ? '' : 'Crear Cuenta'}
            </p>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Cambiar Contraseña</h2>
            <div className="input-group">
              <label htmlFor="email" className="animated-label">Nombre de usuario</label>
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
              <label htmlFor="oldPassword" className="animated-label">Correo electronico</label>
              <input
                type="password"
                id="oldPassword"
                className="animated-input"
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
                required
                placeholder=" "
              />
            </div>
            <button type="submit" className="animated-button">Actualizar Contraseña</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;