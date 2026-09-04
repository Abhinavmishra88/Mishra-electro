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

const API_BASE_URL =
  "https://mishra-electro.onrender.com/api";

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

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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
    closeSidebar();

    logout();

    window.location.href = "/login/admin";
  };

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    const response = await fetch(
      `${API_BASE_URL}/products`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load products"
      );
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  };

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    const response = await fetch(
      `${API_BASE_URL}/orders`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load orders"
      );
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  };

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  const loadDashboardData = async (
    isRefresh = false
  ) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [
        productsData,
        ordersData,
      ] = await Promise.all([
        fetchProducts(),
        fetchOrders(),
      ]);

      setProducts(productsData);
      setOrders(ordersData);
    } catch (err) {
      console.error(
        "Dashboard error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect to the backend server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalProducts =
    products.length;

  const totalOrders =
    orders.length;

  const pendingOrders =
    orders.filter((order) => {
      const status = String(
        order.orderStatus || ""
      ).toUpperCase();

      return status === "PENDING";
    }).length;

  const completedOrders =
    orders.filter((order) => {
      const status = String(
        order.orderStatus || ""
      ).toUpperCase();

      return (
        status === "DELIVERED" ||
        status === "COMPLETED"
      );
    }).length;

  const totalRevenue =
    orders.reduce(
      (sum, order) => {
        const status = String(
          order.orderStatus || ""
        ).toUpperCase();

        if (
          status === "CANCELLED" ||
          status === "CANCELED"
        ) {
          return sum;
        }

        return (
          sum +
          Number(order.total || 0)
        );
      },
      0
    );

  const customers =
    new Set(
      orders
        .map((order) =>
          String(
            order.customerEmail || ""
          )
            .trim()
            .toLowerCase()
        )
        .filter(Boolean)
    ).size;

  const categories =
    new Set(
      products
        .map((product) =>
          String(
            product.category || ""
          )
            .trim()
            .toLowerCase()
        )
        .filter(Boolean)
    ).size;

  // =====================================================
  // RECENT ORDERS
  // =====================================================

  const recentOrders =
    [...orders]
      .sort((a, b) => {
        const dateA = new Date(
          a.orderDate || 0
        );

        const dateB = new Date(
          b.orderDate || 0
        );

        return dateB - dateA;
      })
      .slice(0, 5);

  // =====================================================
  // CURRENCY
  // =====================================================

  const formatCurrency = (
    amount
  ) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="admin-dashboard-page">

        <div className="admin-dashboard-loading">

          <FaSyncAlt className="admin-loading-icon" />

          <h3>
            Loading Admin Dashboard...
          </h3>

          <p>
            Connecting to Spring Boot server
          </p>

        </div>

      </main>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <main className="admin-dashboard-page">

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="admin-dashboard-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`admin-dashboard-sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >

        {/* BRAND */}

        <div className="admin-sidebar-brand">

          <div className="admin-sidebar-logo">
            ⚡
          </div>

          <div className="admin-sidebar-brand-text">

            <h2>
              MISHRA ELECTRO
            </h2>

            <span>
              ADMIN PANEL
            </span>

          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

        </div>

        {/* ADMIN PROFILE */}

        <div className="admin-sidebar-user">

          <div className="admin-user-icon">
            <FaUserShield />
          </div>

          <div className="admin-user-info">

            <strong>
              {user?.name ||
                "Administrator"}
            </strong>

            <span>
              {user?.email ||
                "Admin"}
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

            <span>
              Dashboard
            </span>
          </Link>

          <Link
            to="/admin/products"
            className="admin-sidebar-link"
            onClick={closeSidebar}
          >
            <FaBoxOpen />

            <span>
              Products
            </span>
          </Link>

          <Link
            to="/admin/orders"
            className="admin-sidebar-link"
            onClick={closeSidebar}
          >
            <FaShoppingCart />

            <span>
              Orders
            </span>
          </Link>

          <Link
            to="/admin/customers"
            className="admin-sidebar-link"
            onClick={closeSidebar}
          >
            <FaUsers />

            <span>
              Customers
            </span>
          </Link>

          <Link
            to="/admin/categories"
            className="admin-sidebar-link"
            onClick={closeSidebar}
          >
            <FaTags />

            <span>
              Categories
            </span>
          </Link>

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="admin-sidebar-bottom">

          <Link
            to="/"
            className="admin-sidebar-bottom-link"
            onClick={closeSidebar}
          >
            <FaHome />

            <span>
              Back to Home
            </span>
          </Link>

          <button
            type="button"
            className="admin-sidebar-bottom-link logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="admin-dashboard-content">

        {/* MOBILE HAMBURGER */}

        <button
          type="button"
          className="admin-mobile-menu"
          onClick={() =>
            setSidebarOpen(true)
          }
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="admin-dashboard-header">

          <div className="admin-dashboard-title">

            <span>
              ADMINISTRATION
            </span>

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back,{" "}
              <strong>
                {user?.name ||
                  "Administrator"}
              </strong>
            </p>

          </div>

          <div className="admin-header-actions">

            <button
              type="button"
              className="admin-refresh-btn"
              onClick={() =>
                loadDashboardData(true)
              }
              disabled={refreshing}
            >

              <FaSyncAlt
                className={
                  refreshing
                    ? "spin"
                    : ""
                }
              />

              <span>
                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </span>

            </button>

            <Link
              to="/admin/orders"
              className="admin-view-orders-btn"
            >
              <FaShoppingCart />

              <span>
                View Orders
              </span>
            </Link>

          </div>

        </header>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="admin-dashboard-error">

            <strong>
              Backend Error:
            </strong>

            <span>
              {error}
            </span>

          </div>
        )}

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="admin-stat-grid">

          {/* PRODUCTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon products">
              <FaBoxOpen />
            </div>

            <div className="admin-stat-content">

              <span>
                Products
              </span>

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

            <div className="admin-stat-icon orders">
              <FaShoppingCart />
            </div>

            <div className="admin-stat-content">

              <span>
                Orders
              </span>

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

            <div className="admin-stat-icon customers">
              <FaUsers />
            </div>

            <div className="admin-stat-content">

              <span>
                Customers
              </span>

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

            <div className="admin-stat-icon categories">
              <FaTags />
            </div>

            <div className="admin-stat-content">

              <span>
                Categories
              </span>

              <strong>
                {categories}
              </strong>

            </div>

            <Link to="/admin/categories">
              View
            </Link>

          </div>

          {/* REVENUE */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon revenue">
              <FaRupeeSign />
            </div>

            <div className="admin-stat-content">

              <span>
                Total Revenue
              </span>

              <strong>
                {formatCurrency(
                  totalRevenue
                )}
              </strong>

            </div>

          </div>

          {/* PENDING */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon pending">
              <FaClock />
            </div>

            <div className="admin-stat-content">

              <span>
                Pending Orders
              </span>

              <strong>
                {pendingOrders}
              </strong>

            </div>

          </div>

          {/* COMPLETED */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon completed">
              <FaCheckCircle />
            </div>

            <div className="admin-stat-content">

              <span>
                Completed Orders
              </span>

              <strong>
                {completedOrders}
              </strong>

            </div>

          </div>

        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="admin-dashboard-section">

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

              <div className="admin-action-icon products">
                <FaBoxOpen />
              </div>

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

              <div className="admin-action-icon orders">
                <FaShoppingCart />
              </div>

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

              <div className="admin-action-icon customers">
                <FaUsers />
              </div>

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

              <div className="admin-action-icon categories">
                <FaTags />
              </div>

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

        </section>

        {/* =================================================
            RECENT ORDERS
        ================================================= */}

        <section className="admin-dashboard-section">

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

            <div className="admin-empty-state">

              <FaShoppingCart />

              <p>
                No orders found.
              </p>

            </div>

          ) : (

            <div className="admin-orders-table-wrapper">

              <table className="admin-orders-table">

                <thead>

                  <tr>

                    <th>
                      Order
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map(
                    (order) => {

                      const status =
                        String(
                          order.orderStatus ||
                            "PENDING"
                        ).toLowerCase();

                      return (
                        <tr
                          key={order.id}
                        >

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

                            <span
                              className={`admin-order-status ${status}`}
                            >
                              {order.orderStatus ||
                                "PENDING"}
                            </span>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* =================================================
            ORDER MANAGEMENT
        ================================================= */}

        <section className="admin-order-management">

          <div className="admin-order-management-icon">
            <FaShoppingCart />
          </div>

          <div className="admin-order-management-text">

            <h3>
              Order Management
            </h3>

            <p>
              View customer orders, update
              order status and manage payment
              status.
            </p>

          </div>

          <Link
            to="/admin/orders"
            className="admin-order-management-btn"
          >
            Open Orders
          </Link>

        </section>

      </section>

    </main>
  );
}

export default AdminDashboard;