function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por título o autor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 px-4 py-2 w-full max-w-md rounded"
    />
  )
}

export default SearchBar
