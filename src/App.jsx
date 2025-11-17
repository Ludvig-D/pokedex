import { useEffect, useState, useRef } from 'react';
import './App.css';
import PokemonList from './PokemonList';

function App() {
  // const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFullData, setPokemonFullData] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    // fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    //   .then((response) => response.json())
    //   .then((data) => setPokemonList((prev) => [...prev, ...data.results]));

    async function fetchFirstPokemons() {
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

    fetchFirstPokemons();
  }, []);

  const fetchData = async () => {
    if (!hasFetched.current) return;

    try {
      for (
        let id = pokemonFullData.length + 1;
        id <= pokemonFullData.length + 6;
        id++
      ) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data = await response.json();
        setPokemonFullData((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Pokedex</h1>
      <PokemonList pokemons={pokemonFullData} fetchData={fetchData} />
    </>
  );
}

export default App;
