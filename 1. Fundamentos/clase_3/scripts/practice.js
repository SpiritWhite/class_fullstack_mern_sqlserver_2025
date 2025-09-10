document.addEventListener('DOMContentLoaded', function () {

  const form1 = document.getElementById('loginForm');

  function isValidEmail(email) {
    const revalidar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return revalidar.test(email);
  }

  form1.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!isValidEmail(username)) {
      alert('CORREO INVALIDO');
      return;
    }


    const data = {
      username,
      password
    };
    
    fetch('http://localhost:8181/api/v1/auth/sign-in', {
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