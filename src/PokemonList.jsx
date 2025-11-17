import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonItem from './PokemonItem';

export default function PokemonList({ pokemons, fetchData }) {
  return (
    <>
      <ul>
        <InfiniteScroll
          dataLength={pokemons.length}
          next={fetchData}
          className="infi"
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {pokemons.map((pokemon, id) => (
            <PokemonItem key={id} pokemon={pokemon} />
          ))}
        </InfiniteScroll>
      </ul>
    </>
  );
}
