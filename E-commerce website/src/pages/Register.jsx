import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Assuming you have a CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { confirmPassword, ...data } = formData;

    if (formData.password !== confirmPassword) {
      setResponse("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/user/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        const result = await response.json();
        setResponse(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setResponse('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-column">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mobile_number"
                placeholder="Mobile Number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-column">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
          {response && <div className="error">{response}</div>}
        </form>
        <p className="signup-text">
        Do you have an account? <span className="Login-link" onClick={() => navigate("/login")}>Login</span>
      </p>
      </div>
    </div>
  );
};

export default Register;