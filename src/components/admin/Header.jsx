import { FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="admin-header">

      <h3>Admin Dashboard</h3>

      <div className="admin-header-right">

        <FaBell />

        <FaUserCircle size={28} />

      </div>

    </header>
  );
}

export default Header;