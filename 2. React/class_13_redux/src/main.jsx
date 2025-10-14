import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'
import NotFound from './components/NotFound.jsx';
import ItemPage from './pages/ItemPage.jsx';
// import { PokemonProvider } from './context/PokemonProvider.jsx';
import HeaderPokemon from './components/HeaderPokemon.jsx';
import CaughtPokemons from './pages/CaughtPokemons.jsx';
import store from './redux/store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HeaderPokemon />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pokemon/:id" element={<ItemPage />} />
          <Route path="/caught" element={<CaughtPokemons />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
