import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please log in again.");
        setLoading(false);
      });
  }, []);

  // Verify a user
  const handleVerify = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in.");
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/users/${id}/verify`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setUsers(users.map((user) =>
          user._id === id ? { ...user, isVerified: true } : user
        ));
      })
      .catch((error) => {
        console.error("Error verifying user:", error);
        setError("Failed to verify user.");
      });
  };

  // Delete a user
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setError("Failed to delete user.");
      });
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isVerified ? "Verified" : "Not Verified"}</td>
                <td>
                  {!user.isVerified && (
                    <button
                      onClick={() => handleVerify(user._id)}
                      style={{ marginRight: "10px" }}
                    >
                      Verify
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={{ backgroundColor: "#dc3545", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;