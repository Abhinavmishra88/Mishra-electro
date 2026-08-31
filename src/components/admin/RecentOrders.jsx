function RecentOrders() {
  const orders = [
    {
      id: "#1001",
      customer: "Rahul Sharma",
      total: "₹2,450",
      status: "Delivered",
    },
    {
      id: "#1002",
      customer: "Priya Verma",
      total: "₹1,850",
      status: "Pending",
    },
    {
      id: "#1003",
      customer: "Amit Singh",
      total: "₹4,600",
      status: "Processing",
    },
  ];

  return (
    <div className="admin-card">

      <h4>Recent Orders</h4>

      <table className="table">

        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentOrders;