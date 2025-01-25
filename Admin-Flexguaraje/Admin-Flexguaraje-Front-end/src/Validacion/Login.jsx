import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBD from './BASE DE DATOS/LoginBD'; // Asegúrate de que la ruta sea correcta
import './login.css';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const Login = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    repeatPassword: '',
    oldPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChangeMode = () => {
    setIsChangingPassword(true);
    setErrorMessage('');
    // Limpiar los campos de login cuando se cambia a cambiar contraseña
    setFormData({
      email: '',
      password: '',
      newPassword: '',
      repeatPassword: '',
      oldPassword: '',
    });
  };

  const handleLoginMode = () => {
    setIsChangingPassword(false);
    setErrorMessage('');
    // Limpiar los campos de cambio de contraseña cuando se cambia a login
    setFormData({
      email: '',
      password: '',
      newPassword: '',
      repeatPassword: '',
      oldPassword: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChangingPassword) {
      // Validación de campos vacíos de forma individual
      if (!formData.email && !formData.password) {
        Swal.fire({
          icon: 'error',
          title: 'Campos Sin Datos',
          text: 'Por favor, ingresa tu correo electrónico y tu contraseña.',
        });
        return;
      }
  
      if (!formData.email) {
        Swal.fire({
          icon: 'error',
          title: 'Completar Datos en el Correo Electrónico',
          text: 'Por favor, ingresa tu correo electrónico.',
        });
        return;
      }
  
      if (!formData.password) {
        Swal.fire({
          icon: 'error',
          title: 'Completar Datos en la Contraseña',
          text: 'Por favor, ingresa tu contraseña.',
        });
        return;
      }
  
      try {
        const result = await LoginBD.login(formData.email, formData.password);
        navigate("/bienvenido_a_flexguaraje_peru");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    } else {
      // Si estamos en el modo de cambio de contraseña
      // Validación de campos vacíos para cambio de contraseña
      if (!formData.oldPassword || !formData.newPassword || !formData.repeatPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Campos Sin Datos',
          text: 'Por favor, ingresa todos los campos para cambiar la contraseña.',
        });
        return;
      }
  
      // Validación de si las contraseñas coinciden
      if (formData.newPassword !== formData.repeatPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
          text: 'La nueva contraseña y la repetición deben coincidir.',
        });
        return;
      }
  
      try {
        await LoginBD.cambiarContraseña(formData.email, formData.oldPassword, formData.newPassword, formData.repeatPassword);
        Swal.fire({
          icon: 'success',
          title: 'Contraseña Actualizada',
          text: 'Tu contraseña se ha actualizado exitosamente.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Limpiar los campos después de la actualización de la contraseña
          setFormData({
            email: '',
            password: '',
            newPassword: '',
            repeatPassword: '',
            oldPassword: '',
          });
          navigate('/'); // Redirigir al inicio o a la página deseada
        });
        setIsChangingPassword(false);
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
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
                type="text"
                id="email"
                name="email"
                className="animated-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="animated-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="animated-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </div>
            <button type="submit" className="animated-button">Iniciar Sesión</button>
            <p className="toggle-text" onClick={handlePasswordChangeMode}>¿Cambiar Contraseña?</p>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Cambiar Contraseña</h2>
            <div className="input-group">
              <label htmlFor="email" className="animated-label">Correo Electrónico</label>
              <input
                type="text"
                id="email"
                name="email"
                className="animated-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="input-group">
              <label htmlFor="oldPassword" className="animated-label">Contraseña Actual</label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="animated-input"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Contraseña actual"
              />
            </div>
            <div className="input-group">
              <label htmlFor="newPassword" className="animated-label">Nueva Contraseña</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="animated-input"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Nueva contraseña"
              />
            </div>
            <div className="input-group">
              <label htmlFor="repeatPassword" className="animated-label">Repetir Nueva Contraseña</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                className="animated-input"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repetir nueva contraseña"
              />
            </div>
            <button type="submit" className="animated-button">Actualizar Contraseña</button>
            <p className="toggle-text" onClick={handleLoginMode}>¿Volver a Iniciar Sesión?</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
