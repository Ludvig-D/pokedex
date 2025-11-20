import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect, useRef } from 'react';

import '../css/PokemonList.css';

import PokemonListItem from '../components/PokemonListItem';
import PokemonListBar from '../components/PokemonListBar';

export default function PokemonList() {
  const [masterPokemonList, setMasterPokemonList] = useState([]);
  const [detailedPokemonList, setDetailedPokemonList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(24);
  const [currentList, setCurrentList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ]);
  const [hiddenList, setHiddenList] = useState([]);

  const hasFetched = useRef(false);

  //Todo
  //1. Make fitler option for revers id
  //2. Make filter for A-Z and z-A
  //3. Style pokemon item
  //4. Finish up photo slide show

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    function createMasterList() {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=1328&offset=0')
        .then((response) => response.json())
        .then((allData) => {
          allData.results.map((data) => {
            let id = data.url.split('/')[6];
            setMasterPokemonList((prev) => [...prev, { id: id, ...data }]);
          });
        })
        .catch((err) => console.error(err));
    }
    createMasterList();
  }, []);

  useEffect(() => {
    (function currentListFiller() {
      masterPokemonList.map((list) =>
        setHiddenList((prev) => [...prev, list.id])
      );
    })();
  }, [masterPokemonList]);

  useEffect(() => {
    const lazyLoader = (idArray) => {
      if (!Array.isArray(idArray))
        throw new Error(`lazyLoader input isn't a array`);
      try {
        idArray.forEach(async (id) => {
          if (detailedPokemonList && detailedPokemonList[id]) return;
          let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          let data = await res.json();
          setDetailedPokemonList((prev) => ({ ...prev, [id]: data }));
        });
      } catch (error) {
        console.error(error);
      }
    };

    lazyLoader(currentList);
  }, [currentList, detailedPokemonList]);

  useEffect(() => {
    function test() {
      setCurrentList(() => hiddenList.slice(0, visibleCount));
    }
    test();
  }, [hiddenList, visibleCount]);

  function increase() {
    if (currentList.length > visibleCount) return;
    setVisibleCount((prev) => prev + 6);
  }

  return (
    <>
      <PokemonListBar></PokemonListBar>
      <ul>
        <InfiniteScroll
          dataLength={currentList.length}
          next={increase}
          className="infi"
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {currentList.map((id) => (
            <PokemonListItem key={id} pokemon={detailedPokemonList[id]} />
          ))}
        </InfiniteScroll>
      </ul>
    </>
  );
}
