import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OrderTracking.css";

const API_BASE_URL = "http://localhost:8080";

function OrderTracking() {
    const { orderNumber } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD ORDER
    // =====================================================

    useEffect(() => {
        if (!orderNumber) {
            setError("Order number is missing.");
            setLoading(false);
            return;
        }

        loadOrder();
    }, [orderNumber]);

    const loadOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/orders/number/${encodeURIComponent(
                    orderNumber
                )}`
            );

            if (!response.ok) {
                throw new Error("Order not found.");
            }

            const data = await response.json();

            setOrder(data);

        } catch (err) {
            console.error("Order loading error:", err);

            setError(
                err.message ||
                "Unable to load order."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // REFRESH ORDER
    // =====================================================

    const refreshOrder = () => {
        loadOrder();
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Not available";
        }

        try {
            return new Date(dateValue).toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );
        } catch {
            return dateValue;
        }
    };

    // =====================================================
    // MONEY
    // =====================================================

    const formatMoney = (value) => {
        return `₹${Number(value || 0).toFixed(2)}`;
    };

    // =====================================================
    // STATUS HELPERS
    // =====================================================

    const getOrderStatusClass = (status) => {
        const value =
            String(status || "")
                .toUpperCase();

        if (
            value === "DELIVERED" ||
            value === "COMPLETED"
        ) {
            return "success";
        }

        if (
            value === "CANCELLED" ||
            value === "REJECTED"
        ) {
            return "danger";
        }

        if (
            value === "SHIPPED" ||
            value === "OUT_FOR_DELIVERY"
        ) {
            return "blue";
        }

        return "warning";
    };

    // =====================================================
    // TRACKING STEP
    // =====================================================

    const getTrackingSteps = () => {

        const approval =
            String(
                order?.approvalStatus || ""
            ).toUpperCase();

        const delivery =
            String(
                order?.deliveryStatus || ""
            ).toUpperCase();

        const orderStatus =
            String(
                order?.orderStatus || ""
            ).toUpperCase();

        return [
            {
                title: "Order Placed",
                description:
                    "Your order has been placed successfully.",
                active: true,
                completed: true,
                icon: "✓"
            },
            {
                title: "Admin Approval",
                description:
                    approval === "APPROVED"
                        ? "Your order has been approved."
                        : approval === "REJECTED"
                            ? "Your order was rejected."
                            : "Waiting for admin approval.",
                active:
                    approval === "PENDING" ||
                    approval === "APPROVED" ||
                    approval === "REJECTED",
                completed:
                    approval === "APPROVED",
                rejected:
                    approval === "REJECTED",
                icon:
                    approval === "APPROVED"
                        ? "✓"
                        : approval === "REJECTED"
                            ? "!"
                            : "2"
            },
            {
                title: "Order Processing",
                description:
                    delivery === "PROCESSING"
                        ? "Your order is being prepared."
                        : "Order preparation will start after approval.",
                active:
                    approval === "APPROVED" ||
                    delivery === "PROCESSING" ||
                    delivery === "SHIPPED" ||
                    delivery === "OUT_FOR_DELIVERY" ||
                    delivery === "DELIVERED",
                completed:
                    delivery === "SHIPPED" ||
                    delivery === "OUT_FOR_DELIVERY" ||
                    delivery === "DELIVERED",
                icon: "3"
            },
            {
                title: "Shipped",
                description:
                    delivery === "SHIPPED"
                        ? "Your order is on the way."
                        : "Waiting for shipment.",
                active:
                    delivery === "SHIPPED" ||
                    delivery === "OUT_FOR_DELIVERY" ||
                    delivery === "DELIVERED",
                completed:
                    delivery === "OUT_FOR_DELIVERY" ||
                    delivery === "DELIVERED",
                icon: "4"
            },
            {
                title: "Out for Delivery",
                description:
                    delivery === "OUT_FOR_DELIVERY"
                        ? "Your delivery partner is on the way."
                        : "Your order will be delivered soon.",
                active:
                    delivery === "OUT_FOR_DELIVERY" ||
                    delivery === "DELIVERED",
                completed:
                    delivery === "DELIVERED",
                icon: "5"
            },
            {
                title: "Delivered",
                description:
                    delivery === "DELIVERED" ||
                    orderStatus === "DELIVERED"
                        ? "Order delivered successfully."
                        : "Not delivered yet.",
                active:
                    delivery === "DELIVERED" ||
                    orderStatus === "DELIVERED",
                completed:
                    delivery === "DELIVERED" ||
                    orderStatus === "DELIVERED",
                icon: "✓"
            }
        ];
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="tracking-page">
                <div className="tracking-loading">
                    <div className="tracking-spinner"></div>

                    <h2>Loading your order...</h2>

                    <p>
                        Please wait while we fetch
                        your order details.
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
            <div className="tracking-page">

                <div className="tracking-error">

                    <div className="error-icon">
                        !
                    </div>

                    <h2>
                        Order Not Found
                    </h2>

                    <p>
                        {error ||
                            "We could not find this order."}
                    </p>

                    <div className="error-buttons">

                        <button
                            className="tracking-btn secondary"
                            onClick={() =>
                                navigate("/orders")
                            }
                        >
                            ← My Orders
                        </button>

                        <button
                            className="tracking-btn primary"
                            onClick={refreshOrder}
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </div>
        );
    }

    const trackingSteps =
        getTrackingSteps();

    const paymentStatus =
        String(
            order.paymentStatus || "PENDING"
        ).toUpperCase();

    const approvalStatus =
        String(
            order.approvalStatus || "PENDING"
        ).toUpperCase();

    const deliveryStatus =
        String(
            order.deliveryStatus || "PENDING"
        ).toUpperCase();

    // =====================================================
    // MAIN UI
    // =====================================================

    return (
        <div className="tracking-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="tracking-container">

                <div className="tracking-header">

                    <div>

                        <button
                            className="back-button"
                            onClick={() =>
                                navigate("/orders")
                            }
                        >
                            ← Back to Orders
                        </button>

                        <h1>
                            Track Your Order
                        </h1>

                        <p>
                            Order #{order.orderNumber}
                        </p>

                    </div>

                    <button
                        className="refresh-button"
                        onClick={refreshOrder}
                    >
                        ↻ Refresh
                    </button>

                </div>

                {/* =================================================
                    SUCCESS BANNER
                ================================================= */}

                <div className="tracking-banner">

                    <div className="banner-icon">
                        ✓
                    </div>

                    <div>

                        <h2>
                            {deliveryStatus ===
                            "DELIVERED"
                                ? "Order Delivered"
                                : "Your order is being processed"}
                        </h2>

                        <p>
                            {deliveryStatus ===
                            "DELIVERED"
                                ? "Thank you for shopping with Mishra Electro."
                                : "We are keeping you updated at every step."}
                        </p>

                    </div>

                </div>

                {/* =================================================
                    ORDER SUMMARY
                ================================================= */}

                <div className="tracking-grid">

                    {/* LEFT */}
                    <div className="tracking-main">

                        {/* ORDER INFORMATION */}

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
                                        Complete order details
                                    </p>

                                </div>

                            </div>

                            <div className="info-grid">

                                <div className="info-item">
                                    <span>
                                        Order Number
                                    </span>

                                    <strong>
                                        {order.orderNumber}
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
                                        Order Status
                                    </span>

                                    <strong
                                        className={`status-pill ${getOrderStatusClass(
                                            order.orderStatus
                                        )}`}
                                    >
                                        {order.orderStatus ||
                                            "PLACED"}
                                    </strong>
                                </div>

                                <div className="info-item">
                                    <span>
                                        Approval
                                    </span>

                                    <strong
                                        className={`status-pill ${getOrderStatusClass(
                                            approvalStatus
                                        )}`}
                                    >
                                        {approvalStatus}
                                    </strong>
                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            TRACKING TIMELINE
                        ================================================= */}

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
                                        Follow your order journey
                                    </p>

                                </div>

                            </div>

                            <div className="timeline">

                                {trackingSteps.map(
                                    (step, index) => (

                                        <div
                                            className={`timeline-item ${
                                                step.active
                                                    ? "active"
                                                    : ""
                                            } ${
                                                step.completed
                                                    ? "completed"
                                                    : ""
                                            } ${
                                                step.rejected
                                                    ? "rejected"
                                                    : ""
                                            }`}
                                            key={index}
                                        >

                                            <div className="timeline-marker">
                                                {step.icon}
                                            </div>

                                            <div className="timeline-content">

                                                <h3>
                                                    {step.title}
                                                </h3>

                                                <p>
                                                    {
                                                        step.description
                                                    }
                                                </p>

                                            </div>

                                            {index <
                                                trackingSteps.length -
                                                    1 && (
                                                <div className="timeline-line"></div>
                                            )}

                                        </div>

                                    )
                                )}

                            </div>

                        </section>

                        {/* =================================================
                            CURRENT LOCATION
                        ================================================= */}

                        <section className="tracking-card">

                            <div className="card-heading">

                                <div className="heading-icon location">
                                    📍
                                </div>

                                <div>

                                    <h2>
                                        Current Delivery Location
                                    </h2>

                                    <p>
                                        Latest available delivery update
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
                                            "Location will be updated after shipment"}
                                    </strong>

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            DELIVERY PARTNER
                        ================================================= */}

                        {(order.deliveryPartnerName ||
                            order.deliveryPartnerPhone) && (

                            <section className="tracking-card">

                                <div className="card-heading">

                                    <div className="heading-icon">
                                        🛵
                                    </div>

                                    <div>

                                        <h2>
                                            Delivery Partner
                                        </h2>

                                        <p>
                                            Your delivery partner details
                                        </p>

                                    </div>

                                </div>

                                <div className="partner-box">

                                    <div className="partner-avatar">
                                        👤
                                    </div>

                                    <div className="partner-info">

                                        <span>
                                            Delivery Partner
                                        </span>

                                        <strong>
                                            {order.deliveryPartnerName ||
                                                "Not assigned yet"}
                                        </strong>

                                    </div>

                                    {order.deliveryPartnerPhone && (

                                        <a
                                            className="call-button"
                                            href={`tel:${order.deliveryPartnerPhone}`}
                                        >
                                            📞 Call
                                        </a>

                                    )}

                                </div>

                            </section>

                        )}

                        {/* =================================================
                            DELIVERY ADDRESS
                        ================================================= */}

                        <section className="tracking-card">

                            <div className="card-heading">

                                <div className="heading-icon">
                                    🏠
                                </div>

                                <div>

                                    <h2>
                                        Delivery Address
                                    </h2>

                                    <p>
                                        Your order will be delivered here
                                    </p>

                                </div>

                            </div>

                            <div className="address-box">

                                <strong>
                                    {order.customerName}
                                </strong>

                                <p>
                                    {order.address}
                                </p>

                                <p>
                                    {order.city},{" "}
                                    {order.state}
                                </p>

                                <p>
                                    PIN: {order.pincode}
                                </p>

                                <p>
                                    📞 {order.customerPhone}
                                </p>

                            </div>

                        </section>

                    </div>

                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================= */}

                    <aside className="tracking-sidebar">

                        {/* ESTIMATED DELIVERY */}

                        <section className="tracking-card estimate-card">

                            <div className="estimate-icon">
                                ⏱️
                            </div>

                            <span>
                                Estimated Delivery
                            </span>

                            <h2>
                                {order.estimatedDelivery ||
                                    "To be updated"}
                            </h2>

                            {order.estimatedDeliveryDate && (

                                <p>
                                    📅{" "}
                                    {
                                        order.estimatedDeliveryDate
                                    }
                                </p>

                            )}

                            {order.estimatedDeliveryTime && (

                                <p>
                                    🕐{" "}
                                    {
                                        order.estimatedDeliveryTime
                                    }
                                </p>

                            )}

                        </section>

                        {/* PAYMENT */}

                        <section className="tracking-card">

                            <div className="sidebar-title">
                                💳 Payment Details
                            </div>

                            <div className="payment-row">

                                <span>
                                    Method
                                </span>

                                <strong>
                                    {order.paymentMethod ||
                                        "Not available"}
                                </strong>

                            </div>

                            <div className="payment-row">

                                <span>
                                    Status
                                </span>

                                <strong
                                    className={`status-pill ${getOrderStatusClass(
                                        paymentStatus
                                    )}`}
                                >
                                    {paymentStatus}
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

                        {/* PRICE */}

                        <section className="tracking-card">

                            <div className="sidebar-title">
                                🧾 Price Details
                            </div>

                            <div className="price-row">

                                <span>
                                    Subtotal
                                </span>

                                <strong>
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
                                    {formatMoney(
                                        order.total
                                    )}
                                </strong>

                            </div>

                        </section>

                        {/* HELP */}

                        <section className="tracking-card help-card">

                            <div className="help-icon">
                                💬
                            </div>

                            <h3>
                                Need Help?
                            </h3>

                            <p>
                                If you have any problem
                                with your order, contact
                                Mishra Electro support.
                            </p>

                            <button
                                className="support-button"
                                onClick={() =>
                                    navigate("/contact")
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

export default OrderTracking;