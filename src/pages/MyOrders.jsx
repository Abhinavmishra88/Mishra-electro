import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaShoppingBag,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "../styles/myOrders.css";

function MyOrders() {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =====================================================
  // LOAD CUSTOMER ORDERS
  // =====================================================

  useEffect(() => {

    const loadOrders = async () => {

      if (!user?.email) {

        setLoading(false);

        return;
      }

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `https://mishra-electro.onrender.com/api/orders/customer/${encodeURIComponent(
            user.email
          )}`
        );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Unable to load orders."
          );
        }

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(
          "My orders error:",
          err
        );

        setError(
          err.message ||
          "Unable to load orders."
        );

      } finally {

        setLoading(false);

      }
    };

    loadOrders();

  }, [user?.email]);


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    const value =
      new Date(date);

    if (
      Number.isNaN(
        value.getTime()
      )
    ) {
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


  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {

    const value =
      String(status || "")
        .toUpperCase();

    if (value === "DELIVERED") {
      return <FaCheckCircle />;
    }

    if (value === "SHIPPED") {
      return <FaTruck />;
    }

    if (value === "CANCELLED") {
      return <FaTimesCircle />;
    }

    return <FaClock />;
  };


  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {

    const value =
      String(status || "PENDING")
        .toLowerCase();

    return `order-status order-status-${value}`;
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <main className="my-orders-page">

        <div className="container">

          <div className="my-orders-loading">

            Loading your orders...

          </div>

        </div>

      </main>

    );
  }


  return (

    <main className="my-orders-page">

      <div className="container">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="my-orders-header">

          <div>

            <span>
              YOUR ACCOUNT
            </span>

            <h1>
              My Orders
            </h1>

            <p>
              Track and manage your orders.
            </p>

          </div>


          <div className="my-orders-count">

            <FaBoxOpen />

            <strong>
              {orders.length}
            </strong>

            <span>
              Orders
            </span>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="my-orders-error">

            {error}

          </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!error &&
          orders.length === 0 && (

            <div className="my-orders-empty">

              <FaShoppingBag />

              <h2>
                No Orders Yet
              </h2>

              <p>
                You haven't placed any orders yet.
              </p>

              <Link
                to="/products"
                className="my-orders-shop-btn"
              >

                <FaShoppingBag />

                Start Shopping

              </Link>

            </div>

          )}


        {/* =================================================
            ORDER LIST
        ================================================= */}

        {orders.length > 0 && (

          <div className="my-orders-list">

            {orders.map((order) => (

              <article
                className="my-order-card"
                key={order.id}
              >


                {/* ORDER HEADER */}

                <div className="my-order-header">

                  <div>

                    <span>
                      ORDER NUMBER
                    </span>

                    <strong>
                      {order.orderNumber}
                    </strong>

                  </div>


                  <div>

                    <span>
                      ORDER DATE
                    </span>

                    <strong>
                      {formatDate(
                        order.orderDate
                      )}
                    </strong>

                  </div>

                </div>


                {/* ORDER BODY */}

                <div className="my-order-body">


                  {/* STATUS */}

                  <div className="my-order-info">

                    <span>
                      Order Status
                    </span>

                    <div
                      className={
                        getStatusClass(
                          order.orderStatus
                        )
                      }
                    >

                      {getStatusIcon(
                        order.orderStatus
                      )}

                      {order.orderStatus ||
                        "PENDING"}

                    </div>

                  </div>


                  {/* PAYMENT */}

                  <div className="my-order-info">

                    <span>
                      Payment
                    </span>

                    <strong>

                      {order.paymentMethod ||
                        "N/A"}

                      {" - "}

                      {order.paymentStatus ||
                        "PENDING"}

                    </strong>

                  </div>


                  {/* TOTAL */}

                  <div className="my-order-info">

                    <span>
                      Total Amount
                    </span>

                    <strong className="my-order-total">

                      ₹
                      {Number(
                        order.total || 0
                      ).toFixed(2)}

                    </strong>

                  </div>

                </div>


                {/* ADDRESS */}

                <div className="my-order-address">

                  <span>
                    DELIVERY ADDRESS
                  </span>

                  <p>

                    {order.address || ""}

                    {order.city
                      ? `, ${order.city}`
                      : ""}

                    {order.state
                      ? `, ${order.state}`
                      : ""}

                    {order.pincode
                      ? ` - ${order.pincode}`
                      : ""}

                  </p>

                </div>


                {/* FOOTER */}

                <div className="my-order-footer">

                  <span>
                    Thank you for shopping with
                    Mishra Electro.
                  </span>

                  <Link
                    to={`/order-success/${order.id}`}
                    state={{
                      order,
                    }}
                  >
                    View Order
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>

  );
}

export default MyOrders;