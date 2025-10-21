import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  // Expresiones regulares para validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const togglePasswordVisibility = () => {
    setShowPwd(!showPwd);
  };

  const toggleConfirmPasswordVisibility = () => {
    showConfirmPwd(!setShowConfirmPwd);
  };

  // Validaciones
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'El nombre es requerido';
        } else if (value.length < 2) {
          newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete newErrors.firstName;
        }
        break;

      case 'lastName':
        if (!isLogin && !value.trim()) {
          newErrors.lastName = 'El apellido es requerido';
        } else if (!isLogin && value.length < 2) {
          newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
        } else {
          delete newErrors.lastName;
        }
        break;

      case 'username':
        if (!value.trim()) {
          newErrors.username = 'El usuario es requerido';
        } else if (!usernameRegex.test(value)) {
          newErrors.username = 'Usuario debe tener 4-20 caracteres (solo letras, números y _)';
        } else {
          delete newErrors.username;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'El email es requerido';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Formato de email inválido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida';
        } else if (!passwordRegex.test(value)) {
          newErrors.password = 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!isLogin && value !== formData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar el campo después de cambiar
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Manejo de blur (cuando el usuario sale del campo)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    validateField(name, value);
  };

  // Validación completa del formulario
  const validateForm = () => {
    const newTouched = {};
    const newErrors = {};

    // Marcar todos los campos como tocados
    Object.keys(formData).forEach(key => {
      if ((isLogin && ['email', 'password'].includes(key)) || 
          (!isLogin && formData[key])) {
        newTouched[key] = true;
      }
    });

    setTouched(newTouched);

    // Validar cada campo requerido
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número';
    }

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'El nombre es requerido';
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = 'El apellido es requerido';
      }

      if (!formData.username.trim()) {
        newErrors.username = 'El usuario es requerido';
      } else if (!usernameRegex.test(formData.username)) {
        newErrors.username = 'Usuario debe tener 4-20 caracteres (solo letras, números y _)';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica de autenticación
      console.log('Formulario válido:', formData);
      alert(`${isLogin ? 'Login' : 'Registro'} exitoso!`);
      
      // Limpiar formulario después del envío exitoso
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setTouched({});
      setErrors({});
    }
  };

  // Cambiar entre login y registro
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setTouched({});
    setShowPwd(false);
    setShowConfirmPwd(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">Nombre</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Ingresa tu nombre"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Ingresa tu apellido"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username.toLowerCase()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username ? 'error' : ''}
                  placeholder="Crea un nombre de usuario"
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? 'error' : ''}
              placeholder="tu@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password ? 'error' : ''}
                placeholder="Ingresa tu contraseña"
              />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPwd ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Repite tu contraseña"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={showConfirmPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPwd ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={Object.keys(errors).length > 0}
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button type="button" onClick={toggleMode} className="toggle-btn">
              {isLogin ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;