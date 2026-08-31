function ProductFilter({ value, onChange }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>

      <option value="MCB">MCB</option>

      <option value="Wire">Wire</option>

      <option value="LED">LED</option>

      <option value="Fan">Fan</option>

      <option value="Switches">Switches</option>

      <option value="Socket">Socket</option>

      <option value="Accessories">Accessories</option>

      <option value="Extension Board">Extension Board</option>
    </select>
  );
}

export default ProductFilter;