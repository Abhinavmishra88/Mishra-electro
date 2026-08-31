function CustomerSearch({ value, onChange }) {
  return (
    <input
      className="form-control"
      placeholder="Search Customer..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}

export default CustomerSearch;