import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]); // State to store users from localStorage
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Show 5 users per page ,// Number of users to display per page
  const navigate = useNavigate();
  // Fetch users from API or localStorage on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        if (localStorage.getItem("users")) {
          // Check if "users" exists in localStorage
          const parsedData = JSON.parse(localStorage.getItem("users"));
          setLocalUsers(parsedData); // If it exists, parse and set to localUsers state
        } else {
          // If not, initialize localStorage with API data
          localStorage.setItem("users", JSON.stringify(response.data));
        }
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  // Calculate the indices of users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = localUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change the page when a page number is clicked
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const usersData = localUsers.filter((user) => user.id !== id);
      setUsers(usersData);
      setLocalUsers(usersData); // Update local state and localStorage by removing the deleted user
      localStorage.setItem("users", JSON.stringify(usersData));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="user-list">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>} {/* Display any errors */}
      <Link to="/add" className="button add-button">
        Add User {/* Link to navigate to the Add User form */}
      </Link>
      <table>
        {" "}
        {/* Table to display user details */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {/* Iterate through the users to display rows */}
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => navigate(`/edit/${user.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(localUsers.length / usersPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default UserList;
