import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          setFormData(response.data);
        } catch (err) {
          setError('Failed to fetch user data');
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        console.log(formData);
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData);
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      }
      navigate('/');
    } catch (err) {
      setError('Failed to submit user data');
    }
  };

  return (
    <div className="user-form">
      <h1>{id ? 'Edit User' : 'Add User'}</h1>
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
        <button type="submit" className="button submit-button">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default UserForm;