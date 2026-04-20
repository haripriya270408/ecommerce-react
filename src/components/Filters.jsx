function Filters({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <section className="filter-panel">
      <div className="row g-3">
        <div className="col-lg-4">
          <label className="form-label">Category</label>
          <select
            className="form-select glass-input"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
            <option value="bags">Bags</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>

        <div className="col-lg-4">
          <label className="form-label">Minimum price</label>
          <input
  type="number"
  min="0"
  className="form-control glass-input"
  placeholder="0"
  value={minPrice}
  onChange={(e) => {
    const value = e.target.value;

    // allow empty OR >= 0
    if (value === "" || Number(value) >= 0) {
      setMinPrice(value);
    }
  }}
/>
        </div>

        <div className="col-lg-4">
          <label className="form-label">Maximum price</label>
          <input
            type="text"
            className="form-control glass-input"
            placeholder="200"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

export default Filters;
