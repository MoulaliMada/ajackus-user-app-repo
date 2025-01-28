import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './index.css';

function UserForm() {
  // State to manage form data (id, name, email) ,error, handle email validation error msg.
  const [formData, setFormData] = useState({ id: 1, name: "", email: "" });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  // React Router hooks for navigation and retrieving URL parameters
  const navigate = useNavigate();
  const { id } = useParams();
  
  // useEffect to handle form initialization or fetch data if editing a user
  useEffect(() => {
    // If `id` exists, fetch user data
    if (id) {
      const fetchUser = async () => {
        try {
          if(id <11){   // Fetch user data from the API if the ID is less than 11 because there are only 10 user details in Api. remaining if want to add, they will saved in localstorage 
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );} 
          const usersData = localStorage.getItem("users");  // Get users from localStorage
          const parsedUserData = JSON.parse(usersData).find(
            (user) => user.id === Number(id)
          );
          if (parsedUserData) {
            setFormData(parsedUserData); // If user data is found in localStorage, set it to the form
          } else {
            // Throw an error if the user with the given ID doesn't exist
            throw new Error(`User with ID ${id} not found in the list.`);
          }
        } catch (err) {
          setError("Failed to fetch user data");
        }
      };
      fetchUser();
    } else {
      // If adding a new user, set the ID as the next highest ID from localStorage
      const highestId = JSON.parse(localStorage.getItem("users")).reduce(
        (maxId, user) => {
          return user.id > maxId ? user.id : maxId;
        },
        0
      );
      setFormData({ ...formData, id: highestId + 1 });
    }
  }, [id]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };
 
  // Handler for input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {  // Validate email format when the email field is updated
      if (!validateEmail(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }
  };
  // Function to add or update user data in localStorage
  const addDataIntoLocalStorage = () => {
    const usersData = JSON.parse(localStorage.getItem("users"));
    if (id) {  // Update the user if `id` exi
      const parsedData = usersData.map((user) =>
        user.id !== Number(id) ? user : formData
      );
      localStorage.setItem("users", JSON.stringify(parsedData));
      
    } else {  // Add a new user if `id` does not exist
      localStorage.setItem("users", JSON.stringify([...usersData, formData]));
    }
  };
  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id<11) {  // Update the user if the ID is less than 11 (exists in the API)
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          formData
        );
        addDataIntoLocalStorage();
        console.log("hello")
      } else { // Add a new user if the ID is greater than or equal to 11
        await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          formData
        );
        addDataIntoLocalStorage();
      }
      navigate("/");  // Redirect to the home page after submission
    } catch (err) { 
      setError("Failed to submit user data");
    }
  };

  return (
    <div className="user-form">
      <h1>{id ? "Edit User" : "Add User"}</h1> {/* Dynamic heading based on whether the form is for editing or adding a user */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>  {/* Name field */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>  {/* Email field */}
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
