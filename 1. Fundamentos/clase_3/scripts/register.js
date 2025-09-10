document.addEventListener('DOMContentLoaded', function() {
            // Referencias a formularios
            const registerForm = document.getElementById('registerForm');
            
            // Referencias a mensajes
            const successMessage = document.getElementById('successMessage');
            
            // Referencias a enlaces de navegación
            const goToLogin = document.getElementById('goToLogin');
            
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
            
            // Manejo del formulario de registro
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                hideErrors();
                
                const username = document.getElementById('username').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                let isValid = true;
                
                if (!username) {
                    showError('usernameError', 'El nombre completo es requerido');
                    isValid = false;
                }
                
                if (!email) {
                    showError('emailError', 'El email es requerido');
                    isValid = false;
                } else if (!isValidEmail(email)) {
                    showError('emailError', 'El formato del email no es válido');
                    isValid = false;
                }
                
                if (!password) {
                    showError('regPasswordError', 'La contraseña es requerida');
                    isValid = false;
                } else if (!isValidPassword(password)) {
                    showError('regPasswordError', 'La contraseña debe tener al menos 6 caracteres');
                    isValid = false;
                }
                
                if (password !== confirmPassword) {
                    showError('confirmPasswordError', 'Las contraseñas no coinciden');
                    isValid = false;
                }
                
                // Verificar si el email ya existe
                if (users.some(user => user.email === email)) {
                    showError('emailError', 'Este email ya está registrado');
                    isValid = false;
                }
                
                if (!isValid) return;
                
                // Crear nuevo usuario
                const newUser = {
                    id: Date.now(),
                    username,
                    email,
                    password,
                    // username: email.split('@')[0] // username por defecto
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                showMessage(successMessage, '¡Registro exitoso! Ahora puedes iniciar sesión.');
                registerForm.reset();
                
                // Simular envío de email de confirmación
                setTimeout(() => {
                    alert(`Se ha enviado un email de confirmación a ${email}`);
                }, 1000);
            });        
            
            // Navegación entre formularios            
            goToLogin.addEventListener('click', function() {
                document.querySelector('.login-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
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