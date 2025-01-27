import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBD from './BASE DE DATOS/LoginBD'; // Asegúrate de que la ruta sea correcta
import './login.css';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { Eye, EyeOff } from 'lucide-react'; // Íconos para mostrar/ocultar contraseña

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState(""); // Declaración del estado
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    repeatPassword: '',
    oldPassword: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const normalizeString = (str) => {
    const map = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'ñ': 'n', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
    };
    return str.split('').map(char => map[char] || char).join('');
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
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }

      if (!formData.email) {
        Swal.fire({
          icon: 'error',
          title: 'Completar Datos en el Correo Electrónico',
          text: 'Por favor, ingresa tu correo electrónico.',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }

      if (!formData.password) {
        Swal.fire({
          icon: 'error',
          title: 'Completar Datos en la Contraseña',
          text: 'Por favor, ingresa tu contraseña.',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }

      const normalizedEmail = normalizeString(formData.email.toLowerCase());

      try {
        const result = await LoginBD.login(normalizedEmail.trim(), formData.password);

        const nombreCompleto = `${result.nombre} ${result.apellidoPaterno} ${result.apellidoMaterno}`;
        localStorage.setItem("nombreUsuario", nombreCompleto); // Guardar en localStorage

        setNombreUsuario(nombreCompleto); // Actualizar el estado

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
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }

      // Validación de si las contraseñas coinciden
      if (formData.newPassword !== formData.repeatPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
          text: 'La nueva contraseña y la repetición deben coincidir.',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }

      try {
        await LoginBD.cambiarContraseña(formData.email, formData.oldPassword, formData.newPassword, formData.repeatPassword);
        Swal.fire({
          icon: 'success',
          title: 'Contraseña Actualizada',
          text: 'Tu contraseña se ha actualizado exitosamente.',
          showConfirmButton: false,
          timer: 3000
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
            <h2 className="form-title">INICIAR SESIÓN</h2>
            <div className="input-group">
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
            <div className="input-group contraseña-visible">
              <input
                type={passwordVisibility.password ? 'text' : 'password'}
                id="password"
                name="password"
                className="animated-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
              <span
                className="password-toggle"
                onClick={() => togglePasswordVisibility('password')}
              >
                {passwordVisibility.password ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <button type="submit" className="animated-button">Iniciar Sesión</button>
            <p className="toggle-text" onClick={handlePasswordChangeMode}>¿Cambiar Contraseña?</p>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">CAMBIAR CONTRASEÑA</h2>
            <div className="input-group">
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
            <div className="input-group contraseña-visible">
              <input
                type={passwordVisibility.oldPassword ? 'text' : 'password'}
                id="oldPassword"
                name="oldPassword"
                className="animated-input"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Contraseña actual"
              />
              <span
                className="password-toggle"
                onClick={() => togglePasswordVisibility('oldPassword')}
              >
                {passwordVisibility.oldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="input-group contraseña-visible">
              <input
                type={passwordVisibility.newPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                className="animated-input"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Nueva contraseña"
              />
              <span
                className="password-toggle"
                onClick={() => togglePasswordVisibility('newPassword')}
              >
                {passwordVisibility.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="input-group contraseña-visible">
              <input
                type={passwordVisibility.repeatPassword ? 'text' : 'password'}
                id="repeatPassword"
                name="repeatPassword"
                className="animated-input"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repetir nueva contraseña"
              />
              <span
                className="password-toggle"
                onClick={() => togglePasswordVisibility('repeatPassword')}
              >
                {passwordVisibility.repeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
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
