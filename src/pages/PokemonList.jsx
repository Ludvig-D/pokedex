import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect, useRef, useCallback } from 'react';

import '../css/PokemonList.css';

import PokemonListItem from '../components/PokemonListItem';
import PokemonListBar from '../components/PokemonListBar';

export default function PokemonList() {
  const [masterPokemonList, setMasterPokemonList] = useState([]);
  const [masterTypeList, setMasterTypeList] = useState([]);

  const [detailedPokemonList, setDetailedPokemonList] = useState([]);
  const [detailedTypeList, setDetailedTypeList] = useState([]);

  const [visibleCount, setVisibleCount] = useState(31);
  const [currentList, setCurrentList] = useState([]);
  const [hiddenList, setHiddenList] = useState([]);

  const [sort, setSort] = useState('ascending');
  const [filter, setFilter] = useState('default');

  const [trigger, setTrigger] = useState('');
  const [sortTrigger, setSortTrigger] = useState('');

  const hasFetched = useRef(false);

  //Todo
  //1. Style pokemon item
  //2. Sort by types

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch('https://pokeapi.co/api/v2/pokemon?limit=1328&offset=0')
      .then((response) => response.json())
      .then((allData) => {
        allData.results.map((data) => {
          let id = data.url.split('/')[6];
          setMasterPokemonList((prev) => [...prev, { id: id, ...data }]);
        });
      })
      .catch((err) => console.error(err));

    fetch('https://pokeapi.co/api/v2/type?limit=18')
      .then((res) => res.json())
      .then((data) => setMasterTypeList((prev) => [...prev, ...data.results]))
      .catch((err) => console.error(err));
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
  }, [hiddenList, visibleCount, trigger]);

  function increase() {
    if (currentList.length > visibleCount) return;
    setVisibleCount((prev) => prev + 6);
  }

  useEffect(() => {
    if (filter === 'default')
      setHiddenList(() => masterPokemonList.map((item) => item.id));

    masterTypeList.map((type) => {
      if (type.name === filter) {
        if (detailedTypeList[filter]) return;
        fetch(type.url)
          .then((res) => res.json())
          .then((data) => {
            setDetailedTypeList((prev) => ({ ...prev, [filter]: data }));
          });
      }
      return;
    });

    console.log(filter);
  }, [masterTypeList, masterPokemonList, detailedTypeList, filter]);

  useEffect(() => {
    if (detailedTypeList == [] || detailedTypeList[filter] === undefined)
      return;
    let arr = [];
    detailedTypeList[filter].pokemon.map((poke) => {
      let id = poke.pokemon.url.split('/')[6];
      arr.push(id);
    });
    setHiddenList(arr);
    setSortTrigger(crypto.randomUUID());
  }, [detailedTypeList, filter]);

  useEffect(() => {
    if (sort === 'ascending') {
      setHiddenList((prev) => prev.sort((a, b) => a - b));
      setTrigger(crypto.randomUUID());
    } else if (sort === 'descending') {
      setHiddenList((prev) => {
        return prev.sort((a, b) => b - a);
      });
      setTrigger(crypto.randomUUID());
    } else if (sort === 'az') {
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
    } else if (sort === 'za') {
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
    console.log('sorted');

    setVisibleCount(31);
  }, [masterPokemonList, sort, sortTrigger]);

  const updateSort = (value) => {
    setSort(value);
  };

  const updateFilter = (value) => {
    setFilter(value);
  };

  return (
    <>
      <PokemonListBar
        sort={updateSort}
        filter={updateFilter}
        types={masterTypeList}
      />
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
