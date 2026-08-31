import "./ProductSidebar.css";

function ProductSidebar({
  category,
  setCategory,
  brand,
  setBrand,
  maxPrice,
  setMaxPrice,
}) {
  const clearFilters = () => {
    setCategory("");
    setBrand("");
    setMaxPrice(10000);
  };

  return (
    <aside className="product-sidebar">
      <h3 className="sidebar-title">Filters</h3>

      {/* Category */}
      <div className="filter-box">
        <h5>Category</h5>

        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Switches">Switches</option>
          <option value="Socket">Socket</option>
          <option value="Wire">Wire</option>
          <option value="MCB">MCB</option>
          <option value="Fan">Fan</option>
          <option value="LED">LED</option>
          <option value="Extension Board">Extension Board</option>
          <option value="Plug">Plug</option>
          <option value="DB Box">DB Box</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Brand */}
      <div className="filter-box">
        <h5>Brand</h5>

        <select
          className="form-select"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="Havells">Havells</option>
          <option value="Anchor">Anchor</option>
          <option value="Polycab">Polycab</option>
          <option value="RR Kabel">RR Kabel</option>
          <option value="Finolex">Finolex</option>
          <option value="Philips">Philips</option>
          <option value="Syska">Syska</option>
          <option value="Bajaj">Bajaj</option>
        </select>
      </div>

      {/* Price */}
      <div className="filter-box">
        <h5>Maximum Price</h5>

        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />

        <div className="price-value">
          ₹100 - ₹{maxPrice}
        </div>
      </div>

      <button
        className="clear-filter"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </aside>
  );
}

export default ProductSidebar;