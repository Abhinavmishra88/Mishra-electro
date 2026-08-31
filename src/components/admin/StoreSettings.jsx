function StoreSettings() {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h4>Store Settings</h4>

        <input
          className="form-control mb-3"
          placeholder="Store Name"
          defaultValue="Mishra Electro"
        />

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Store Description"
        />

        <input
          className="form-control mb-3"
          placeholder="Support Email"
        />

        <input
          className="form-control mb-3"
          placeholder="Phone Number"
        />

        <button className="btn btn-success">
          Save Store
        </button>

      </div>

    </div>
  );
}

export default StoreSettings;