import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    async function fetchPokemons() {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
      const newPokemons = await response.json();
      setPokemons((prev) => [...prev, ...newPokemons.results]);
    }
    fetchPokemons();
  }, []);

  console.log(pokemons);
  return <></>;
}

export default App;
