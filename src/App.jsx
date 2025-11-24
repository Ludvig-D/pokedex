import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';

import './css/App.css';
import PokemonList from './pages/PokemonList';
import PokemonItem from './pages/PokemonItem';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="pokemons" element={<PokemonList />} />
          <Route path="pokemons/:id" element={<PokemonItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
