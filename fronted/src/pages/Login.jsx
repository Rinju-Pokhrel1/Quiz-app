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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>🧠 Welcome Back to QuizMaster</h1>
          <p>Login to continue your learning journey</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-btn">Login</button>

          {serverMessage && (
            <p className={`auth-message ${serverMessage.includes('successful') ? 'success' : 'error'}`}>
              {serverMessage}
            </p>
          )}
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
