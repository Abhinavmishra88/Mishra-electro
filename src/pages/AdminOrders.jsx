import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaHome,
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaSignOutAlt,
  FaSearch,
  FaSyncAlt,
  FaEye,
  FaTimes,
  FaRupeeSign,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTrash,
  FaCreditCard,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "../styles/AdminOrders.css";

function AdminOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updatingPayment, setUpdatingPayment] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);

  // =========================================================
  // FETCH ORDERS
  // =========================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://mishra-electro.onrender.com/api/orders"
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          text || "Failed to fetch orders"
        );
      }

      const data = text ? JSON.parse(text) : [];

      setOrders(
        Array.isArray(data) ? data : []
      );

    } catch (err) {
      console.error("Order fetch error:", err);

      setError(
        err.message ||
          "Unable to load orders. Please make sure Spring Boot is running."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================================================
  // UPDATE ORDER STATUS
  // =========================================================

  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    try {
      setUpdatingStatus(orderId);

      const response = await fetch(
        `https://mishra-electro.onrender.com/api/orders/${orderId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const text = await response.text();

      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data?.message ||
              "Failed to update order status"
        );
      }

      // Update order in current state
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          Number(order.id) === Number(orderId)
            ? data
            : order
        )
      );

      // Update opened order
      if (
        selectedOrder &&
        Number(selectedOrder.id) ===
          Number(orderId)
      ) {
        setSelectedOrder(data);
      }

    } catch (err) {
      console.error(
        "Update order status error:",
        err
      );

      alert(
        err.message ||
          "Unable to update order status."
      );

    } finally {
      setUpdatingStatus(null);
    }
  };

  // =========================================================
  // UPDATE PAYMENT STATUS
  // =========================================================

  const updatePaymentStatus = async (
    orderId,
    status
  ) => {
    try {
      setUpdatingPayment(orderId);

      const response = await fetch(
        `https://mishra-electro.onrender.com/api/orders/${orderId}/payment-status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const text = await response.text();

      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data?.message ||
              "Failed to update payment status"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          Number(order.id) === Number(orderId)
            ? data
            : order
        )
      );

      if (
        selectedOrder &&
        Number(selectedOrder.id) ===
          Number(orderId)
      ) {
        setSelectedOrder(data);
      }

    } catch (err) {
      console.error(
        "Payment update error:",
        err
      );

      alert(
        err.message ||
          "Unable to update payment status."
      );

    } finally {
      setUpdatingPayment(null);
    }
  };

  // =========================================================
  // DELETE ORDER
  // =========================================================

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingOrder(orderId);

      const response = await fetch(
        `https://mishra-electro.onrender.com/api/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          text || "Failed to delete order"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) =>
            Number(order.id) !== Number(orderId)
        )
      );

      if (
        selectedOrder &&
        Number(selectedOrder.id) ===
          Number(orderId)
      ) {
        setSelectedOrder(null);
      }

    } catch (err) {
      console.error(
        "Delete order error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete order."
      );

    } finally {
      setDeletingOrder(null);
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return date;
    }

    return value.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // FORMAT MONEY
  // =========================================================

  const formatMoney = (value) => {
    const number = Number(value || 0);

    return number.toLocaleString(
      "en-IN"
    );
  };

  // =========================================================
  // STATUS LABEL
  // =========================================================

  const statusLabel = (status) => {
    if (!status) {
      return "Pending";
    }

    return String(status)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  // =========================================================
  // STATUS BADGE
  // =========================================================

  const getStatusBadge = (status) => {
    const value =
      String(status || "PLACED")
        .toUpperCase();

    if (value === "DELIVERED") {
      return (
        <span className="admin-status delivered">
          <FaCheckCircle />
          Delivered
        </span>
      );
    }

    if (value === "SHIPPED") {
      return (
        <span className="admin-status shipped">
          <FaTruck />
          Shipped
        </span>
      );
    }

    if (value === "OUT_FOR_DELIVERY") {
      return (
        <span className="admin-status shipped">
          <FaTruck />
          Out for Delivery
        </span>
      );
    }

    if (value === "CANCELLED") {
      return (
        <span className="admin-status cancelled">
          <FaTimes />
          Cancelled
        </span>
      );
    }

    if (value === "CONFIRMED") {
      return (
        <span className="admin-status confirmed">
          <FaCheckCircle />
          Confirmed
        </span>
      );
    }

    if (value === "PROCESSING") {
      return (
        <span className="admin-status processing">
          <FaClock />
          Processing
        </span>
      );
    }

    return (
      <span className="admin-status pending">
        <FaClock />
        {statusLabel(status)}
      </span>
    );
  };

  // =========================================================
  // FILTER ORDERS
  // =========================================================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        String(
          order.orderNumber || ""
        )
          .toLowerCase()
          .includes(searchValue) ||
        String(
          order.customerName || ""
        )
          .toLowerCase()
          .includes(searchValue) ||
        String(
          order.customerEmail || ""
        )
          .toLowerCase()
          .includes(searchValue) ||
        String(
          order.customerPhone || ""
        )
          .toLowerCase()
          .includes(searchValue);

      const currentStatus =
        String(
          order.orderStatus || "PLACED"
        ).toUpperCase();

      const matchesStatus =
        statusFilter === "ALL" ||
        currentStatus ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    orders,
    search,
    statusFilter,
  ]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const statistics = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter(
      (order) =>
        String(
          order.orderStatus || ""
        ).toUpperCase() === "PLACED"
    ).length;

    const processing = orders.filter(
      (order) =>
        String(
          order.orderStatus || ""
        ).toUpperCase() === "PROCESSING"
    ).length;

    const shipped = orders.filter(
      (order) =>
        String(
          order.orderStatus || ""
        ).toUpperCase() === "SHIPPED"
    ).length;

    const delivered = orders.filter(
      (order) =>
        String(
          order.orderStatus || ""
        ).toUpperCase() === "DELIVERED"
    ).length;

    const revenue = orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.totalAmount || 0
        ),
      0
    );

    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      revenue,
    };
  }, [orders]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="admin-orders-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="admin-brand-icon">
            <FaBoxOpen />
          </div>

          <div>
            <h2>Mishra Electro</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav">

          <Link to="/admin">
            <FaTachometerAlt />
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className="active"
          >
            <FaShoppingCart />
            Orders
          </Link>

          <Link to="/admin/products">
            <FaBoxOpen />
            Products
          </Link>

          <Link to="/admin/users">
            <FaUsers />
            Users
          </Link>

          <Link to="/">
            <FaHome />
            Store
          </Link>

        </nav>

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-topbar">

          <div>
            <h1>Orders</h1>

            <p>
              Manage and track customer orders
            </p>
          </div>

          <div className="admin-user">

            <div className="admin-user-avatar">
              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "A"}
            </div>

            <div>
              <strong>
                {user?.name || "Admin"}
              </strong>

              <small>
                Administrator
              </small>
            </div>

          </div>

        </div>


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="admin-stats-grid">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaShoppingCart />
            </div>

            <div>
              <span>Total Orders</span>
              <strong>
                {statistics.total}
              </strong>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaClock />
            </div>

            <div>
              <span>Pending</span>
              <strong>
                {statistics.pending}
              </strong>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaTruck />
            </div>

            <div>
              <span>Shipped</span>
              <strong>
                {statistics.shipped}
              </strong>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaCheckCircle />
            </div>

            <div>
              <span>Delivered</span>
              <strong>
                {statistics.delivered}
              </strong>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaRupeeSign />
            </div>

            <div>
              <span>Revenue</span>
              <strong>
                ₹{formatMoney(
                  statistics.revenue
                )}
              </strong>
            </div>
          </div>

        </div>


        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="admin-toolbar">

          <div className="admin-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search order, customer, email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            className="admin-filter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="ALL">
              All Orders
            </option>

            <option value="PLACED">
              Placed
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="PROCESSING">
              Processing
            </option>

            <option value="SHIPPED">
              Shipped
            </option>

            <option value="OUT_FOR_DELIVERY">
              Out for Delivery
            </option>

            <option value="DELIVERED">
              Delivered
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

          </select>


          <button
            type="button"
            className="admin-refresh"
            onClick={fetchOrders}
            disabled={loading}
          >
            <FaSyncAlt
              className={
                loading
                  ? "spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="admin-error">
            <strong>Error:</strong>{" "}
            {error}

            <button
              type="button"
              onClick={fetchOrders}
            >
              Try Again
            </button>
          </div>
        )}


        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <div className="admin-loading">
            <div className="admin-spinner"></div>

            <p>
              Loading orders...
            </p>
          </div>
        )}


        {/* ===================================================
            EMPTY
        =================================================== */}

        {!loading &&
          !error &&
          filteredOrders.length === 0 && (
            <div className="admin-empty">

              <FaBoxOpen />

              <h3>
                No orders found
              </h3>

              <p>
                No orders match your
                current search or filter.
              </p>

            </div>
          )}


        {/* ===================================================
            ORDER TABLE
        =================================================== */}

        {!loading &&
          filteredOrders.length > 0 && (

            <div className="admin-orders-card">

              <div className="admin-table-header">

                <div>
                  <h2>
                    Recent Orders
                  </h2>

                  <span>
                    Showing{" "}
                    {filteredOrders.length}{" "}
                    of {orders.length} orders
                  </span>
                </div>

              </div>


              <div className="admin-table-wrapper">

                <table className="admin-orders-table">

                  <thead>

                    <tr>

                      <th>Order</th>

                      <th>Customer</th>

                      <th>Date</th>

                      <th>Total</th>

                      <th>Payment</th>

                      <th>Status</th>

                      <th>Actions</th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredOrders.map(
                      (order) => {

                        const orderStatus =
                          String(
                            order.orderStatus ||
                              "PLACED"
                          ).toUpperCase();

                        const paymentStatus =
                          String(
                            order.paymentStatus ||
                              "PENDING"
                          ).toUpperCase();

                        return (
                          <tr
                            key={order.id}
                          >

                            {/* ORDER */}

                            <td>

                              <div className="order-number">

                                <strong>
                                  {order.orderNumber ||
                                    `#${order.id}`}
                                </strong>

                                <small>
                                  ID:{" "}
                                  {order.id}
                                </small>

                              </div>

                            </td>


                            {/* CUSTOMER */}

                            <td>

                              <div className="customer-info">

                                <strong>
                                  {order.customerName ||
                                    "Customer"}
                                </strong>

                                <small>
                                  {order.customerEmail ||
                                    "-"}
                                </small>

                                <small>
                                  {order.customerPhone ||
                                    "-"}
                                </small>

                              </div>

                            </td>


                            {/* DATE */}

                            <td>
                              {formatDate(
                                order.orderDate ||
                                  order.createdAt
                              )}
                            </td>


                            {/* TOTAL */}

                            <td>

                              <strong className="order-total">

                                ₹
                                {formatMoney(
                                  order.totalAmount
                                )}

                              </strong>

                            </td>


                            {/* PAYMENT */}

                            <td>

                              <select
                                className={`payment-select ${paymentStatus.toLowerCase()}`}
                                value={
                                  paymentStatus
                                }
                                disabled={
                                  updatingPayment ===
                                  order.id
                                }
                                onChange={(e) =>
                                  updatePaymentStatus(
                                    order.id,
                                    e.target.value
                                  )
                                }
                              >

                                <option value="PENDING">
                                  Pending
                                </option>

                                <option value="PAID">
                                  Paid
                                </option>

                                <option value="FAILED">
                                  Failed
                                </option>

                                <option value="REFUNDED">
                                  Refunded
                                </option>

                                <option value="CANCELLED">
                                  Cancelled
                                </option>

                              </select>

                            </td>


                            {/* STATUS */}

                            <td>

                              <div className="status-column">

                                {getStatusBadge(
                                  orderStatus
                                )}

                                <select
                                  className="order-status-select"
                                  value={
                                    orderStatus
                                  }
                                  disabled={
                                    updatingStatus ===
                                    order.id
                                  }
                                  onChange={(e) =>
                                    updateOrderStatus(
                                      order.id,
                                      e.target.value
                                    )
                                  }
                                >

                                  <option value="PLACED">
                                    Placed
                                  </option>

                                  <option value="CONFIRMED">
                                    Confirmed
                                  </option>

                                  <option value="PROCESSING">
                                    Processing
                                  </option>

                                  <option value="SHIPPED">
                                    Shipped
                                  </option>

                                  <option value="OUT_FOR_DELIVERY">
                                    Out for Delivery
                                  </option>

                                  <option value="DELIVERED">
                                    Delivered
                                  </option>

                                  <option value="CANCELLED">
                                    Cancelled
                                  </option>

                                </select>

                              </div>

                            </td>


                            {/* ACTIONS */}

                            <td>

                              <div className="order-actions">

                                <button
                                  type="button"
                                  className="action-view"
                                  title="View Order"
                                  onClick={() =>
                                    setSelectedOrder(
                                      order
                                    )
                                  }
                                >
                                  <FaEye />
                                </button>


                                <button
                                  type="button"
                                  className="action-delete"
                                  title="Delete Order"
                                  disabled={
                                    deletingOrder ===
                                    order.id
                                  }
                                  onClick={() =>
                                    deleteOrder(
                                      order.id
                                    )
                                  }
                                >
                                  <FaTrash />
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

      </main>


      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="admin-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>
                <span>
                  Order Details
                </span>

                <h2>
                  {selectedOrder.orderNumber ||
                    `#${selectedOrder.id}`}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                <FaTimes />
              </button>

            </div>


            <div className="admin-modal-body">

              {/* CUSTOMER */}

              <div className="detail-section">

                <h3>
                  Customer Information
                </h3>

                <div className="detail-grid">

                  <div>
                    <span>Name</span>
                    <strong>
                      {selectedOrder.customerName ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>
                      {selectedOrder.customerEmail ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>
                      {selectedOrder.customerPhone ||
                        "-"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* ORDER */}

              <div className="detail-section">

                <h3>
                  Order Information
                </h3>

                <div className="detail-grid">

                  <div>
                    <span>Order Date</span>
                    <strong>
                      {formatDate(
                        selectedOrder.orderDate ||
                          selectedOrder.createdAt
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Order Status</span>
                    <div>
                      {getStatusBadge(
                        selectedOrder.orderStatus
                      )}
                    </div>
                  </div>

                  <div>
                    <span>Payment Status</span>
                    <strong>
                      {statusLabel(
                        selectedOrder.paymentStatus
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Total</span>
                    <strong className="detail-total">
                      ₹
                      {formatMoney(
                        selectedOrder.totalAmount
                      )}
                    </strong>
                  </div>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="detail-section">

                <h3>
                  Delivery Address
                </h3>

                <p className="address-text">

                  {selectedOrder.address ||
                    selectedOrder.shippingAddress ||
                    "Address not available"}

                </p>

              </div>


              {/* ITEMS */}

              {Array.isArray(
                selectedOrder.items
              ) &&
                selectedOrder.items.length >
                  0 && (

                  <div className="detail-section">

                    <h3>
                      Order Items
                    </h3>

                    <div className="modal-items">

                      {selectedOrder.items.map(
                        (item, index) => (

                          <div
                            className="modal-item"
                            key={
                              item.id ||
                              index
                            }
                          >

                            <div className="modal-item-image">

                              {item.image ? (
                                <img
                                  src={
                                    item.image
                                  }
                                  alt={
                                    item.name ||
                                    "Product"
                                  }
                                />
                              ) : (
                                <FaBoxOpen />
                              )}

                            </div>

                            <div className="modal-item-info">

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

                            <strong>

                              ₹
                              {formatMoney(
                                Number(
                                  item.price ||
                                    0
                                ) *
                                  Number(
                                    item.quantity ||
                                      1
                                  )
                              )}

                            </strong>

                          </div>

                        )
                      )}

                    </div>

                  </div>
                )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminOrders;