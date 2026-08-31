function CategorySearch({ value, onChange }) {
  return (
    <input
      className="form-control"
      placeholder="Search Categories..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default CategorySearch;