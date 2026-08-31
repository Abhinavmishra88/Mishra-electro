function SecuritySettings() {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h4>Security</h4>

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Current Password"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
        />

        <button className="btn btn-danger">
          Update Password
        </button>

      </div>

    </div>
  );
}

export default SecuritySettings;