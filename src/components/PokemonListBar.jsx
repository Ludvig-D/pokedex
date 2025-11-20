export default function PokemonListBar() {
  return (
    <div>
      <p>search</p>
      <p>types</p>
      <select defaultValue={'accending'}>
        <option value="accending">Accending ids</option>
        <option value="deccending">Deccending ids</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
}
