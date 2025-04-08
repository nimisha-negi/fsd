import React, { Component } from "react";
import axios from "axios";
import Login from "./Login";
import "../style/Mail.css";

class Mail extends Component {
  state = {
    isLoggedIn: false,
    userEmail: "",
    mails: [],
  };

  handleLoginSuccess = (email) => {
    this.setState({ isLoggedIn: true, userEmail: email }, () => {
      this.loadMails(email);
    });
  };

  loadMails = async (email) => {
    try {
      const res = await axios.post("http://localhost:3001/get-mails", { email });
      this.setState({ mails: res.data.mails });
    } catch (err) {
      alert("Failed to fetch mails");
    }
  };

  renderMailList = () => (
    <div className="mail-ui">
      <div className="mail-tabs">
        <button className="active">Primary</button>
        <button>Promotions </button>
        <button>Social </button>
        <button>Updates <span className="badge orange">1 new</span></button>
      </div>
      <ul className="mail-list">
        {this.state.mails.map((mail, i) => (
          <li key={i}>
            <div className="sender">{mail.sender}</div>
            <div className="subject">{mail.subject}</div>
            <div className="snippet">{mail.content}</div>
            <div className="date">{mail.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );

  render() {
    return (
      <div className="mail">
        {this.state.isLoggedIn && (
          <div className="mail-header">
            <img
              src="https://img.icons8.com/?size=100&id=nQ4dZIRCI0nW&format=png"
              alt="logo"
            />
            <h1>Gmail</h1>
          </div>
        )}
        {this.state.isLoggedIn
          ? this.renderMailList()
          : <Login onLoginSuccess={this.handleLoginSuccess} />}
      </div>
    );
  }
  
}

export default Mail;
