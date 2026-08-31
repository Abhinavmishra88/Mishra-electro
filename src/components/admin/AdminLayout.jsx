import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
          <h4>Mishra Electro</h4>

          <nav className="nav flex-column">
            <Link className="nav-link text-white" to="/admin">
              Dashboard
            </Link>

            <Link className="nav-link text-white" to="/admin/products">
              Products
            </Link>

            <Link className="nav-link text-white" to="/admin/categories">
              Categories
            </Link>

            <Link className="nav-link text-white" to="/admin/orders">
              Orders
            </Link>

            <Link className="nav-link text-white" to="/admin/users">
              Customers
            </Link>

            <Link className="nav-link text-white" to="/admin/analytics">
              Analytics
            </Link>

            <Link className="nav-link text-white" to="/admin/settings">
              Settings
            </Link>
          </nav>
        </div>

        <div className="col-md-10 p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;