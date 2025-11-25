import { useNavigate } from 'react-router-dom';

import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  function navigateToPokemons() {
    navigate('/pokemons');
  }
  return (
    <div id={styles.homeContainer}>
      <div id={styles.homeDiv}>
        <h1 id={styles.welcomeText}>Welcome to the Pokédex</h1>
        <p id={styles.infoText}>
          Discover and explore detailed information about your favorite Pokémon.
          Browse stats, types, and characteristics of creatures from across all
          regions.
        </p>
        <button id={styles.navBtn} onClick={navigateToPokemons}>
          Explore Pokédex
        </button>
      </div>
    </div>
  );
}
