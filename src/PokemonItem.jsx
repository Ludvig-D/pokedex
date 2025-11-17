export default function PokemonItem({ pokemon }) {
  // console.log(pokemon.url.split('/')[6]);

  return (
    <li>
      <img src={pokemon.sprites.front_default} alt="" />
      <p>{pokemon.name}</p>
    </li>
  );
}
