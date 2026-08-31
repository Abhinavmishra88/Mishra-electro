import {
  Link,
  NavLink,
} from "react-router-dom";

import { useState } from "react";

import {
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaKey,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";

import logo from "../../assets/logo/logo.png";

import "../../styles/navbar.css";


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const {
    user,
    logout,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const {
    wishlist = [],
  } = useWishlist();

  const {
    cart = [],
  } = useCart();


  // =====================================================
  // COUNTS
  // =====================================================

  const wishlistCount = wishlist.length;

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );


  // =====================================================
  // CLOSE MENU
  // =====================================================

  const closeMenu = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    logout();
    closeMenu();
  };


  // =====================================================
  // ACCOUNT TOGGLE
  // =====================================================

  const toggleAccount = () => {
    setAccountOpen(
      (previous) => !previous
    );
  };


  return (
    <header className="site-header">

      <div className="navbar-container">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Mishra Electro"
          />
        </Link>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className={
            menuOpen
              ? "nav-menu active"
              : "nav-menu"
          }
        >

          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={closeMenu}
          >
            Wishlist
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              onClick={closeMenu}
              className="admin-nav-link"
            >
              Admin
            </NavLink>
          )}

        </nav>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
          />

        </div>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="nav-icons">

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="nav-action"
            title="Wishlist"
            onClick={closeMenu}
          >

            <FaHeart />

            {wishlistCount > 0 && (
              <span className="badge">
                {wishlistCount}
              </span>
            )}

          </Link>


          {/* CART */}

          <Link
            to="/cart"
            className="nav-action"
            title="Cart"
            onClick={closeMenu}
          >

            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="badge">
                {cartCount}
              </span>
            )}

          </Link>


          {/* ACCOUNT */}

          {isAuthenticated ? (

            <div
              className={
                isAdmin
                  ? "user-menu admin-user-menu"
                  : "user-menu user-user-menu"
              }
            >

              <button
                type="button"
                className="profile-icon"
                title={
                  isAdmin
                    ? "Admin Profile"
                    : "Profile"
                }
                onClick={toggleAccount}
              >
                <FaUser />
              </button>


              <div
                className={
                  isAdmin
                    ? "logged-user admin"
                    : "logged-user customer"
                }
              >

                <strong>
                  {isAdmin
                    ? "ADMIN"
                    : "USER"}
                </strong>

                <span>
                  {user?.name || "User"}
                </span>

              </div>


              {accountOpen && (

                <div className="account-dropdown">

                  {/* PROFILE */}

                  <Link
                    to={
                      isAdmin
                        ? "/admin/profile"
                        : "/profile"
                    }
                    className="account-dropdown-item"
                    onClick={closeMenu}
                  >

                    <FaUser />

                    <span>
                      Profile
                    </span>

                  </Link>


                  {/* CHANGE PASSWORD */}

                  <Link
                    to="/change-password"
                    className="account-dropdown-item"
                    onClick={closeMenu}
                  >

                    <FaKey />

                    <span>
                      Change Password
                    </span>

                  </Link>


                  {/* ADMIN DASHBOARD */}

                  {isAdmin && (

                    <Link
                      to="/admin/dashboard"
                      className="account-dropdown-item"
                      onClick={closeMenu}
                    >

                      <FaUser />

                      <span>
                        Admin Dashboard
                      </span>

                    </Link>

                  )}


                  <div className="account-dropdown-divider" />


                  {/* LOGOUT */}

                  <button
                    type="button"
                    className="account-dropdown-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            <Link
              to="/login"
              title="Login"
              className="profile-icon"
              onClick={closeMenu}
            >
              <FaUser />
            </Link>

          )}

        </div>


        {/* =================================================
            MOBILE BUTTON
        ================================================= */}

        <button
          type="button"
          className="mobile-btn"
          onClick={() =>
            setMenuOpen(
              (previous) => !previous
            )
          }
          aria-label="Toggle navigation"
        >

          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}

        </button>

      </div>

    </header>
  );
}


export default Navbar;