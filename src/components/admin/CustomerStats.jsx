function CustomerStats({ customers }) {
  const total = customers.length;

  const active = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const revenue = customers.reduce(
    (sum, customer) => sum + customer.spent,
    0
  );

  return (
    <div className="row mb-4">

      <div className="col-md-4">
        <div className="card p-3 text-center">
          <h6>Total Customers</h6>
          <h3>{total}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3 text-center">
          <h6>Active Customers</h6>
          <h3>{active}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3 text-center">
          <h6>Total Spending</h6>
          <h3>₹{revenue}</h3>
        </div>
      </div>

    </div>
  );
}

export default CustomerStats;