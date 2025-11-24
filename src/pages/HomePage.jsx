import { useNavigate } from 'react-router-dom';

import '../css/HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  function navigateToPokemons() {
    navigate('/pokemons');
  }
  return (
    <div id="homeContainer">
      <div id="homeDiv">
        <h1 id="welcomeText">Welcome to the Pokédex</h1>
        <p id="infoText">
          Discover and explore detailed information about your favorite Pokémon.
          Browse stats, types, and characteristics of creatures from across all
          regions.
        </p>
        <button id="navBtn" onClick={navigateToPokemons}>
          Explore Pokédex
        </button>
      </div>
    </div>
  );
}
