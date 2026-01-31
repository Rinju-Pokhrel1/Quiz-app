import React, { useState } from "react";
import "../index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerMessage(data.message || "Login failed");
        return;
      }

      // On success, store token and redirect
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setServerMessage("Login successful!");
        // Optionally redirect to quiz page
        window.location.href = "/quiz";
      }
    } catch (err) {
      console.error("Login error:", err);
      setServerMessage("Server error. Try again later.");
    }
  };

  return (
    <div>
      <div id="header">
        <div id="logo">
          <img src="images/logo.png" alt="eStore" title="eStore" />
        </div>

        <div id="navbar">
          <a href="/">Index</a>
          <a href="/about">About us</a>
          <a href="/contact">Contact</a>
        </div>

        <div id="login_reg_panel">
          <a href="/login">Login</a>
          <a href="/signup">Register</a>
        </div>
      </div>

      <div className="container">
        <div id="login_form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
              />
            </div>

            <div>
              <input type="submit" id="login_btn" value="Login" />
            </div>

            {serverMessage && <p className="server_message">{serverMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
