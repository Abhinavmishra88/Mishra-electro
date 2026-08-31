function BillingForm() {
  return (
    <div className="checkout-card">

      <h4>Billing Details</h4>

      <div className="row">

        <div className="col-md-6">
          <input
            className="form-control mb-3"
            placeholder="Full Name"
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control mb-3"
            placeholder="Email"
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control mb-3"
            placeholder="Phone"
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control mb-3"
            placeholder="City"
          />
        </div>

        <div className="col-md-12">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Full Address"
          />
        </div>

      </div>

    </div>
  );
}

export default BillingForm;