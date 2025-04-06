import React, { Component } from "react";
import axios from "axios";
import "../style/Mail.css";

class Signup extends Component {
  state = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleSignup = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, agree } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agree) {
      alert("You must agree to the terms and conditions");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/signup", this.state);
      if (res.data.success) {
        alert(res.data.message);
        window.location.href = "/"; // redirect to login
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  render() {
    return (
        <div className="mail">
        <h1><img src="https://img.icons8.com/?size=100&id=nQ4dZIRCI0nW&format=png"/>Mailbox</h1>
      <div className="signup-form">
        <h2>Create Account</h2>
        <form onSubmit={this.handleSignup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={this.handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={this.handleChange}
          />
          
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
      </div>
    );
  }
}

export default Signup;
