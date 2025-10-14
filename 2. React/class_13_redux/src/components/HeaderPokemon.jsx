import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
// import { usePokemon } from '../context/PokemonContext';
import './Header.css';
import { selectCaughtPokemons } from '../redux/selector/selector';

const HeaderPokemon = () => {
  const caughtPokemons = useSelector(selectCaughtPokemons);
  // const { caughtPokemons } = usePokemon();
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate('/');
  };

  const handleCaughtClick = (e) => {
    e.stopPropagation(); // Evitar que se active el click del header
    navigate('/caught');
  };

  return (
    <div className="header" onClick={handleHeaderClick}>
      <div className="header-content">
        <h1 className="header-title">Pokédex App</h1>
        <div 
          className="pokeball-counter"
          onClick={handleCaughtClick}
        >
          <div className="pokeball-icon">
            <div className="pokeball-top"></div>
            <div className="pokeball-center"></div>
            <div className="pokeball-bottom"></div>
          </div>
          <span className="counter-text">
            Atrapados: {caughtPokemons?.length}
          </span>
          <div className="counter-tooltip">Ver mis pokémones</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPokemon;