function TopProducts() {
  const products = [
    {
      name: "MCB 32A",
      sold: 120,
    },
    {
      name: "LED Bulb",
      sold: 98,
    },
    {
      name: "Copper Wire",
      sold: 85,
    },
    {
      name: "Ceiling Fan",
      sold: 64,
    },
  ];

  return (
    <div className="admin-card">

      <h4>Top Selling Products</h4>

      <ul className="list-group">

        {products.map((product, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{product.name}</span>

            <strong>{product.sold}</strong>
          </li>
        ))}

      </ul>

    </div>
  );
}

export default TopProducts;