import PokemonItem from './PokemonItem';

export default function PokemonList({ pokemons }) {
  return (
    <>
      <ul>
        {pokemons.map((pokemon, id) => (
          <PokemonItem key={id} pokemon={pokemon} />
        ))}
      </ul>
    </>
  );
}
