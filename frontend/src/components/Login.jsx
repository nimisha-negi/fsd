import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", { email, password });
      if (res.data.success) {
        onLoginSuccess(email);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://img.icons8.com/?size=100&id=36987&format=png&color=000000"
          alt="Google logo"
          className="google-logo"
        />
        <h2 className="signin-title">Sign in</h2>
        <p className="signin-subtitle">to continue to Gmail</p>

        <input
          type="text"
          name="email"
          placeholder="Email or phone"
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <button onClick={handleLogin} className="login-button">Login</button>

        <p className="signup-link">
        <Link to="/signup">Create account</Link>

        </p>
      </div>

      <footer className="login-footer">
        <span>English (United Kingdom)▼</span>
        <div className="link">
        <Link to="/">Help</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Terms</Link>
        </div>
      </footer>
    </div>
  );
};

export default Login;
