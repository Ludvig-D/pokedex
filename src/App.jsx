import { Routes, Route } from 'react-router-dom';
import './App.css';
import PokemonList from './pages/PokemonList';
import PokemonItem from './pages/PokemonItem';

function App() {
  // const [pokemonList, setPokemonList] = useState([]);

  return (
    <>
      <h1>Pokedex</h1>
      <Routes>
        <Route path="pokemons" element={<PokemonList />} />
        <Route path="pokemons/:id" element={<PokemonItem />} />
      </Routes>
    </>
  );
}

export default App;
