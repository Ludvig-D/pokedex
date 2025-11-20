import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect, useRef } from 'react';

import '../css/PokemonList.css';

import PokemonListItem from '../components/PokemonListItem';

export default function PokemonList() {
  const [masterPokemonList, setMasterPokemonList] = useState([]);
  const [pokemonFullData, setPokemonFullData] = useState([]);
  const [currentList, setCurrentList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    function createMasterList() {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
        .then((response) => response.json())
        .then((allData) => {
          allData.results.map((data) => {
            let id = data.url.split('/')[6];
            setMasterPokemonList((prev) => [...prev, { id: id, ...data }]);
          });
        })
        .catch((err) => console.log(err));
    }
    createMasterList();

    async function fetchFirstPokemons() {
      try {
        console.log('Fetching data');

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
        setPokemonFullData((prev) => [...prev, { data }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function lazyLoader(idArray) {
    try {
      idArray.forEach((id) => {});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ul>
        <InfiniteScroll
          dataLength={pokemonFullData.length}
          next={fetchData}
          className="infi"
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {pokemonFullData.map((pokemon, id) => (
            <PokemonListItem key={id} pokemon={pokemon} />
          ))}
        </InfiniteScroll>
      </ul>
    </>
  );
}
