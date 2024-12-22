import React, { useState } from 'react';
import '../styles/Login.css';
    import {useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate=useNavigate()
  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (can be extended with proper validation)
    if (!formData.email || !formData.password) {
      setError('Please fill out both fields.');
      return;
    }

    try {
      // Make a POST request to the login endpoint
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 200) {
        // Successful login
        console.log('Login successful:', result);
        navigate('/home')
        // You can store user data or redirect to another page
      } else {
        // Show error message if login fails
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred during login.');
    }

    // Reset form
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <h2>Login to Digital Wallet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
