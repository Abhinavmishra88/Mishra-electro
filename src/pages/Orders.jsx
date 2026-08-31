import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";

const API_BASE_URL = "http://localhost:8080";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      let email = user?.email;
      let phone = user?.phone;

      if (!email) {
        email = localStorage.getItem("userEmail");
      }

      if (!phone) {
        phone = localStorage.getItem("userPhone");
      }

      let url = `${API_BASE_URL}/api/orders`;

      if (email) {
        url =
          `${API_BASE_URL}/api/orders/customer/email/` +
          encodeURIComponent(email);
      } else if (phone) {
        url =
          `${API_BASE_URL}/api/orders/customer/phone/` +
          encodeURIComponent(phone);
      }

      console.log("Loading orders:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to load orders (${response.status})`
        );
      }

      const data = await response.json();

      console.log("Orders response:", data);

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Order loading error:", err);
      setError("Unable to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    const value = String(status || "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    if (
      value.includes("deliver") ||
      value.includes("complete")
    ) {
      return "status-delivered";
    }

    if (
      value.includes("cancel") ||
      value.includes("fail")
    ) {
      return "status-cancelled";
    }

    if (
      value.includes("ship") ||
      value.includes("transit")
    ) {
      return "status-shipped";
    }

    if (
      value.includes("approve") ||
      value.includes("confirm")
    ) {
      return "status-approved";
    }

    return "status-pending";
  };

  // =====================================================
  // PAYMENT STATUS
  // =====================================================

  const getPaymentStatusClass = (status) => {
    const value = String(status || "").toLowerCase();

    if (
      value.includes("paid") ||
      value.includes("success") ||
      value.includes("complete")
    ) {
      return "payment-success";
    }

    if (
      value.includes("fail") ||
      value.includes("refund")
    ) {
      return "payment-failed";
    }

    return "payment-pending";
  };

  // =====================================================
  // PAYMENT MODE
  // =====================================================

  const getPaymentMode = (order) => {
    return (
      order.paymentMode ||
      order.paymentMethod ||
      (order.razorpayPaymentId
        ? "Razorpay"
        : "Cash on Delivery")
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-loading">
            <div className="loading-spinner"></div>

            <h3>Loading your orders...</h3>

            <p>
              Please wait while we fetch your orders.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="orders-page">

      <div className="orders-container">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="orders-header">

          <div className="orders-title-area">

            <div className="orders-title-icon">
              📦
            </div>

            <div>
              <h1>My Orders</h1>

              <p>
                Track and manage all your Mishra Electro orders.
              </p>
            </div>

          </div>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/products")}
          >
            ← Continue Shopping
          </button>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="orders-error">

            <div className="error-icon">
              ⚠️
            </div>

            <div>
              <strong>
                Something went wrong
              </strong>

              <p>{error}</p>
            </div>

            <button onClick={loadOrders}>
              Try Again
            </button>

          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!error && orders.length === 0 && (
          <div className="empty-orders">

            <div className="empty-orders-icon">
              🛒
            </div>

            <h2>No orders yet</h2>

            <p>
              You haven't placed any orders yet.
              Start shopping to place your first order.
            </p>

            <button
              onClick={() => navigate("/products")}
            >
              Shop Products →
            </button>

          </div>
        )}

        {/* =================================================
            ORDERS
        ================================================= */}

        {orders.length > 0 && (
          <div className="orders-list">

            {orders.map((order) => (

              <article
                className="order-card"
                key={order.id || order.orderNumber}
              >

                {/* =================================================
                    ORDER TOP
                ================================================= */}

                <div className="order-card-header">

                  <div className="order-number-area">

                    <span className="order-label">
                      ORDER NUMBER
                    </span>

                    <h2>
                      {order.orderNumber ||
                        `#${order.id}`}
                    </h2>

                  </div>

                  <div className="order-date">

                    <span>
                      Order Date
                    </span>

                    <strong>
                      {formatDate(order.orderDate)}
                    </strong>

                  </div>

                </div>

                {/* =================================================
                    STATUS
                ================================================= */}

                <div className="order-status-row">

                  <div className="status-box">

                    <span>
                      Order Status
                    </span>

                    <strong
                      className={getStatusClass(
                        order.orderStatus
                      )}
                    >
                      {order.orderStatus ||
                        "PLACED"}
                    </strong>

                  </div>

                  <div className="status-box">

                    <span>
                      Payment
                    </span>

                    <strong
                      className={getPaymentStatusClass(
                        order.paymentStatus
                      )}
                    >
                      {order.paymentStatus ||
                        "PENDING"}
                    </strong>

                  </div>

                  <div className="status-box">

                    <span>
                      Approval
                    </span>

                    <strong
                      className={getStatusClass(
                        order.approvalStatus
                      )}
                    >
                      {order.approvalStatus ||
                        "PENDING"}
                    </strong>

                  </div>

                  <div className="status-box">

                    <span>
                      Delivery
                    </span>

                    <strong
                      className={getStatusClass(
                        order.deliveryStatus
                      )}
                    >
                      {order.deliveryStatus ||
                        "PENDING"}
                    </strong>

                  </div>

                </div>

                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div className="order-information">

                  {/* CUSTOMER */}

                  <div className="information-section">

                    <div className="section-heading">

                      <div className="section-icon customer-icon">
                        👤
                      </div>

                      <div>
                        <h3>
                          Customer
                        </h3>

                        <span>
                          Contact information
                        </span>
                      </div>

                    </div>

                    <div className="info-content">

                      <div className="info-row">
                        <span>Name</span>
                        <strong>
                          {order.customerName ||
                            "N/A"}
                        </strong>
                      </div>

                      <div className="info-row">
                        <span>Phone</span>
                        <strong>
                          {order.customerPhone ||
                            "N/A"}
                        </strong>
                      </div>

                      <div className="info-row">
                        <span>Email</span>
                        <strong className="break-text">
                          {order.customerEmail ||
                            "N/A"}
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* ADDRESS */}

                  <div className="information-section">

                    <div className="section-heading">

                      <div className="section-icon address-icon">
                        📍
                      </div>

                      <div>
                        <h3>
                          Delivery Address
                        </h3>

                        <span>
                          Shipping location
                        </span>
                      </div>

                    </div>

                    <div className="info-content">

                      <div className="address-text">
                        {order.address ||
                          "N/A"}
                      </div>

                      <div className="address-text">
                        {order.city || ""}
                        {order.state
                          ? `, ${order.state}`
                          : ""}
                      </div>

                      <div className="info-row">

                        <span>
                          PIN Code
                        </span>

                        <strong>
                          {order.pincode ||
                            "N/A"}
                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* PAYMENT */}

                  <div className="information-section">

                    <div className="section-heading">

                      <div className="section-icon payment-icon">
                        💳
                      </div>

                      <div>
                        <h3>
                          Payment
                        </h3>

                        <span>
                          Payment information
                        </span>
                      </div>

                    </div>

                    <div className="info-content">

                      <div className="info-row">

                        <span>
                          Payment Mode
                        </span>

                        <strong>
                          {getPaymentMode(order)}
                        </strong>

                      </div>

                      <div className="info-row">

                        <span>
                          Payment Status
                        </span>

                        <strong
                          className={`payment-text ${getPaymentStatusClass(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus ||
                            "PENDING"}
                        </strong>

                      </div>

                      {order.razorpayPaymentId && (
                        <div className="payment-id-box">

                          <span>
                            Razorpay Payment ID
                          </span>

                          <strong>
                            {order.razorpayPaymentId}
                          </strong>

                        </div>
                      )}

                    </div>

                  </div>

                </div>

                {/* =================================================
                    TRACKING
                ================================================= */}

                <div className="tracking-section">

                  <div className="tracking-header">

                    <div>

                      <span className="tracking-small-title">
                        ORDER TRACKING
                      </span>

                      <h3>
                        Track Your Delivery
                      </h3>

                    </div>

                    <div className="delivery-estimate">

                      <span>
                        🚚 Estimated Delivery
                      </span>

                      <strong>
                        {order.estimatedDelivery ||
                          "Will be updated soon"}
                      </strong>

                    </div>

                  </div>

                  <div className="tracking-line">

                    <div
                      className={`tracking-step active`}
                    >
                      <div className="tracking-dot">
                        ✓
                      </div>

                      <span>
                        Order Placed
                      </span>
                    </div>

                    <div
                      className={`tracking-connector ${
                        order.approvalStatus
                          ?.toLowerCase()
                          .includes("approve")
                          ? "active"
                          : ""
                      }`}
                    ></div>

                    <div
                      className={`tracking-step ${
                        order.approvalStatus
                          ?.toLowerCase()
                          .includes("approve")
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="tracking-dot">
                        2
                      </div>

                      <span>
                        Approved
                      </span>
                    </div>

                    <div
                      className={`tracking-connector ${
                        order.deliveryStatus
                          ?.toLowerCase()
                          .includes("ship")
                          ? "active"
                          : ""
                      }`}
                    ></div>

                    <div
                      className={`tracking-step ${
                        order.deliveryStatus
                          ?.toLowerCase()
                          .includes("ship")
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="tracking-dot">
                        3
                      </div>

                      <span>
                        Shipped
                      </span>
                    </div>

                    <div
                      className={`tracking-connector ${
                        order.deliveryStatus
                          ?.toLowerCase()
                          .includes("deliver")
                          ? "active"
                          : ""
                      }`}
                    ></div>

                    <div
                      className={`tracking-step ${
                        order.deliveryStatus
                          ?.toLowerCase()
                          .includes("deliver")
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="tracking-dot">
                        4
                      </div>

                      <span>
                        Delivered
                      </span>
                    </div>

                  </div>

                </div>

                {/* =================================================
                    AMOUNT
                ================================================= */}

                <div className="order-bottom">

                  <div className="order-actions">

                    <button
                      className="track-order-btn"
                      onClick={() =>
                        navigate(
                          `/orders/${order.id}`
                        )
                      }
                    >
                      📍 Track Order
                    </button>

                  </div>

                  <div className="order-amount-section">

                    <div className="amount-row">
                      <span>
                        Subtotal
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.subtotal || 0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <div className="amount-row">
                      <span>
                        Shipping
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.shippingCharge || 0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <div className="amount-total">
                      <span>
                        Total Amount
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.totalAmount ||
                            order.total ||
                            0
                        ).toFixed(2)}
                      </strong>
                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}