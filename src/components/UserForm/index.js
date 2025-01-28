import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './index.css';

function UserForm() {
  const [formData, setFormData] = useState({ id: 1, name: "", email: "" });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          if(id <11){
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );}
          const usersData = localStorage.getItem("users");
          const parsedUserData = JSON.parse(usersData).find(
            (user) => user.id === Number(id)
          );
          if (parsedUserData) {
            setFormData(parsedUserData);
          } else {
            throw new Error(`User with ID ${id} not found in the list.`);
          }
        } catch (err) {
          setError("Failed to fetch user data");
        }
      };
      fetchUser();
    } else {
      const highestId = JSON.parse(localStorage.getItem("users")).reduce(
        (maxId, user) => {
          return user.id > maxId ? user.id : maxId;
        },
        0
      );
      setFormData({ ...formData, id: highestId + 1 });
    }
  }, [id]);

  //const handleChange = (e) => {
//setFormData({ ...formData, [e.target.name]: e.target.value });
  //};

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }
  };

  const addDataIntoLocalStorage = () => {
    const usersData = JSON.parse(localStorage.getItem("users"));
    if (id) {
      const parsedData = usersData.map((user) =>
        user.id !== Number(id) ? user : formData
      );
      localStorage.setItem("users", JSON.stringify(parsedData));
      
    } else {
      localStorage.setItem("users", JSON.stringify([...usersData, formData]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id<11) {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          formData
        );
        addDataIntoLocalStorage();
        console.log("hello")
      } else {
        await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          formData
        );
        addDataIntoLocalStorage();
      }
      navigate("/");
    } catch (err) {
      setError("Failed to submit user data");
    }
  };

  return (
    <div className="user-form">
      <h1>{id ? "Edit User" : "Add User"}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {emailError && <p className="error">{emailError}</p>}
        <button type="submit" className="button submit-button">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
