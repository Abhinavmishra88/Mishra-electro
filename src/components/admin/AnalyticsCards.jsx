function AnalyticsCards() {
  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>Total Revenue</h6>
          <h3>₹2,45,000</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>Total Orders</h6>
          <h3>540</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>Customers</h6>
          <h3>860</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 text-center shadow-sm">
          <h6>Products</h6>
          <h3>120</h3>
        </div>
      </div>

    </div>
  );
}

export default AnalyticsCards;