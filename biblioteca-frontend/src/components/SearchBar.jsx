function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por título o autor..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 border-indigo-300 rounded-lg px-4 py-2 w-lg mx-auto text-indigo-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}

export default SearchBar;
