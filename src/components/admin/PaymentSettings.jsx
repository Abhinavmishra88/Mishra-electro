function PaymentSettings() {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h4>Payment Gateway</h4>

        <select className="form-select mb-3">
          <option>Razorpay</option>
          <option>Stripe</option>
          <option>PayPal</option>
        </select>

        <input
          className="form-control mb-3"
          placeholder="API Key"
        />

        <input
          className="form-control mb-3"
          placeholder="Secret Key"
        />

        <button className="btn btn-primary">
          Save Payment
        </button>

      </div>

    </div>
  );
}

export default PaymentSettings;