export default function PokemonListBar({ filter }) {
  return (
    <div>
      <p>search</p>
      <p>types</p>
      <select
        defaultValue={'accending'}
        onChange={(e) => filter(e.target.value)}
      >
        <option value="ascending">Ascending ids</option>
        <option value="descending">Descending ids</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
}
