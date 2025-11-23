import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../css/icons.css';
import '../css/PokemonItem.css';

import SlideShow from '../components/SlideShow';

export default function PokemonItem() {
  const location = useLocation();
  const params = useParams();
  const { pokemon } = location.state || {};
  const [poke, setPoke] = useState(pokemon || '');
  if (!pokemon) {
    let id = params.id;
    console.log('Fetching data');

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPoke(data));
  }

  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    function imagePusher(images) {
      Object.entries(images).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return imagePusher(value);
        } else if (value === null) {
          return;
        }
        return setImageArray((prev) => [...prev, { key, value }]);
      });
    }

    imagePusher(poke.sprites);
  }, [poke.sprites]);

  function roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  }

  const navigate = useNavigate();
  function navigateBackToPokemons() {
    navigate('/pokemons');
  }

  return (
    <>
      <button onClick={navigateBackToPokemons}>Back</button>
      <div className="pokemon-div">
        <SlideShow images={imageArray} />
        <div id="stat-container">
          <p id="pokemon-Name">{poke.name}</p>

          <div id="tpye-div">
            <p>Types</p>
            <ul id="type-list">
              {poke.types.map((type) => (
                <li
                  className={`type-icon type-${type.type.name}`}
                  key={type.slot}
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>

          <div id="stat-div">
            <p>Stats</p>
            <ul id="stat-ul">
              {poke.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.base_stat} <span>{stat.stat.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p key={poke.weight}>
              <span className="whSpan">Weight:</span> {poke.weight / 10} kg (
              {roundUp((poke.weight / 10) * 2.205, 1)} lbs)
            </p>
            <p key={poke.height}>
              <span className="whSpan">Height:</span> {poke.height / 10} m (
              {roundUp((poke.height / 10) * 3.28, 1)} feet)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
