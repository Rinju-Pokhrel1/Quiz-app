import React, { useState } from "react";
import "../index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle login logic here, e.g., API call
    console.log("Username:", username, "Password:", password);
  };

  return (
    <div>
      <div id="header">
        <div id="logo">
          <img src="images/logo.png" alt="eStore" title="eStore" />
        </div>

        <div id="navbar">
          <a href="index.html">Index</a>
          <a href="about.html">About us</a>
          <a href="contact.html">Contact</a>
        </div>

        <div id="login_reg_panel">
          <a href="login.html">Login</a>
          <a href="register.html">Register</a>
        </div>
      </div>

      <div className="container">
        <div id="login_form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <b>Username</b>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label>
                <b>Password</b>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <input type="submit" id="login_btn" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
