import { useNavigate } from 'react-router-dom';

export default function PokemonListItem({ pokemon }) {
  const navigate = useNavigate();
  const toNextComponent = () => {
    navigate(`./${pokemon.id}`, { state: { pokemon: pokemon } });
  };

  return (
    <li onClick={toNextComponent} className="pokeListItem">
      <img src={pokemon.sprites.front_default} alt="pokemons image" />
      <p>{pokemon.name}</p>
    </li>
  );
}
