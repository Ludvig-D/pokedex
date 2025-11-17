import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function PokemonItem() {
  const location = useLocation();
  const params = useParams();
  const { pokemon } = location.state || {};
  const [poke, setPoke] = useState(pokemon || '');
  if (!pokemon) {
    let id = params.id;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPoke(data));
  }
  return (
    <>
      <div>
        <img src={poke.sprites.front_default} alt="pokemons image" />
        <p>{poke.name}</p>
      </div>
    </>
  );
}
