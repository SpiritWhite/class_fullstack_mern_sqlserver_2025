// BotonEstilizado.js
import React from 'react';
import styled from 'styled-components';

// Crear un componente estilizado
const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Estilos dinámicos basados en props */
  background-color: ${props => 
    props.primario ? '#007bff' : 
    props.peligro ? '#dc3545' : '#6c757d'};
  color: white;
  
  /* Efecto hover */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  /* Estilos adicionales si está deshabilitado */
  ${props => props.deshabilitado && `
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}

  ${props => props.lock && `
    opacity: 0.4;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    },
    background-color: gray;
  `}
`;

function BotonEstilizado({ primario, peligro, deshabilitado, children, onClick, lock }) {
  return (
    <StyledButton 
      primario={primario} 
      peligro={peligro}
      deshabilitado={deshabilitado}
      onClick={onClick}
      lock={lock}
    >
      {children}
    </StyledButton>
  );
}

export default BotonEstilizado;