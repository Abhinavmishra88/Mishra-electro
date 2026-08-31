function ProductStats({ products }) {
  const total = products.length;

  const inStock = products.filter(
    (p) => p.stock
  ).length;

  const outStock = total - inStock;

  const totalValue = products.reduce(
    (sum, p) => sum + Number(p.price),
    0
  );

  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card text-center p-3">
          <h6>Total Products</h6>
          <h2>{total}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center p-3">
          <h6>In Stock</h6>
          <h2 className="text-success">
            {inStock}
          </h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center p-3">
          <h6>Out Of Stock</h6>
          <h2 className="text-danger">
            {outStock}
          </h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center p-3">
          <h6>Total Value</h6>
          <h2>₹{totalValue}</h2>
        </div>
      </div>

    </div>
  );
}

export default ProductStats;