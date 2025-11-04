// Boton.js
import React from 'react';
import styles from './Boton.module.css';

function Boton({ tipo, children, onClick }) {
  const claseBoton = `${styles.boton} ${styles[tipo] || styles.secundario}`;
  
  return (
    <button className={claseBoton} onClick={onClick}>
      {children}
    </button>
  );
}

export default Boton;