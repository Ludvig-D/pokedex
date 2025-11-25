import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import PokemonList from './pages/PokemonList/PokemonList';
import PokemonItem from './pages/PokemonItem/PokemonItem';
import HomePage from './pages/Home/HomePage';

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
