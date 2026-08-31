import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OrderTracking.css";

const API_BASE_URL = "http://localhost:8080";

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/orders/${id}`
            );

            if (!response.ok) {
                throw new Error(
                    `Unable to load order (${response.status})`
                );
            }

            const data = await response.json();

            console.log("Order details:", data);

            setOrder(data);
        } catch (err) {
            console.error("Order details error:", err);
            setError("Unable to load order details.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "Not available";

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

    const formatMoney = (value) => {
        return Number(value || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const status = String(
        order?.orderStatus || ""
    ).toLowerCase();

    const paymentStatus = String(
        order?.paymentStatus || ""
    ).toLowerCase();

    const approvalStatus = String(
        order?.approvalStatus || ""
    ).toLowerCase();

    const deliveryStatus = String(
        order?.deliveryStatus || ""
    ).toLowerCase();

    const isCompleted = (values) => {
        return values.some((value) =>
            value.some((word) =>
                values.includes(word)
            )
        );
    };

    const orderPlaced = true;

    const paymentCompleted =
        paymentStatus.includes("paid") ||
        paymentStatus.includes("success") ||
        paymentStatus.includes("complete");

    const approved =
        approvalStatus.includes("approved") ||
        approvalStatus.includes("approve") ||
        approvalStatus.includes("confirmed");

    const shipped =
        deliveryStatus.includes("shipped") ||
        deliveryStatus.includes("transit") ||
        status.includes("shipped");

    const delivered =
        deliveryStatus.includes("delivered") ||
        status.includes("delivered") ||
        status.includes("complete");

    if (loading) {
        return (
            <div className="tracking-page">
                <div className="tracking-loading">
                    <div className="tracking-spinner"></div>

                    <h2>Loading order...</h2>

                    <p>
                        Please wait while we get your
                        order information.
                    </p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="tracking-page">
                <div className="tracking-error">

                    <div className="error-icon">
                        !
                    </div>

                    <h2>Order Not Found</h2>

                    <p>
                        {error ||
                            "We couldn't find this order."}
                    </p>

                    <div className="error-buttons">

                        <button
                            className="tracking-btn primary"
                            onClick={() => navigate("/orders")}
                        >
                            My Orders
                        </button>

                        <button
                            className="tracking-btn secondary"
                            onClick={fetchOrder}
                        >
                            Try Again
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tracking-page">

            <div className="tracking-container">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="tracking-header">

                    <div>

                        <button
                            className="back-button"
                            onClick={() =>
                                navigate("/orders")
                            }
                        >
                            ← Back to My Orders
                        </button>

                        <h1>
                            Track Your Order
                        </h1>

                        <p>
                            Order #
                            {" "}
                            {order.orderNumber ||
                                order.id}
                        </p>

                    </div>

                    <button
                        className="refresh-button"
                        onClick={fetchOrder}
                    >
                        ↻ Refresh
                    </button>

                </div>

                {/* =================================================
                    STATUS BANNER
                ================================================= */}

                <div className="tracking-banner">

                    <div className="banner-icon">
                        ✓
                    </div>

                    <div>

                        <h2>
                            {delivered
                                ? "Order Delivered"
                                : shipped
                                ? "Order On The Way"
                                : approved
                                ? "Order Approved"
                                : "Order Placed"}
                        </h2>

                        <p>
                            {delivered
                                ? "Your order has been delivered successfully."
                                : shipped
                                ? "Your order is currently on the way."
                                : approved
                                ? "Your order has been approved and is being prepared."
                                : "Your order has been received successfully."}
                        </p>

                    </div>

                </div>

                <div className="tracking-grid">

                    {/* =================================================
                        LEFT SIDE
                    ================================================= */}

                    <main className="tracking-main">

                        {/* ---------------------------------------------
                            ORDER INFORMATION
                        --------------------------------------------- */}

                        <section className="tracking-card">

                            <div className="card-heading">

                                <div className="heading-icon">
                                    📦
                                </div>

                                <div>
                                    <h2>
                                        Order Information
                                    </h2>

                                    <p>
                                        Complete information
                                        about your order
                                    </p>
                                </div>

                            </div>

                            <div className="info-grid">

                                <div className="info-item">
                                    <span>
                                        Order Number
                                    </span>

                                    <strong>
                                        {order.orderNumber ||
                                            `#${order.id}`}
                                    </strong>
                                </div>

                                <div className="info-item">
                                    <span>
                                        Order Date
                                    </span>

                                    <strong>
                                        {formatDate(
                                            order.orderDate
                                        )}
                                    </strong>
                                </div>

                                <div className="info-item">
                                    <span>
                                        Customer
                                    </span>

                                    <strong>
                                        {order.customerName ||
                                            "N/A"}
                                    </strong>
                                </div>

                                <div className="info-item">
                                    <span>
                                        Phone
                                    </span>

                                    <strong>
                                        {order.customerPhone ||
                                            "N/A"}
                                    </strong>
                                </div>

                                <div className="info-item">
                                    <span>
                                        Order Status
                                    </span>

                                    <strong className="status-pill blue">
                                        {order.orderStatus ||
                                            "Pending"}
                                    </strong>
                                </div>

                                <div className="info-item">
                                    <span>
                                        Approval
                                    </span>

                                    <strong
                                        className={
                                            approved
                                                ? "status-pill success"
                                                : "status-pill warning"
                                        }
                                    >
                                        {order.approvalStatus ||
                                            "Pending"}
                                    </strong>
                                </div>

                            </div>

                        </section>

                        {/* ---------------------------------------------
                            ORDER TIMELINE
                        --------------------------------------------- */}

                        <section className="tracking-card">

                            <div className="card-heading">

                                <div className="heading-icon">
                                    🚚
                                </div>

                                <div>
                                    <h2>
                                        Order Tracking
                                    </h2>

                                    <p>
                                        Follow your order
                                        journey
                                    </p>
                                </div>

                            </div>

                            <div className="timeline">

                                {/* ORDER PLACED */}

                                <div
                                    className={
                                        `timeline-item ${
                                            orderPlaced
                                                ? "completed"
                                                : ""
                                        }`
                                    }
                                >

                                    <div className="timeline-marker">
                                        ✓
                                    </div>

                                    <div className="timeline-content">

                                        <h3>
                                            Order Placed
                                        </h3>

                                        <p>
                                            Your order has been
                                            successfully placed.
                                        </p>

                                        <p>
                                            {formatDate(
                                                order.orderDate
                                            )}
                                        </p>

                                    </div>

                                    <div className="timeline-line"></div>

                                </div>

                                {/* PAYMENT */}

                                <div
                                    className={
                                        `timeline-item ${
                                            paymentCompleted
                                                ? "completed"
                                                : "active"
                                        }`
                                    }
                                >

                                    <div className="timeline-marker">
                                        {paymentCompleted
                                            ? "✓"
                                            : "2"}
                                    </div>

                                    <div className="timeline-content">

                                        <h3>
                                            Payment
                                        </h3>

                                        <p>
                                            {paymentCompleted
                                                ? "Payment successfully received."
                                                : "Waiting for payment confirmation."}
                                        </p>

                                    </div>

                                    <div className="timeline-line"></div>

                                </div>

                                {/* APPROVAL */}

                                <div
                                    className={
                                        `timeline-item ${
                                            approved
                                                ? "completed"
                                                : "active"
                                        }`
                                    }
                                >

                                    <div className="timeline-marker">
                                        {approved
                                            ? "✓"
                                            : "3"}
                                    </div>

                                    <div className="timeline-content">

                                        <h3>
                                            Admin Approval
                                        </h3>

                                        <p>
                                            {approved
                                                ? "Your order has been approved by the admin."
                                                : "Your order is waiting for admin approval."}
                                        </p>

                                    </div>

                                    <div className="timeline-line"></div>

                                </div>

                                {/* SHIPPED */}

                                <div
                                    className={
                                        `timeline-item ${
                                            shipped
                                                ? "completed"
                                                : "active"
                                        }`
                                    }
                                >

                                    <div className="timeline-marker">
                                        {shipped
                                            ? "✓"
                                            : "4"}
                                    </div>

                                    <div className="timeline-content">

                                        <h3>
                                            Shipped
                                        </h3>

                                        <p>
                                            {shipped
                                                ? "Your order has been shipped."
                                                : "Your order will be shipped after approval."}
                                        </p>

                                    </div>

                                    <div className="timeline-line"></div>

                                </div>

                                {/* OUT FOR DELIVERY */}

                                <div
                                    className={
                                        `timeline-item ${
                                            delivered
                                                ? "completed"
                                                : "active"
                                        }`
                                    }
                                >

                                    <div className="timeline-marker">
                                        {delivered
                                            ? "✓"
                                            : "5"}
                                    </div>

                                    <div className="timeline-content">

                                        <h3>
                                            Out for Delivery
                                        </h3>

                                        <p>
                                            {delivered
                                                ? "Your order has reached you."
                                                : "Delivery partner information will appear here."}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* ---------------------------------------------
                            DELIVERY LOCATION
                        --------------------------------------------- */}

                        <section className="tracking-card">

                            <div className="card-heading">

                                <div className="heading-icon location">
                                    📍
                                </div>

                                <div>
                                    <h2>
                                        Delivery Location
                                    </h2>

                                    <p>
                                        Current order location
                                    </p>
                                </div>

                            </div>

                            <div className="location-box">

                                <div className="location-pin">
                                    📍
                                </div>

                                <div>

                                    <span>
                                        Current Location
                                    </span>

                                    <strong>
                                        {order.currentLocation ||
                                            order.deliveryLocation ||
                                            "Location will be updated after dispatch"}
                                    </strong>

                                </div>

                            </div>

                        </section>

                    </main>

                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================= */}

                    <aside className="tracking-sidebar">

                        {/* ---------------------------------------------
                            ESTIMATED DELIVERY
                        --------------------------------------------- */}

                        <section className="tracking-card estimate-card">

                            <div className="estimate-icon">
                                🕐
                            </div>

                            <span>
                                Estimated Delivery
                            </span>

                            <h2>
                                {order.estimatedDelivery ||
                                    "Will be updated soon"}
                            </h2>

                            <p>
                                Delivery time may change
                                depending on location.
                            </p>

                        </section>

                        {/* ---------------------------------------------
                            PAYMENT
                        --------------------------------------------- */}

                        <section className="tracking-card">

                            <h3 className="sidebar-title">
                                Payment Details
                            </h3>

                            <div className="payment-row">
                                <span>
                                    Payment Mode
                                </span>

                                <strong>
                                    {order.paymentMode ||
                                        order.paymentMethod ||
                                        "Razorpay"}
                                </strong>
                            </div>

                            <div className="payment-row">
                                <span>
                                    Payment Status
                                </span>

                                <strong
                                    className={
                                        paymentCompleted
                                            ? "status-pill success"
                                            : "status-pill warning"
                                    }
                                >
                                    {order.paymentStatus ||
                                        "Pending"}
                                </strong>
                            </div>

                            {order.razorpayPaymentId && (
                                <div className="payment-row">
                                    <span>
                                        Payment ID
                                    </span>

                                    <strong className="payment-id">
                                        {
                                            order.razorpayPaymentId
                                        }
                                    </strong>
                                </div>
                            )}

                        </section>

                        {/* ---------------------------------------------
                            DELIVERY PARTNER
                        --------------------------------------------- */}

                        <section className="tracking-card">

                            <h3 className="sidebar-title">
                                Delivery Partner
                            </h3>

                            {order.deliveryPartnerName ? (
                                <div className="partner-box">

                                    <div className="partner-avatar">
                                        🚴
                                    </div>

                                    <div className="partner-info">

                                        <span>
                                            Delivery Partner
                                        </span>

                                        <strong>
                                            {
                                                order.deliveryPartnerName
                                            }
                                        </strong>

                                    </div>

                                    {order.deliveryPartnerPhone && (
                                        <a
                                            className="call-button"
                                            href={`tel:${order.deliveryPartnerPhone}`}
                                        >
                                            ☎ Call
                                        </a>
                                    )}

                                </div>
                            ) : (
                                <p>
                                    Delivery partner will be
                                    assigned after your order
                                    is approved.
                                </p>
                            )}

                        </section>

                        {/* ---------------------------------------------
                            DELIVERY ADDRESS
                        --------------------------------------------- */}

                        <section className="tracking-card">

                            <h3 className="sidebar-title">
                                Delivery Address
                            </h3>

                            <div className="address-box">

                                <strong>
                                    {order.customerName ||
                                        "Customer"}
                                </strong>

                                <p>
                                    {order.address ||
                                        "Address not available"}
                                </p>

                                <p>
                                    {order.city || ""}
                                    {order.state
                                        ? `, ${order.state}`
                                        : ""}
                                </p>

                                <p>
                                    {order.pincode
                                        ? `PIN: ${order.pincode}`
                                        : ""}
                                </p>

                                {order.customerPhone && (
                                    <p>
                                        📞{" "}
                                        {
                                            order.customerPhone
                                        }
                                    </p>
                                )}

                            </div>

                        </section>

                        {/* ---------------------------------------------
                            PRICE
                        --------------------------------------------- */}

                        <section className="tracking-card">

                            <h3 className="sidebar-title">
                                Price Details
                            </h3>

                            <div className="price-row">
                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ₹
                                    {formatMoney(
                                        order.subtotal
                                    )}
                                </strong>
                            </div>

                            <div className="price-row">
                                <span>
                                    Shipping
                                </span>

                                <strong>
                                    ₹
                                    {formatMoney(
                                        order.shippingCharge
                                    )}
                                </strong>
                            </div>

                            <div className="price-divider"></div>

                            <div className="price-row total-row">
                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹
                                    {formatMoney(
                                        order.totalAmount ||
                                        order.total
                                    )}
                                </strong>
                            </div>

                        </section>

                        {/* ---------------------------------------------
                            HELP
                        --------------------------------------------- */}

                        <section className="tracking-card help-card">

                            <div className="help-icon">
                                ?
                            </div>

                            <h3>
                                Need Help?
                            </h3>

                            <p>
                                Contact our support team
                                if you have any problem
                                with your order.
                            </p>

                            <button
                                className="support-button"
                                onClick={() =>
                                    window.location.href =
                                        "mailto:support@mishraelectro.com"
                                }
                            >
                                Contact Support
                            </button>

                        </section>

                    </aside>

                </div>

            </div>

        </div>
    );
}