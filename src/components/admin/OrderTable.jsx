import { useOrders } from "../../context/OrderContext";

function OrderTable({ search, onView }) {
  const { orders, updateStatus } = useOrders();

  const filteredOrders = orders.filter((order) => {
    return (
      order.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(order.id).includes(search)
    );
  });

  return (
    <div className="admin-card">
      <table className="table table-hover align-middle">

        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr key={order.id}>

                <td>#{order.id}</td>

                <td>{order.customer}</td>

                <td>₹{order.total}</td>

                <td>
                  <span
                    className={`badge ${
                      order.payment === "Paid"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>
                </td>

                <td>{order.date}</td>

                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onView(order)}
                  >
                    View
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}

export default OrderTable;