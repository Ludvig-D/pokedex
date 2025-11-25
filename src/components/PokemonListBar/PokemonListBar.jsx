import './PokemonListBar.css';
export default function PokemonListBar({ updateSort, updateFilter, types }) {
  return (
    <div className="custom-select">
      <div>
        <p>Filter</p>
        <select
          defaultValue={'default'}
          name="type"
          id="type"
          onChange={(e) => updateFilter(e.target.value)}
        >
          <option value="default">Default</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Sort</p>
        <select
          name="order"
          id="order"
          defaultValue={'accending'}
          onChange={(e) => updateSort(e.target.value)}
        >
          <option value="ascending">Ascending ids</option>
          <option value="descending">Descending ids</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
    </div>
  );
}
