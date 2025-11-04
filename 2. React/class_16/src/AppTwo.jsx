// App.js
import React, { useState } from 'react';
import BotonEstilizado from './components/BotonEstilizado';
import './App.css';

function App() {
  const [contador, setContador] = useState(0);
  
  return (
    <div className="App">
      <h1>Styled Components en Acción</h1>
      <p>Contador: {contador}</p>
      
      <BotonEstilizado 
        primario 
        onClick={() => setContador(contador + 1)}
        lock
      >
        Incrementar
      </BotonEstilizado>
      
      <BotonEstilizado 
        peligro 
        onClick={() => setContador(contador - 1)}
      >
        Decrementar
      </BotonEstilizado>
      
      <BotonEstilizado 
        deshabilitado={contador === 0}
        onClick={() => setContador(0)}
      >
        Reiniciar
      </BotonEstilizado>
    </div>
  );
}

export default App;