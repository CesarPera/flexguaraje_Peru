import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidacionBD from './BASE DE DATOS/ValidacionBD';
import Swal from 'sweetalert2';
import { Eye, EyeOff } from 'lucide-react';
import "./login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email & !formData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacíos',
        text: 'Por favor, completa todos los campos.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    if (!formData.email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el Correo',
        text: 'El campo de correo no puede estar vacío.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    if (!formData.password.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la Contraseña',
        text: 'El campo de contraseña no puede estar vacío.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const emailPattern = /^[A-Za-zÁÉÍÓÚáéíóú]+_\d{8}@flexguaraje_peru\.com$/i;
    if (!emailPattern.test(formData.email.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Formato Incorrecto',
        text: 'El correo debe seguir el formato: apellidoPaterno_dni@flexguaraje_peru.com',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    try {
      const result = await ValidacionBD.login(formData.email.trim(), formData.password.trim());

      localStorage.setItem('nombreUsuario', result.message);
      navigate('/bienvenido_a_flexguaraje_peru');
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      }
    }
  };


  return (
    <div className='general-login'>
      <form onSubmit={handleSubmit} className='login-container'>
        <h2 className='form-title'>INICIAR SESIÓN</h2>
        <div className='input-group'>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className='animated-input'
          />
        </div>
        <div className='input-group contraseña-visible'>
          <input
            type={passwordVisibility ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className='animated-input'
          />
          <span onClick={togglePasswordVisibility}>
            {passwordVisibility ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        <button type="submit" className='animated-button'>Iniciar Sesión</button>
        <p onClick={() => navigate("/cambiar_contraseña")} className='toggle-text'>¿Cambiar Contraseña?</p>
      </form>
    </div>
  );
};

export default Login;