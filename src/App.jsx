import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import './App.css';
import PokemonList from './pages/PokemonList';
import PokemonItem from './pages/PokemonItem';

function App() {
  // const [pokemonList, setPokemonList] = useState([]);

  return (
    <>
      <h1>Pokedex</h1>
      <BrowserRouter>
        <nav>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'pokemons'}>All pokemons</NavLink>
        </nav>
        <Routes>
          <Route path="pokemons" element={<PokemonList />} />
          <Route path="pokemons/:id" element={<PokemonItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
