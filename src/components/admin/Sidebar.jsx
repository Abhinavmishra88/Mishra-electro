import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaTags,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="admin-sidebar">

      <h2 className="admin-logo">
        Mishra Electro
      </h2>

      <nav>

        <NavLink to="/admin">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink to="/admin/orders">
          <FaShoppingCart />
          Orders
        </NavLink>

        <NavLink to="/admin/categories">
          <FaTags />
          Categories
        </NavLink>

        <NavLink to="/admin/users">
          <FaUsers />
          Users
        </NavLink>

        <NavLink to="/admin/analytics">
          <FaChartLine />
          Analytics
        </NavLink>

        <NavLink to="/admin/settings">
          <FaCog />
          Settings
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;