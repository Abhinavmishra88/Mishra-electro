function ProductSort({ value, onChange }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    >
      <option value="latest">
        Latest
      </option>

      <option value="low">
        Price Low → High
      </option>

      <option value="high">
        Price High → Low
      </option>

      <option value="rating">
        Highest Rated
      </option>

    </select>
  );
}

export default ProductSort;