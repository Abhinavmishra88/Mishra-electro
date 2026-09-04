import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaTags,
  FaSignOutAlt,
  FaHome,
  FaUserShield,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaSyncAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "../styles/AdminDashboard.css";

const API_BASE_URL = "https://mishra-electro.onrender.com/api";

function AdminDashboard() {
  const { user, logout } = useAuth();

  // =====================================================
  // STATE
  // =====================================================

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // MOBILE SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =====================================================
  // CLOSE SIDEBAR
  // =====================================================

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    logout();
    window.location.href = "/login/admin";
  };

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Unable to load products");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  };

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Unable to load orders");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  };

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  const loadDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [productsData, ordersData] = await Promise.all([
        fetchProducts(),
        fetchOrders(),
      ]);

      setProducts(productsData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err.message ||
          "Unable to connect to the Spring Boot server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  // =====================================================
  // DASHBOARD STATISTICS
  // =====================================================

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      String(order.orderStatus || "").toUpperCase() ===
      "PENDING"
  ).length;

  const completedOrders = orders.filter((order) => {
    const status = String(
      order.orderStatus || ""
    ).toUpperCase();

    return (
      status === "DELIVERED" ||
      status === "COMPLETED"
    );
  }).length;

  const totalRevenue = orders.reduce((sum, order) => {
    const status = String(
      order.orderStatus || ""
    ).toUpperCase();

    if (
      status === "CANCELLED" ||
      status === "CANCELED"
    ) {
      return sum;
    }

    return sum + Number(order.total || 0);
  }, 0);

  const customers = new Set(
    orders
      .map((order) =>
        String(order.customerEmail || "")
          .trim()
          .toLowerCase()
      )
      .filter(Boolean)
  ).size;

  const categories = new Set(
    products
      .map((product) =>
        String(product.category || "")
          .trim()
          .toLowerCase()
      )
      .filter(Boolean)
  ).size;

  // =====================================================
  // RECENT ORDERS
  // =====================================================

  const recentOrders = [...orders]
    .sort((a, b) => {
      const dateA = new Date(a.orderDate || 0);
      const dateB = new Date(b.orderDate || 0);

      return dateB - dateA;
    })
    .slice(0, 5);

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="admin-dashboard-page">
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <FaSyncAlt
            style={{
              fontSize: "32px",
              animation:
                "adminSpin 1s linear infinite",
            }}
          />

          <strong>
            Loading Admin Dashboard...
          </strong>

          <span>
            Connecting to Spring Boot server
          </span>
        </div>
      </main>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-wrapper">

        {/* =================================================
            MOBILE OVERLAY
        ================================================= */}

        {sidebarOpen && (
          <div
            className="admin-sidebar-overlay"
            onClick={closeSidebar}
          />
        )}

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className={`admin-sidebar ${
            sidebarOpen ? "sidebar-open" : ""
          }`}
        >

          {/* MOBILE CLOSE BUTTON */}

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* BRAND */}

          <div className="admin-sidebar-brand">
            <div className="admin-sidebar-logo">
              ⚡
            </div>

            <div>
              <h2>MISHRA ELECTRO</h2>
              <span>ADMIN PANEL</span>
            </div>
          </div>

          {/* ADMIN USER */}

          <div className="admin-sidebar-user">
            <div className="admin-user-icon">
              <FaUserShield />
            </div>

            <div>
              <strong>
                {user?.name || "Administrator"}
              </strong>

              <span>
                {user?.email || "Admin"}
              </span>
            </div>
          </div>

          {/* NAVIGATION */}

          <nav className="admin-sidebar-nav">

            <Link
              to="/admin/dashboard"
              className="admin-sidebar-link active"
              onClick={closeSidebar}
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/products"
              className="admin-sidebar-link"
              onClick={closeSidebar}
            >
              <FaBoxOpen />
              <span>Products</span>
            </Link>

            <Link
              to="/admin/orders"
              className="admin-sidebar-link"
              onClick={closeSidebar}
            >
              <FaShoppingCart />
              <span>Orders</span>
            </Link>

            <Link
              to="/admin/customers"
              className="admin-sidebar-link"
              onClick={closeSidebar}
            >
              <FaUsers />
              <span>Customers</span>
            </Link>

            <Link
              to="/admin/categories"
              className="admin-sidebar-link"
              onClick={closeSidebar}
            >
              <FaTags />
              <span>Categories</span>
            </Link>

          </nav>

          {/* SIDEBAR BOTTOM */}

          <div className="admin-sidebar-bottom">

            <Link
              to="/"
              className="admin-sidebar-home"
              onClick={closeSidebar}
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>

            <button
              type="button"
              className="admin-sidebar-logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>

          </div>

        </aside>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="admin-dashboard-content">

          {/* HEADER */}

          <div className="admin-dashboard-header">

            <div className="admin-header-left">

              {/* HAMBURGER */}

              <button
                type="button"
                className="admin-mobile-menu-btn"
                onClick={() =>
                  setSidebarOpen(true)
                }
                aria-label="Open admin menu"
              >
                <FaBars />
              </button>

              <div>
                <span>ADMINISTRATION</span>

                <h1>Dashboard</h1>

                <p>
                  Welcome back,{" "}
                  <strong>
                    {user?.name || "Administrator"}
                  </strong>
                </p>
              </div>

            </div>

            <div
              className="admin-header-actions"
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >

              <button
                type="button"
                onClick={() =>
                  loadDashboardData(true)
                }
                disabled={refreshing}
                style={{
                  border: "none",
                  cursor: refreshing
                    ? "not-allowed"
                    : "pointer",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: refreshing ? 0.6 : 1,
                }}
              >
                <FaSyncAlt
                  style={{
                    animation: refreshing
                      ? "adminSpin 1s linear infinite"
                      : "none",
                  }}
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

              <Link
                to="/admin/orders"
                className="admin-view-orders-btn"
              >
                <FaShoppingCart />
                View Orders
              </Link>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div
              style={{
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #dc3545",
              }}
            >
              <strong>
                Backend Error:
              </strong>{" "}
              {error}

              <br />

              <small>
                Make sure Spring Boot is running on
                https://mishra-electro.onrender.com
              </small>
            </div>
          )}

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="admin-stat-grid">

            {/* PRODUCTS */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                <FaBoxOpen />
              </div>

              <div>
                <span>Products</span>

                <strong>
                  {totalProducts}
                </strong>
              </div>

              <Link to="/admin/products">
                View
              </Link>

            </div>

            {/* ORDERS */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                <FaShoppingCart />
              </div>

              <div>
                <span>Orders</span>

                <strong>
                  {totalOrders}
                </strong>
              </div>

              <Link to="/admin/orders">
                View
              </Link>

            </div>

            {/* CUSTOMERS */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                <FaUsers />
              </div>

              <div>
                <span>Customers</span>

                <strong>
                  {customers}
                </strong>
              </div>

              <Link to="/admin/customers">
                View
              </Link>

            </div>

            {/* CATEGORIES */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                <FaTags />
              </div>

              <div>
                <span>Categories</span>

                <strong>
                  {categories}
                </strong>
              </div>

              <Link to="/admin/categories">
                View
              </Link>

            </div>

          </div>

          {/* =================================================
              BUSINESS STATISTICS
          ================================================= */}

          <div className="admin-stat-grid">

            {/* REVENUE */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                <FaRupeeSign />
              </div>

              <div>
                <span>Total Revenue</span>

                <strong>
                  {formatCurrency(totalRevenue)}
                </strong>
              </div>

            </div>

            {/* PENDING */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                <FaClock />
              </div>

              <div>
                <span>Pending Orders</span>

                <strong>
                  {pendingOrders}
                </strong>
              </div>

            </div>

            {/* COMPLETED */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                <FaCheckCircle />
              </div>

              <div>
                <span>Completed Orders</span>

                <strong>
                  {completedOrders}
                </strong>
              </div>

            </div>

          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="admin-dashboard-section">

            <div className="admin-section-header">

              <div>
                <span>
                  STORE MANAGEMENT
                </span>

                <h2>
                  Quick Actions
                </h2>
              </div>

            </div>

            <div className="admin-quick-actions">

              <Link
                to="/admin/products"
                className="admin-action-card"
              >
                <FaBoxOpen />

                <div>
                  <strong>
                    Manage Products
                  </strong>

                  <span>
                    Add, edit and remove products
                  </span>
                </div>
              </Link>

              <Link
                to="/admin/orders"
                className="admin-action-card"
              >
                <FaShoppingCart />

                <div>
                  <strong>
                    Manage Orders
                  </strong>

                  <span>
                    View and update customer orders
                  </span>
                </div>
              </Link>

              <Link
                to="/admin/customers"
                className="admin-action-card"
              >
                <FaUsers />

                <div>
                  <strong>
                    Manage Customers
                  </strong>

                  <span>
                    View registered customers
                  </span>
                </div>
              </Link>

              <Link
                to="/admin/categories"
                className="admin-action-card"
              >
                <FaTags />

                <div>
                  <strong>
                    Manage Categories
                  </strong>

                  <span>
                    Organize store categories
                  </span>
                </div>
              </Link>

            </div>

          </div>

          {/* =================================================
              RECENT ORDERS
          ================================================= */}

          <div className="admin-dashboard-section">

            <div className="admin-section-header">

              <div>
                <span>
                  ORDERS
                </span>

                <h2>
                  Recent Orders
                </h2>
              </div>

              <Link to="/admin/orders">
                View All
              </Link>

            </div>

            {recentOrders.length === 0 ? (

              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                <FaShoppingCart
                  style={{
                    fontSize: "30px",
                    marginBottom: "10px",
                  }}
                />

                <p>
                  No orders found.
                </p>
              </div>

            ) : (

              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                }}
              >

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >

                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentOrders.map((order) => (

                      <tr key={order.id}>

                        <td>
                          {order.orderNumber ||
                            `#${order.id}`}
                        </td>

                        <td>
                          {order.customerName ||
                            order.customerEmail ||
                            "-"}
                        </td>

                        <td>
                          {formatDate(
                            order.orderDate
                          )}
                        </td>

                        <td>
                          {formatCurrency(
                            order.total
                          )}
                        </td>

                        <td>
                          {order.orderStatus ||
                            "PENDING"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* =================================================
              ORDER MANAGEMENT
          ================================================= */}

          <div className="admin-dashboard-order-box">

            <div className="admin-dashboard-order-icon">
              <FaShoppingCart />
            </div>

            <div>
              <h3>
                Order Management
              </h3>

              <p>
                View customer orders, update order
                status and manage payment status.
              </p>
            </div>

            <Link to="/admin/orders">
              Open Orders
            </Link>

          </div>

        </section>

      </div>

      {/* =====================================================
          ANIMATIONS + SIDEBAR MOBILE CSS
      ===================================================== */}

      <style>
        {`

          @keyframes adminSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          .admin-dashboard-content table th,
          .admin-dashboard-content table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }

          .admin-sidebar-bottom {
            margin-top: auto;
            padding-top: 18px;
            border-top: 1px solid #e5e7eb;
          }

          .admin-sidebar-home {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            margin-bottom: 6px;
            color: #374151;
            background: transparent;
            border-radius: 10px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
          }

          .admin-sidebar-home:hover {
            background: #ecfdf5;
            color: #047857;
          }

          .admin-sidebar-home svg {
            font-size: 17px;
            flex-shrink: 0;
          }

          .admin-sidebar-logout {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            border: none;
            border-radius: 10px;
            background: transparent;
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
          }

          .admin-sidebar-logout:hover {
            background: #fef2f2;
            color: #dc2626;
          }

          .admin-sidebar-logout svg {
            font-size: 17px;
            flex-shrink: 0;
          }

          /* =============================================
             DESKTOP
          ============================================= */

          .admin-mobile-menu-btn {
            display: none;
          }

          .admin-sidebar-close {
            display: none;
          }

          .admin-sidebar-overlay {
            display: none;
          }

          .admin-header-left {
            display: flex;
            align-items: center;
          }

          /* =============================================
             MOBILE
          ============================================= */

          @media (max-width: 900px) {

            .admin-mobile-menu-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 44px;
              height: 44px;
              margin-right: 12px;
              padding: 0;
              border: none;
              border-radius: 10px;
              background: #ffffff;
              color: #111827;
              font-size: 22px;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
              flex-shrink: 0;
            }

            .admin-mobile-menu-btn:hover {
              background: #f3f4f6;
            }

            .admin-sidebar {
              position: fixed !important;
              top: 0 !important;
              left: -290px !important;
              width: 270px !important;
              height: 100vh !important;
              z-index: 10001 !important;
              margin: 0 !important;
              transition: left 0.3s ease !important;
              overflow-y: auto !important;
              box-shadow: 8px 0 25px rgba(0,0,0,0.18);
            }

            .admin-sidebar.sidebar-open {
              left: 0 !important;
            }

            .admin-sidebar-close {
              position: absolute;
              top: 15px;
              right: 15px;
              z-index: 10002;
              width: 38px;
              height: 38px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              border-radius: 50%;
              background: #f3f4f6;
              color: #111827;
              font-size: 18px;
              cursor: pointer;
            }

            .admin-sidebar-close:hover {
              background: #e5e7eb;
            }

            .admin-sidebar-overlay {
              position: fixed;
              inset: 0;
              display: block;
              z-index: 10000;
              background: rgba(0, 0, 0, 0.45);
            }

            .admin-dashboard-content {
              width: 100% !important;
              margin-left: 0 !important;
            }

            .admin-dashboard-header {
              width: 100%;
              box-sizing: border-box;
            }

            .admin-header-actions {
              flex-wrap: wrap;
            }
          }

          /* =============================================
             SMALL MOBILE
          ============================================= */

          @media (max-width: 600px) {

            .admin-dashboard-header {
              padding: 15px !important;
            }

            .admin-header-left {
              align-items: flex-start;
            }

            .admin-mobile-menu-btn {
              width: 42px;
              height: 42px;
              margin-right: 9px;
              font-size: 20px;
            }

            .admin-header-actions {
              width: 100%;
              margin-top: 12px;
            }

            .admin-header-actions button,
            .admin-view-orders-btn {
              flex: 1;
              justify-content: center;
            }

            .admin-stat-grid {
              grid-template-columns: 1fr !important;
            }

            .admin-quick-actions {
              grid-template-columns: 1fr !important;
            }

            .admin-dashboard-order-box {
              grid-template-columns: 1fr !important;
              text-align: center;
            }

            .admin-dashboard-order-icon {
              margin: 0 auto;
            }

            .admin-dashboard-order-box a {
              width: 100%;
              text-align: center;
              box-sizing: border-box;
            }

          }

          /* =============================================
             VERY SMALL PHONES
          ============================================= */

          @media (max-width: 380px) {

            .admin-sidebar {
              width: 250px !important;
              left: -270px !important;
            }

            .admin-sidebar.sidebar-open {
              left: 0 !important;
            }

            .admin-mobile-menu-btn {
              width: 40px;
              height: 40px;
              margin-right: 7px;
            }

          }

        `}
      </style>

    </main>
  );
}

export default AdminDashboard;