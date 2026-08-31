function ShippingSettings() {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h4>Shipping Settings</h4>

        <input
          className="form-control mb-3"
          placeholder="Shipping Charge"
        />

        <input
          className="form-control mb-3"
          placeholder="Free Shipping Above"
        />

        <button className="btn btn-primary">
          Save Shipping
        </button>

      </div>

    </div>
  );
}

export default ShippingSettings;