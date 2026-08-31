import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaUsers,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";

import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { orders } = useOrder();
  const { user } = useAuth();

  // Calculate statistics
  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter(
      (order) => order.status !== "Cancelled"
    )
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Pending"
  ).length;

  // Get unique customers
  const uniqueCustomers = new Set(
    orders
      .map(
        (order) =>
          order.customer?.email
      )
      .filter(Boolean)
  ).size;

  // Recent orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.date || 0) -
        new Date(a.date || 0)
    )
    .slice(0, 5);

  return (
    <div className="admin-box">

      {/* Header */}
      <div className="mb-4">

        <h4 className="fw-bold mb-1">
          Dashboard
        </h4>

        <p className="text-muted mb-0">
          Welcome back,{" "}
          <strong>
            {user?.name || "Admin"}
          </strong>
        </p>

      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="row g-4 mb-4">

        {/* Orders */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <p className="text-muted mb-1">
                    Total Orders
                  </p>

                  <h3 className="fw-bold mb-0">
                    {totalOrders}
                  </h3>

                </div>

                <div className="text-danger fs-2">
                  <FaShoppingCart />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Revenue */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <p className="text-muted mb-1">
                    Revenue
                  </p>

                  <h3 className="fw-bold mb-0">
                    ₹{totalRevenue}
                  </h3>

                </div>

                <div className="text-success fs-2">
                  <FaRupeeSign />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Customers */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <p className="text-muted mb-1">
                    Customers
                  </p>

                  <h3 className="fw-bold mb-0">
                    {uniqueCustomers}
                  </h3>

                </div>

                <div className="text-primary fs-2">
                  <FaUsers />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Pending */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <p className="text-muted mb-1">
                    Pending Orders
                  </p>

                  <h3 className="fw-bold mb-0">
                    {pendingOrders}
                  </h3>

                </div>

                <div className="text-warning fs-2">
                  <FaBoxOpen />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          RECENT ORDERS
      ========================== */}

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white py-3">

          <div className="d-flex justify-content-between align-items-center">

            <h5 className="fw-bold mb-0">
              Recent Orders
            </h5>

            <Link
              to="/admin/orders"
              className="text-decoration-none"
            >
              View All
              <FaArrowRight
                className="ms-2"
                size={12}
              />
            </Link>

          </div>

        </div>

        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {recentOrders.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-5"
                    >

                      <FaBoxOpen
                        size={35}
                        className="text-muted mb-3"
                      />

                      <p className="text-muted mb-0">
                        No orders yet.
                      </p>

                    </td>

                  </tr>

                ) : (

                  recentOrders.map((order) => (

                    <tr key={order.id}>

                      <td>
                        <strong>
                          #{order.id}
                        </strong>
                      </td>

                      <td>
                        {order.customer?.name ||
                          "Customer"}
                      </td>

                      <td>
                        {order.date
                          ? new Date(
                              order.date
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <strong>
                          ₹{order.total || 0}
                        </strong>
                      </td>

                      <td>

                        <span
                          className={
                            order.status ===
                            "Delivered"
                              ? "badge bg-success"
                              : order.status ===
                                "Cancelled"
                              ? "badge bg-danger"
                              : order.status ===
                                "Processing"
                              ? "badge bg-info text-dark"
                              : "badge bg-warning text-dark"
                          }
                        >
                          {order.status ||
                            "Pending"}
                        </span>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;