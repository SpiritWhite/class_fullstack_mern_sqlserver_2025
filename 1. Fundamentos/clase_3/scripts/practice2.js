document.addEventListener('DOMContentLoaded', function () {

  const form1 = document.getElementById('registerForm');

  function isValidEmail(email) {
    const revalidar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return revalidar.test(email);
  }

  form1.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!isValidEmail(email)) {
      alert('CORREO INVALIDO');
      return;
    }

    if (password !== confirmPassword) {
      alert('VALIDAR CONTRASENA');
    }

    const data = {
      username,
      email,
      password
    };
    
    fetch('http://localhost:8181/api/v1/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(result => result.json())
      .then(console.log);

  });

});