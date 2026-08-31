import { useState } from "react";
import {
  FaSearch,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import "../../styles/admin.css";

function Customers() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");

  /*
    Currently AuthContext provides the
    logged-in user only.

    Later, MongoDB can provide all customers.
  */
  const customers = user ? [user] : [];

  const filteredCustomers = customers.filter(
    (customer) => {
      const name =
        customer?.name?.toLowerCase() || "";

      const email =
        customer?.email?.toLowerCase() || "";

      const searchText =
        search.toLowerCase();

      return (
        name.includes(searchText) ||
        email.includes(searchText)
      );
    }
  );

  return (
    <div className="admin-box">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <div>
          <h4 className="fw-bold mb-1">
            Customers
          </h4>

          <p className="text-muted mb-0">
            Total Customers:{" "}
            {customers.length}
          </p>
        </div>

        {/* Search */}
        <div className="search-box-admin">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Customers Table */}
      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-5"
                >

                  <FaUser
                    size={40}
                    className="text-muted mb-3"
                  />

                  <p className="mb-0">
                    No customers found.
                  </p>

                </td>

              </tr>

            ) : (

              filteredCustomers.map(
                (customer, index) => (

                  <tr
                    key={
                      customer.id ||
                      customer.email ||
                      index
                    }
                  >

                    {/* Customer */}
                    <td>

                      <div className="d-flex align-items-center gap-3">

                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{
                            width: "45px",
                            height: "45px",
                          }}
                        >
                          <FaUser />
                        </div>

                        <strong>
                          {customer.name ||
                            "Customer"}
                        </strong>

                      </div>

                    </td>

                    {/* Email */}
                    <td>
                      {customer.email || "-"}
                    </td>

                    {/* Role */}
                    <td>

                      <span className="badge bg-secondary">
                        {customer.role ||
                          "Customer"}
                      </span>

                    </td>

                    {/* Status */}
                    <td>

                      <span className="badge bg-success">
                        Active
                      </span>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Customers;