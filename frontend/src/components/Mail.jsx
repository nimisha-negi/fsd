import React, { Component } from "react";
import axios from "axios";
import "../style/Mail.css";

class Mail extends Component {
  state = {
    email: "",
    password: "",
    isLoggedIn: false,
    mails: [],
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async () => {
    const { email, password } = this.state;
    try {
      const res = await axios.post("http://localhost:3001/login", { email, password });
      if (res.data.success) {
        alert(res.data.message);
        this.setState({ isLoggedIn: true });
        this.loadMails(email);
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  loadMails = async (email) => {
    try {
      const res = await axios.post("http://localhost:3001/get-mails", { email });
      this.setState({ mails: res.data.mails });
    } catch (err) {
      alert("Failed to fetch mails");
    }
  };

  renderLoginForm = () => (
    <div className="login-form">
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={this.handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={this.handleInputChange}
      />
      <button onClick={this.handleLogin}>Login</button>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );

  renderMailList = () => (
    <div className="mail-list">
      <h2>Your Mails:</h2>
      <ul>
        {this.state.mails.map((mail, i) => (
          <li key={i}>
            <strong>{mail.subject}</strong>
            <p>{mail.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  render() {
    return (
      <div className="mail">
        <h1>
        <img src="https://img.icons8.com/?size=100&id=nQ4dZIRCI0nW&format=png"/>Mailbox</h1>
        {this.state.isLoggedIn ? this.renderMailList() : this.renderLoginForm()}
      </div>
    );
  }
}

export default Mail;
