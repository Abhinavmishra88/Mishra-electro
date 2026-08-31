function AdminProfile() {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h4>Admin Profile</h4>

        <div className="row">

          <div className="col-md-6">
            <input
              className="form-control mb-3"
              placeholder="Admin Name"
              defaultValue="Abhinav Mishra"
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control mb-3"
              placeholder="Email"
              defaultValue="admin@mishraelectro.com"
            />
          </div>

        </div>

        <button className="btn btn-primary">
          Save Profile
        </button>

      </div>

    </div>
  );
}

export default AdminProfile;