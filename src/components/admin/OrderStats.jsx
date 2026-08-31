function OrderStats({ orders }) {
  const totalOrders = orders.length;

  const delivered = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const pending = orders.filter(
    (o) => o.status !== "Delivered"
  ).length;

  const revenue = orders.reduce(
    (sum, o) => sum + Number(o.total),
    0
  );

  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card p-3 text-center">
          <h6>Total Orders</h6>
          <h3>{totalOrders}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center">
          <h6>Delivered</h6>
          <h3 className="text-success">
            {delivered}
          </h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center">
          <h6>Pending</h6>
          <h3 className="text-warning">
            {pending}
          </h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center">
          <h6>Revenue</h6>
          <h3>₹{revenue}</h3>
        </div>
      </div>

    </div>
  );
}

export default OrderStats;