import { useNavigate } from 'react-router-dom';
import TypeIcons from '../TypeIcons/TypeIcons';

import style from './PokemonListItem.module.css';

export default function PokemonListItem({ pokemon }) {
  const navigate = useNavigate();
  const toNextComponent = () => {
    navigate(`/pokemons/${pokemon.id}`, { state: { pokemon: pokemon } });
  };

  return (
    <li onClick={toNextComponent} className={style.pokeListItem}>
      {pokemon && (
        <>
          <div className={style.topDiv}>
            <p id={style.id}>{pokemon.id}</p>
            <TypeIcons types={pokemon.types} />
          </div>
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}'s image`}
          />
          <p className={style.pokemonName}>{pokemon.name}</p>
        </>
      )}
    </li>
  );
}
