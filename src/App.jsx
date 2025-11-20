import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import './css/App.css';
import PokemonList from './pages/PokemonList';
import PokemonItem from './pages/PokemonItem';
import HomePage from './components/HomePage';

function App() {
  return (
    <>
      <h1>Pokedex</h1>
      <BrowserRouter>
        <nav>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'pokemons'}>All pokemons</NavLink>
        </nav>
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
