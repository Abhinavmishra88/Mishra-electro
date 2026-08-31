function ProductSearch({ value, onChange }) {
  return (
    <input
      className="form-control"
      placeholder="Search Products..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}

export default ProductSearch;