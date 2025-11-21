import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect, useRef, useCallback } from 'react';

import '../css/PokemonList.css';

import PokemonListItem from '../components/PokemonListItem';
import PokemonListBar from '../components/PokemonListBar';

export default function PokemonList() {
  const [masterPokemonList, setMasterPokemonList] = useState([]);
  const [detailedPokemonList, setDetailedPokemonList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(31);
  const [currentList, setCurrentList] = useState([]);
  const [hiddenList, setHiddenList] = useState([]);
  const [trigger, setTrigger] = useState('');

  const hasFetched = useRef(false);

  //Todo
  //1. Style pokemon item
  //2. Finish up photo slide show

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
            setHiddenList((prev) => [...prev, id]);
          });
        })
        .catch((err) => console.error(err));
    }
    createMasterList();
  }, []);

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
    function increaseCurrentList() {
      setCurrentList(() => hiddenList.slice(0, visibleCount));
    }
    increaseCurrentList();
    console.log(hiddenList);
  }, [hiddenList, visibleCount, trigger]);

  function increase() {
    if (currentList.length > visibleCount) return;
    setVisibleCount((prev) => prev + 6);
  }

  const filter = useCallback(
    (value) => {
      if (value === 'ascending') {
        setHiddenList((prev) => prev.sort((a, b) => a - b));
        setTrigger(crypto.randomUUID());
      } else if (value === 'descending') {
        setHiddenList((prev) => {
          return prev.sort((a, b) => b - a);
        });
        setTrigger(crypto.randomUUID());
      } else if (value === 'az') {
        const sortedArr = masterPokemonList
          .sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;

            return 0;
          })
          .map((item) => item.id);

        setHiddenList((prev) =>
          prev.sort((a, b) => {
            return sortedArr.indexOf(a) - sortedArr.indexOf(b);
          })
        );
        setTrigger(crypto.randomUUID());
      } else if (value === 'za') {
        const sortedArr = masterPokemonList
          .sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;

            return 0;
          })
          .map((item) => item.id);
        setHiddenList((prev) =>
          prev.sort((a, b) => {
            return sortedArr.indexOf(a) - sortedArr.indexOf(b);
          })
        );
        setTrigger(crypto.randomUUID());
      }

      setVisibleCount(31);
    },
    [masterPokemonList]
  );

  return (
    <>
      <PokemonListBar filter={filter} />
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
