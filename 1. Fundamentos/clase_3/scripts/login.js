document.addEventListener('DOMContentLoaded', function() {
            // Referencias a formularios
            const loginForm = document.getElementById('loginForm');
            
            // Referencias a mensajes
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // Referencias a enlaces de navegación
            const goToRegister = document.getElementById('goToRegister');
            const resetPasswordLink = document.getElementById('resetPasswordLink');
            
            // Almacenamiento de usuarios (simulado)
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Función para mostrar mensajes
            function showMessage(element, text = '') {
                if (text) element.textContent = text;
                element.style.display = 'block';
                setTimeout(() => {
                    element.style.display = 'none';
                }, 5000);
            }
            
            // Función para mostrar errores en campos
            function showError(fieldId, message) {
                const errorField = document.getElementById(fieldId);
                errorField.textContent = message;
                errorField.style.display = 'block';
            }
            
            // Función para ocultar errores
            function hideErrors() {
                const errors = document.querySelectorAll('.error-message');
                errors.forEach(error => error.style.display = 'none');
            }
            
            // Función para validar email
            function isValidEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            // Función para validar contraseña
            function isValidPassword(password) {
                return password.length >= 6;
            }
            
            // Manejo del formulario de login
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                hideErrors();
                
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value;
                
                let isValid = true;
                
                if (!username) {
                    showError('usernameError', 'El nombre de usuario o email es requerido');
                    isValid = false;
                }
                
                if (!password) {
                    showError('passwordError', 'La contraseña es requerida');
                    isValid = false;
                }
                
                if (!isValid) return;
                
                // Simular verificación de credenciales
                const user = users.find(u => 
                    (u.username === username || u.email === username) && u.password === password
                );
                
                if (user) {
                    showMessage(successMessage, '¡Inicio de sesión exitoso! Redirigiendo...');
                    loginForm.reset();
                    
                    // Simular redirección
                    setTimeout(() => {
                        alert('Redirigiendo al dashboard...');
                    }, 1500);
                } else {
                    showMessage(errorMessage, 'Credenciales incorrectas. Por favor, verifica tus datos.');
                }
            });
            
            
            // Navegación entre formularios
            goToRegister.addEventListener('click', function() {
                document.querySelector('.register-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
            
            // Restablecer contraseña
            resetPasswordLink.addEventListener('click', function() {
                const email = prompt('Por favor, ingresa tu email para restablecer la contraseña:');
                if (email) {
                    if (isValidEmail(email)) {
                        const userExists = users.some(user => user.email === email);
                        if (userExists) {
                            alert(`Se ha enviado un enlace de restablecimiento a ${email}`);
                        } else {
                            alert('No existe una cuenta con ese email');
                        }
                    } else {
                        alert('Por favor, ingresa un email válido');
                    }
                }
            });
            
            // Mejora de experiencia: mostrar sugerencias de contraseña
            const passwordField = document.getElementById('password');
            const confirmPasswordField = document.getElementById('confirm-password');
            
            passwordField.addEventListener('input', function() {
                if (this.value.length > 0 && this.value.length < 6) {
                    showError('regPasswordError', 'La contraseña es demasiado corta (mínimo 6 caracteres)');
                } else {
                    document.getElementById('regPasswordError').style.display = 'none';
                }
            });
            
            confirmPasswordField.addEventListener('input', function() {
                if (this.value !== passwordField.value) {
                    showError('confirmPasswordError', 'Las contraseñas no coinciden');
                } else {
                    document.getElementById('confirmPasswordError').style.display = 'none';
                }
            });
        });