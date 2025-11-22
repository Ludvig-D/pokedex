export default function PokemonListBar({ sort, filter, types }) {
  return (
    <div>
      <p>search</p>
      <select
        defaultValue={'default'}
        name="type"
        id="type"
        onChange={(e) => filter(e.target.value)}
      >
        <option value="default">Default</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
      <select defaultValue={'accending'} onChange={(e) => sort(e.target.value)}>
        <option value="ascending">Ascending ids</option>
        <option value="descending">Descending ids</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
}
