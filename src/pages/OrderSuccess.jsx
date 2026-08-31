import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/orderSuccess.css";

const API_BASE_URL = "http://localhost:8080/api";

const OrderSuccess = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setError("Order ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/orders/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Order Success API Response:", data);

        setOrder(data);
      } catch (err) {
        console.error("Failed to load order:", err);

        setError(
          err.message || "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="order-success-page">
        <div className="success-loading">

          <div className="loading-spinner"></div>

          <h3>Loading your order...</h3>

          <p>
            Please wait while we load your order details.
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !order) {
    return (
      <div className="order-success-page">

        <div className="success-error">

          <div className="error-icon">
            !
          </div>

          <h2>Order Not Found</h2>

          <p>
            {error || "We could not find this order."}
          </p>

          <div className="success-actions">

            <Link
              to="/products"
              className="success-primary-btn"
            >
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="success-secondary-btn"
            >
              My Orders
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // SAFE VALUES
  // =====================================================

  const orderNumber =
    order.orderNumber ||
    `ORD-${order.id || id}`;

  const customerName =
    order.customerName || "Customer";

  const customerEmail =
    order.customerEmail || "N/A";

  const customerPhone =
    order.customerPhone || "N/A";

  const address =
    order.address || "Address not available";

  const city =
    order.city || "";

  const state =
    order.state || "";

  const pincode =
    order.pincode || "";

  const orderStatus =
    order.orderStatus || "PLACED";

  const paymentMethod =
    order.paymentMethod || "COD";

  const paymentStatus =
    order.paymentStatus || "PENDING";

  // =====================================================
  // AMOUNTS
  // =====================================================

  const subtotal = Number(
    order.subtotal || 0
  );

  const shippingCharge = Number(
    order.shippingCharge || 0
  );

  const totalAmount = Number(
    order.totalAmount ??
    order.total ??
    subtotal + shippingCharge
  );

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "N/A";
    }

    try {
      return new Date(dateValue).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return dateValue;
    }
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (
      String(status || "")
        .toUpperCase()
    ) {
      case "DELIVERED":
        return "status-delivered";

      case "SHIPPED":
        return "status-shipped";

      case "OUT_FOR_DELIVERY":
        return "status-out-for-delivery";

      case "PROCESSING":
        return "status-processing";

      case "CONFIRMED":
        return "status-confirmed";

      case "CANCELLED":
        return "status-cancelled";

      default:
        return "status-placed";
    }
  };

  // =====================================================
  // PAYMENT CLASS
  // =====================================================

  const getPaymentStatusClass = (status) => {
    switch (
      String(status || "")
        .toUpperCase()
    ) {
      case "PAID":
        return "payment-paid";

      case "FAILED":
        return "payment-failed";

      case "REFUNDED":
        return "payment-refunded";

      default:
        return "payment-pending";
    }
  };

  return (
    <div className="order-success-page">

      <div className="order-success-container">

        {/* =================================================
            SUCCESS HEADER
        ================================================= */}

        <div className="success-header">

          <div className="success-check">
            ✓
          </div>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you for shopping with{" "}
            <strong>Mishra Electro</strong>.
          </p>

          <span className="success-message">
            Your order has been received successfully.
          </span>

        </div>

        {/* =================================================
            ORDER INFORMATION
        ================================================= */}

        <div className="order-number-card">

          <div className="order-number-left">

            <span className="small-label">
              ORDER NUMBER
            </span>

            <h2>
              {orderNumber}
            </h2>

            <p>
              Order Date:{" "}
              <strong>
                {formatDate(order.orderDate)}
              </strong>
            </p>

          </div>

          <div className="order-status">

            <span>
              Order Status
            </span>

            <strong
              className={getStatusClass(orderStatus)}
            >
              {String(orderStatus)
                .replaceAll("_", " ")}
            </strong>

          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="success-grid">

          {/* =================================================
              CUSTOMER DETAILS
          ================================================= */}

          <div className="success-card">

            <div className="card-title">

              <div className="card-icon">
                👤
              </div>

              <div>
                <h3>
                  Customer Details
                </h3>

                <p>
                  Your contact information
                </p>
              </div>

            </div>

            <div className="detail-list">

              <div className="detail-row">

                <span>
                  Name
                </span>

                <strong>
                  {customerName}
                </strong>

              </div>

              <div className="detail-row">

                <span>
                  Email
                </span>

                <strong>
                  {customerEmail}
                </strong>

              </div>

              <div className="detail-row">

                <span>
                  Phone
                </span>

                <strong>
                  {customerPhone}
                </strong>

              </div>

            </div>

          </div>

          {/* =================================================
              DELIVERY ADDRESS
          ================================================= */}

          <div className="success-card">

            <div className="card-title">

              <div className="card-icon">
                📍
              </div>

              <div>
                <h3>
                  Delivery Address
                </h3>

                <p>
                  Where your order will be delivered
                </p>
              </div>

            </div>

            <div className="address-box">

              <strong>
                {customerName}
              </strong>

              <p>
                {address}
              </p>

              {(city || state) && (
                <p>
                  {city}
                  {city && state ? ", " : ""}
                  {state}
                </p>
              )}

              {pincode && (
                <p>
                  PIN: {pincode}
                </p>
              )}

            </div>

          </div>

          {/* =================================================
              PAYMENT
          ================================================= */}

          <div className="success-card">

            <div className="card-title">

              <div className="card-icon">
                💳
              </div>

              <div>
                <h3>
                  Payment
                </h3>

                <p>
                  Payment information
                </p>
              </div>

            </div>

            <div className="payment-info">

              <div>

                <span>
                  Payment Method
                </span>

                <strong>
                  {String(paymentMethod)
                    .replaceAll("_", " ")}
                </strong>

              </div>

              <div>

                <span>
                  Payment Status
                </span>

                <strong
                  className={getPaymentStatusClass(
                    paymentStatus
                  )}
                >
                  {String(paymentStatus)
                    .replaceAll("_", " ")}
                </strong>

              </div>

              {/* RAZORPAY DETAILS */}

              {order.razorpayOrderId && (
                <div>

                  <span>
                    Razorpay Order ID
                  </span>

                  <strong className="razorpay-id">
                    {order.razorpayOrderId}
                  </strong>

                </div>
              )}

              {order.razorpayPaymentId && (
                <div>

                  <span>
                    Razorpay Payment ID
                  </span>

                  <strong className="razorpay-id">
                    {order.razorpayPaymentId}
                  </strong>

                </div>
              )}

            </div>

          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="success-card amount-card">

            <div className="card-title">

              <div className="card-icon">
                🧾
              </div>

              <div>
                <h3>
                  Order Summary
                </h3>

                <p>
                  Payment breakdown
                </p>
              </div>

            </div>

            <div className="amount-list">

              {/* SUBTOTAL */}

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal.toFixed(2)}
                </strong>

              </div>

              {/* SHIPPING */}

              <div>

                <span>
                  Delivery
                </span>

                <strong
                  className={
                    shippingCharge === 0
                      ? "free-shipping"
                      : ""
                  }
                >
                  {shippingCharge === 0
                    ? "FREE"
                    : `₹${shippingCharge.toFixed(2)}`}
                </strong>

              </div>

              {/* SHIPPING TYPE */}

              {order.shipping && (
                <div>

                  <span>
                    Shipping Type
                  </span>

                  <strong>
                    {order.shipping}
                  </strong>

                </div>
              )}

              <div className="amount-divider"></div>

              {/* TOTAL */}

              <div className="grand-total">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{totalAmount.toFixed(2)}
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            WHAT'S NEXT
        ================================================= */}

        <div className="next-steps-card">

          <h2>
            What's Next?
          </h2>

          <div className="steps">

            <div className="step">

              <div className="step-number">
                1
              </div>

              <div>

                <h4>
                  Order Confirmation
                </h4>

                <p>
                  Your order has been successfully placed.
                </p>

              </div>

            </div>

            <div className="step">

              <div className="step-number">
                2
              </div>

              <div>

                <h4>
                  Order Processing
                </h4>

                <p>
                  Our team will prepare your products.
                </p>

              </div>

            </div>

            <div className="step">

              <div className="step-number">
                3
              </div>

              <div>

                <h4>
                  Delivery
                </h4>

                <p>
                  Your order will be delivered to your address.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div className="success-actions">

          <Link
            to="/products"
            className="success-primary-btn"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="success-secondary-btn"
          >
            View My Orders
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;