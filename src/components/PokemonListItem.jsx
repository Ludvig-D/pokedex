import { useNavigate } from 'react-router-dom';
import TypeIcons from './TypeIcons/TypeIcons';

export default function PokemonListItem({ pokemon }) {
  const navigate = useNavigate();
  const toNextComponent = () => {
    navigate(`/pokemons/${pokemon.id}`, { state: { pokemon: pokemon } });
  };

  return (
    <li onClick={toNextComponent} className="pokeListItem">
      {pokemon && (
        <>
          <div className="top-div">
            <p className="id">{pokemon.id}</p>
            <TypeIcons types={pokemon.types} />
          </div>
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}'s image`}
          />
          <p className="pokemon-name">{pokemon.name}</p>
        </>
      )}
    </li>
  );
}
