import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  function navigateToPokemons() {
    navigate('/pokemons');
  }
  return (
    <>
      <h2>Welcome the Pokedex</h2>
      <p>Where you can checkout all pokemons </p>
      <button onClick={navigateToPokemons}>Check Out Pokemons</button>
    </>
  );
}
