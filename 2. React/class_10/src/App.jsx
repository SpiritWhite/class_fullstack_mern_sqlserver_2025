import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './components/InputForm'


function App() {
  const [forms, setForms] = useState({
    name: 'Carlos',
    lastName: 'Rodriguez',
    email: 'crodriguez@gmail.com'
  });

  const onChange = (e) => {
    setForms(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;

    const formData = new FormData(form);

    const values = Object.fromEntries(formData.entries());

    console.log(values);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div
        className="card"
      >
        <form
          action="post"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '50%',
            alignItems: 'center'
          }}
          onSubmit={onSubmit}
        >
          <InputForm
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            onChange={onChange}
            values={forms}
          />
          <InputForm
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Apellido"
            onChange={onChange}
            values={forms}
          />
          <InputForm
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={onChange}
            values={forms}
          />
          <div>
            <input type="submit" value="Guardar" />
          </div>
        </form>
        <p>Hola Soy {forms.name} {forms.lastName}, y mi correo es {forms.email}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
