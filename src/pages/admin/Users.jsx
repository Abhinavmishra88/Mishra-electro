import { useState } from "react";

import Sidebar from "../../components/layouts/Sidebar";
import Topbar from "../../components/admin/Topbar";

import {
  FaSearch,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import "../../styles/admin.css";

function Users() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Abhinav Mishra",
      email: "abhi@gmail.com",
      phone: "9876543210",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543211",
      role: "Customer",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@gmail.com",
      phone: "9876543212",
      role: "Customer",
      status: "Blocked",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const changeRole = (id, role) => {

    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, role }
          : user
      )
    );

  };

  const toggleStatus = (id) => {

    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );

  };

  const deleteUser = (id) => {

    if (!window.confirm("Delete this user?")) return;

    setUsers(
      users.filter((user) => user.id !== id)
    );

  };

  return (

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">

        <Topbar title="Manage Users" />

        <div className="admin-box">

          <div className="search-box-admin mb-4">

            <FaSearch />

            <input
              type="text"
              placeholder="Search User..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Role</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.phone}</td>

                    <td>

                      <select
                        className="form-select"
                        value={user.role}
                        onChange={(e) =>
                          changeRole(
                            user.id,
                            e.target.value
                          )
                        }
                      >

                        <option>Admin</option>

                        <option>Customer</option>

                      </select>

                    </td>

                    <td>

                      <span
                        className={`badge ${
                          user.status === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >

                        {user.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          toggleStatus(user.id)
                        }
                      >

                        <FaEdit />

                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteUser(user.id)
                        }
                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Users;