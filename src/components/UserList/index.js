import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './index.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [localUsers, setLocalUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        if (localStorage.getItem("users")) {
          const parsedData = JSON.parse(localStorage.getItem("users"));
          setLocalUsers(parsedData);
        } else {
          localStorage.setItem("users", JSON.stringify(response.data));
        }
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const usersData = localUsers.filter((user) => user.id !== id);
      setUsers(usersData);
      setLocalUsers(usersData);
      localStorage.setItem("users", JSON.stringify(usersData));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="user-list">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}
      <Link to="/add" className="button add-button">
        Add User
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localUsers.map((user) => (
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
    </div>
  );
}

export default UserList;
