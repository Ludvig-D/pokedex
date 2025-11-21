export default function PokemonListBar({ whatshows }) {
  return (
    <div>
      <p>search</p>
      <p>types</p>
      <select
        defaultValue={'accending'}
        onChange={(e) => whatshows(e.target.value)}
      >
        <option value="ascending">Ascending ids</option>
        <option value="descending">Descending ids</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
}
