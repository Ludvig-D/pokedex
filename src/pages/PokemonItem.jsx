import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../css/icons.css';

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
  }, []);
  console.log();

  return (
    <>
      <div>
        <SlideShow images={imageArray} />
        <p>{poke.name}</p>
        <ul>
          {poke.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.base_stat} {stat.stat.name}
            </li>
          ))}
          <li key={poke.weight}>
            Weight {poke.weight / 10} kg ({(poke.weight / 10) * 2.205} lbs)
          </li>
          <li key={poke.height}>
            Height {poke.height / 10} m ({(poke.height / 10) * 3.28} inches)
          </li>
        </ul>
        <ul>
          {poke.types.map((type) => (
            <li className={`type-icon type-${type.type.name}`} key={type.slot}>
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
