import { NavLink, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBox,
  FaTags,
  FaUsers,
  FaHome,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <Link to="/">
          Mishra Electro
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaShoppingCart />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaBox />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaTags />
          <span>Categories</span>
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaUsers />
          <span>Customers</span>
        </NavLink>

        <hr />

        <Link to="/">
          <FaHome />
          <span>Back to Store</span>
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;