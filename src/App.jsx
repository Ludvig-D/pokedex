import { useEffect, useState, useRef } from 'react';
import './App.css';
import PokemonList from './PokemonList';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFullData, setPokemonFullData] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    async function fetchPokemons() {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
      const newPokemons = await response.json();
      setPokemonList((prev) => [...prev, ...newPokemons.results]);
    }
    fetchPokemons();

    async function first20Pokemons() {
      try {
        for (let id = 1; id <= 42; id++) {
          let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          let data = await response.json();
          setPokemonFullData((prev) => [...prev, data]);
        }
      } catch (err) {
        console.log(err);
      }
    }

    first20Pokemons();
  }, []);

  console.log(pokemonFullData);

  return (
    <>
      <h1>Pokedex</h1>
      <PokemonList pokemons={pokemonFullData} />
    </>
  );
}

export default App;
