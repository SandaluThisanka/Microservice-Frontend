import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const res = await fetch("http://localhost:8082/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Login successful!");
        navigate("/"); // Redirect to home page
      } else {
        setResponse(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setResponse("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />
        <div className="remember-forgot">
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <span className="forgot-link" onClick={() => navigate("/forgot-password")}>
            Forgot password
          </span>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {response && <div className="error-message">{response}</div>}
      <p className="signup-text">
        Don't have an account? <span className="signup-link" onClick={() => navigate("/register")}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
