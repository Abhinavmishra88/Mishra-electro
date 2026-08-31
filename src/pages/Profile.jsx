import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaShoppingBag,
  FaUserEdit,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaChevronRight,
  FaBoxOpen,
  FaLock,
} from "react-icons/fa";

import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import useWishlist from "../hooks/useWishlist";

import "../styles/profile.css";

function Profile() {
  // =====================================================
  // AUTH
  // =====================================================

  const {
    user,
    logout,
  } = useAuth();

  // =====================================================
  // WISHLIST
  // =====================================================

  const {
    wishlist = [],
  } = useWishlist();

  // =====================================================
  // ORDERS
  // =====================================================

  const {
    getUserOrders,
  } = useOrder();

  // =====================================================
  // USER INFORMATION
  // =====================================================

  const userName =
    user?.name || "Customer";

  const userEmail =
    user?.email || "customer@example.com";

  const userRole =
    String(user?.role || "CUSTOMER").toUpperCase();

  // =====================================================
  // GET CURRENT USER ORDERS
  // =====================================================

  const userOrders =
    getUserOrders(user?.email);

  // =====================================================
  // SORT ORDERS - NEWEST FIRST
  // =====================================================

  const sortedOrders = [...userOrders].sort(
    (a, b) =>
      new Date(b.date || 0) -
      new Date(a.date || 0)
  );

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    const normalized =
      String(status || "Pending")
        .toLowerCase();

    if (normalized === "delivered") {
      return "order-status-delivered";
    }

    if (normalized === "cancelled") {
      return "order-status-cancelled";
    }

    if (normalized === "processing") {
      return "order-status-processing";
    }

    if (normalized === "shipped") {
      return "order-status-shipped";
    }

    return "order-status-pending";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="profile-page">

      {/* =====================================================
          PROFILE HERO
      ===================================================== */}

      <section className="profile-hero">

        <div className="container">

          {/* BREADCRUMB */}

          <div className="profile-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>/</span>

            <span>
              My Profile
            </span>

          </div>


          {/* PROFILE HEADER */}

          <div className="profile-header-card">

            {/* AVATAR */}

            <div className="profile-avatar">

              {user?.profilePicture ? (

                <img
                  src={user.profilePicture}
                  alt={userName}
                  className="profile-avatar-image"
                />

              ) : (

                <FaUser />

              )}

            </div>


            {/* USER INFORMATION */}

            <div className="profile-user-info">

              <span className="profile-welcome">
                WELCOME BACK
              </span>

              <h1>
                {userName}
              </h1>

              <div className="profile-email">

                <FaEnvelope />

                <span>
                  {userEmail}
                </span>

              </div>

              <div className="profile-role">

                <FaShieldAlt />

                <span>

                  {userRole === "ADMIN"
                    ? "Administrator"
                    : "Customer Account"}

                </span>

              </div>

            </div>


            {/* EDIT PROFILE */}

            <Link
              to="/profile/edit"
              className="profile-edit-btn"
            >

              <FaUserEdit />

              <span>
                Edit Profile
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROFILE CONTENT
      ===================================================== */}

      <section className="profile-content">

        <div className="container">

          <div className="profile-grid">

            {/* =================================================
                LEFT SIDEBAR
            ================================================= */}

            <aside className="profile-sidebar">

              <div className="profile-menu-card">

                <div className="profile-menu-title">
                  My Account
                </div>


                {/* PROFILE */}

                <Link
                  to="/profile"
                  className="profile-menu-item active"
                >

                  <span className="profile-menu-icon">
                    <FaUser />
                  </span>

                  <span>
                    Profile
                  </span>

                  <FaChevronRight
                    className="menu-arrow"
                  />

                </Link>


                {/* ORDERS */}

                <Link
                  to="/orders"
                  className="profile-menu-item"
                >

                  <span className="profile-menu-icon">
                    <FaShoppingBag />
                  </span>

                  <span>
                    My Orders
                  </span>

                  <span className="profile-menu-count">
                    {userOrders.length}
                  </span>

                </Link>


                {/* WISHLIST */}

                <Link
                  to="/wishlist"
                  className="profile-menu-item"
                >

                  <span className="profile-menu-icon">
                    <FaHeart />
                  </span>

                  <span>
                    Wishlist
                  </span>

                  <span className="profile-menu-count">
                    {wishlist.length}
                  </span>

                </Link>


                {/* ADDRESSES */}

                <Link
                  to="/profile/addresses"
                  className="profile-menu-item"
                >

                  <span className="profile-menu-icon">
                    <FaMapMarkerAlt />
                  </span>

                  <span>
                    Addresses
                  </span>

                  <FaChevronRight
                    className="menu-arrow"
                  />

                </Link>


                {/* CHANGE PASSWORD */}

                <Link
                  to="/change-password"
                  className="profile-menu-item"
                >

                  <span className="profile-menu-icon">
                    <FaLock />
                  </span>

                  <span>
                    Change Password
                  </span>

                  <FaChevronRight
                    className="menu-arrow"
                  />

                </Link>


                {/* LOGOUT */}

                <button
                  type="button"
                  className="profile-menu-item logout-item"
                  onClick={logout}
                >

                  <span className="profile-menu-icon">
                    <FaSignOutAlt />
                  </span>

                  <span>
                    Logout
                  </span>

                </button>

              </div>


              {/* SUPPORT CARD */}

              <div className="profile-support-card">

                <div className="support-icon">
                  ?
                </div>

                <h3>
                  Need Help?
                </h3>

                <p>
                  Our support team is here to help
                  with your orders and products.
                </p>

                <Link to="/contact">
                  Contact Support
                </Link>

              </div>

            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="profile-main">

              {/* =================================================
                  ACCOUNT INFORMATION
              ================================================= */}

              <section className="profile-section-card">

                <div className="profile-section-header">

                  <div>

                    <span className="section-label">
                      ACCOUNT
                    </span>

                    <h2>
                      Personal Information
                    </h2>

                    <p>
                      Your basic account information.
                    </p>

                  </div>


                  <Link
                    to="/profile/edit"
                    className="section-edit-btn"
                  >

                    <FaUserEdit />

                    Edit

                  </Link>

                </div>


                <div className="profile-info-grid">

                  {/* NAME */}

                  <div className="profile-info-item">

                    <div className="info-icon">
                      <FaUser />
                    </div>

                    <div>

                      <span>
                        Full Name
                      </span>

                      <strong>
                        {userName}
                      </strong>

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div className="profile-info-item">

                    <div className="info-icon">
                      <FaEnvelope />
                    </div>

                    <div>

                      <span>
                        Email Address
                      </span>

                      <strong>
                        {userEmail}
                      </strong>

                    </div>

                  </div>


                  {/* ROLE */}

                  <div className="profile-info-item">

                    <div className="info-icon">
                      <FaShieldAlt />
                    </div>

                    <div>

                      <span>
                        Account Type
                      </span>

                      <strong>

                        {userRole === "ADMIN"
                          ? "Administrator"
                          : "Customer"}

                      </strong>

                    </div>

                  </div>


                  {/* WISHLIST */}

                  <div className="profile-info-item">

                    <div className="info-icon">
                      <FaHeart />
                    </div>

                    <div>

                      <span>
                        Wishlist Items
                      </span>

                      <strong>
                        {wishlist.length} Items
                      </strong>

                    </div>

                  </div>

                </div>

              </section>


              {/* =================================================
                  SECURITY
              ================================================= */}

              <section className="profile-section-card">

                <div className="profile-section-header">

                  <div>

                    <span className="section-label">
                      SECURITY
                    </span>

                    <h2>
                      Account Security
                    </h2>

                    <p>
                      Manage your account password and security.
                    </p>

                  </div>

                </div>


                <div className="quick-actions">

                  <Link
                    to="/change-password"
                    className="quick-action"
                  >

                    <div className="quick-action-icon">
                      <FaLock />
                    </div>

                    <div>

                      <strong>
                        Change Password
                      </strong>

                      <span>
                        Update your account password
                      </span>

                    </div>

                    <FaChevronRight />

                  </Link>

                </div>

              </section>


              {/* =================================================
                  ORDERS
              ================================================= */}

              <section className="profile-section-card">

                <div className="profile-section-header">

                  <div>

                    <span className="section-label">
                      SHOPPING
                    </span>

                    <h2>
                      My Orders
                    </h2>

                    <p>
                      Track and manage your recent purchases.
                    </p>

                  </div>

                  <Link
                    to="/orders"
                    className="view-all-btn"
                  >

                    View All

                    <FaChevronRight />

                  </Link>

                </div>


                {/* NO ORDERS */}

                {sortedOrders.length === 0 ? (

                  <div className="empty-orders">

                    <div className="empty-orders-icon">
                      <FaShoppingBag />
                    </div>

                    <h3>
                      No Orders Yet
                    </h3>

                    <p>
                      You haven't placed any orders yet.
                      Start shopping to see your orders here.
                    </p>

                    <Link
                      to="/products"
                      className="shop-now-btn"
                    >
                      Start Shopping
                    </Link>

                  </div>

                ) : (

                  /* ORDERS EXIST */

                  <div className="profile-orders-list">

                    {sortedOrders.map((order) => (

                      <div
                        key={order.id}
                        className="profile-order-card"
                      >

                        {/* ORDER HEADER */}

                        <div className="profile-order-top">

                          <div>

                            <span>
                              ORDER ID
                            </span>

                            <strong>
                              #{order.id}
                            </strong>

                          </div>


                          <span
                            className={`profile-order-status ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status || "Pending"}
                          </span>

                        </div>


                        {/* ORDER DETAILS */}

                        <div className="profile-order-details">

                          <div>

                            <span>
                              Order Date
                            </span>

                            <strong>

                              {order.date
                                ? new Date(
                                    order.date
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "-"}

                            </strong>

                          </div>


                          <div>

                            <span>
                              Items
                            </span>

                            <strong>
                              {order.items?.length || 0}
                            </strong>

                          </div>


                          <div>

                            <span>
                              Total
                            </span>

                            <strong>
                              ₹
                              {Number(
                                order.total || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                          </div>

                        </div>


                        {/* ORDER ITEMS */}

                        {order.items &&
                          order.items.length > 0 && (

                            <div className="profile-order-items">

                              {order.items
                                .slice(0, 3)
                                .map(
                                  (item, index) => (

                                    <div
                                      key={
                                        item.id ||
                                        index
                                      }
                                      className="profile-order-item"
                                    >

                                      <div className="profile-order-item-image">

                                        {item.image ? (

                                          <img
                                            src={item.image}
                                            alt={
                                              item.name ||
                                              "Product"
                                            }
                                          />

                                        ) : (

                                          <FaBoxOpen />

                                        )}

                                      </div>


                                      <div className="profile-order-item-info">

                                        <strong>
                                          {item.name ||
                                            "Product"}
                                        </strong>

                                        <span>
                                          Qty:{" "}
                                          {item.quantity ||
                                            1}
                                        </span>

                                      </div>

                                    </div>

                                  )
                                )}


                              {order.items.length > 3 && (

                                <div className="profile-more-items">

                                  +
                                  {order.items.length - 3}
                                  {" "}
                                  more item
                                  {order.items.length - 3 !== 1
                                    ? "s"
                                    : ""}

                                </div>

                              )}

                            </div>

                          )}

                      </div>

                    ))}

                  </div>

                )}

              </section>


              {/* =================================================
                  QUICK ACTIONS
              ================================================= */}

              <section className="profile-section-card">

                <div className="profile-section-header">

                  <div>

                    <span className="section-label">
                      QUICK ACCESS
                    </span>

                    <h2>
                      Quick Actions
                    </h2>

                  </div>

                </div>


                <div className="quick-actions">

                  {/* BROWSE PRODUCTS */}

                  <Link
                    to="/products"
                    className="quick-action"
                  >

                    <div className="quick-action-icon">
                      <FaShoppingBag />
                    </div>

                    <div>

                      <strong>
                        Browse Products
                      </strong>

                      <span>
                        Explore electrical products
                      </span>

                    </div>

                    <FaChevronRight />

                  </Link>


                  {/* WISHLIST */}

                  <Link
                    to="/wishlist"
                    className="quick-action"
                  >

                    <div className="quick-action-icon wishlist-action">
                      <FaHeart />
                    </div>

                    <div>

                      <strong>
                        My Wishlist
                      </strong>

                      <span>
                        View your saved products
                      </span>

                    </div>

                    <FaChevronRight />

                  </Link>


                  {/* CHANGE PASSWORD */}

                  <Link
                    to="/change-password"
                    className="quick-action"
                  >

                    <div className="quick-action-icon">
                      <FaLock />
                    </div>

                    <div>

                      <strong>
                        Change Password
                      </strong>

                      <span>
                        Secure your account
                      </span>

                    </div>

                    <FaChevronRight />

                  </Link>


                  {/* CONTACT */}

                  <Link
                    to="/contact"
                    className="quick-action"
                  >

                    <div className="quick-action-icon">
                      <FaEnvelope />
                    </div>

                    <div>

                      <strong>
                        Contact Us
                      </strong>

                      <span>
                        Get help from our team
                      </span>

                    </div>

                    <FaChevronRight />

                  </Link>

                </div>

              </section>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Profile;