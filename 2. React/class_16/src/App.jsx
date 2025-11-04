// App.js
import React from 'react';
import Boton from './components/Boton';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CSS Modules en Acción</h1>
      <Boton tipo="primario">Botón Primario</Boton>
      <Boton >Botón Secundario</Boton>
    </div>
  );
}

export default App;