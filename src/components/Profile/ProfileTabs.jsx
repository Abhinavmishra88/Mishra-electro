import { useState } from "react";
import { FaBox, FaUser, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("orders");

  const { user, logout } = useAuth();
  const { orders } = useOrder();

  // Show orders belonging to the logged-in user
  const userOrders = orders.filter(
    (order) =>
      order.customer?.email === user?.email
  );

  return (
    <div className="profile-tabs">

      {/* Tabs */}
      <div className="profile-tab-buttons">

        <button
          type="button"
          className={
            activeTab === "orders"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("orders")
          }
        >
          <FaBox />
          My Orders
        </button>

        <button
          type="button"
          className={
            activeTab === "account"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("account")
          }
        >
          <FaUser />
          Account
        </button>

      </div>

      {/* =========================
          ORDERS
      ========================== */}

      {activeTab === "orders" && (

        <div className="profile-tab-content">

          <h3>
            My Orders
          </h3>

          {userOrders.length === 0 ? (

            <div className="empty-orders">

              <FaBox size={45} />

              <h5>
                No Orders Yet
              </h5>

              <p>
                You haven't placed any orders yet.
              </p>

            </div>

          ) : (

            <div className="profile-orders">

              {userOrders.map((order) => (

                <div
                  className="profile-order-card"
                  key={order.id}
                >

                  <div className="order-header">

                    <div>
                      <strong>
                        Order #{order.id}
                      </strong>

                      <small>
                        {order.date
                          ? new Date(
                              order.date
                            ).toLocaleDateString()
                          : ""}
                      </small>
                    </div>

                    <span
                      className={`order-status ${(
                        order.status ||
                        "Pending"
                      ).toLowerCase()}`}
                    >
                      {order.status ||
                        "Pending"}
                    </span>

                  </div>

                  <div className="order-products">

                    {order.items?.map(
                      (item) => (

                        <div
                          className="order-product"
                          key={item.id}
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <div>
                            <strong>
                              {item.name}
                            </strong>

                            <small>
                              Quantity:{" "}
                              {item.quantity || 1}
                            </small>
                          </div>

                          <strong>
                            ₹
                            {Number(item.price) *
                              (item.quantity ||
                                1)}
                          </strong>

                        </div>

                      )
                    )}

                  </div>

                  <div className="order-footer">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{order.total}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      )}

      {/* =========================
          ACCOUNT
      ========================== */}

      {activeTab === "account" && (

        <div className="profile-tab-content">

          <h3>
            Account Information
          </h3>

          <div className="account-details">

            <div className="account-row">

              <span>
                Name
              </span>

              <strong>
                {user?.name || "Not available"}
              </strong>

            </div>

            <div className="account-row">

              <span>
                Email
              </span>

              <strong>
                {user?.email || "Not available"}
              </strong>

            </div>

            <div className="account-row">

              <span>
                Account Type
              </span>

              <strong>
                {user?.role === "admin"
                  ? "Administrator"
                  : "Customer"}
              </strong>

            </div>

          </div>

          {/* Logout */}
          <button
            type="button"
            className="btn btn-danger mt-4"
            onClick={logout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>

        </div>

      )}

    </div>
  );
}

export default ProfileTabs;