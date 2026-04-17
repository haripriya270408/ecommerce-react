function SortDropdown({ sortOption, setSortOption }) {
  return (
    <div className="sort-shell">
      <label className="form-label">Sort products</label>
      <select
        className="form-select glass-input"
        value={sortOption}
        onChange={(event) => setSortOption(event.target.value)}
      >
        <option value="">Featured first</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        <option value="a-z">Title: A to Z</option>
      </select>
    </div>
  );
}

export default SortDropdown;
