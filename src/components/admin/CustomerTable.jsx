import { useCustomers } from "../../context/CustomerContext";

function CustomerTable({ search }) {
  const { customers, toggleStatus } =
    useCustomers();

  const filtered = customers.filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-card">

      <table className="table table-hover">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Spent</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((customer) => (
            <tr key={customer.id}>

              <td>{customer.name}</td>

              <td>{customer.email}</td>

              <td>{customer.orders}</td>

              <td>₹{customer.spent}</td>

              <td>
                <span
                  className={`badge ${
                    customer.status === "Active"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {customer.status}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() =>
                    toggleStatus(customer.id)
                  }
                >
                  {customer.status === "Active"
                    ? "Block"
                    : "Unblock"}
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CustomerTable;