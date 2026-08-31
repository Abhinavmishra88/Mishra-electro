function OrderSearch({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search by Order ID or Customer..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default OrderSearch;