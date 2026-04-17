function SearchBar({ search, setSearch }) {
  return (
    <div className="search-shell">
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search products, categories, moods..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
