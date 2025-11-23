import { useNavigate } from 'react-router-dom';

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
            <div className="icon-div">
              {pokemon.types.map((type) => (
                <p
                  key={type.slot}
                  className={`type-icon type-${type.type.name}`}
                >
                  {type.type.name}
                </p>
              ))}
            </div>
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
