import React from "react";
import "../index.css";

const Home = () => {
  return (
    <div>
      {/* Header / Navbar */}
      <div id="header">
        <div id="logo">
          <img src="images/logo.png" alt="Quiz-app" title="Quiz-app" />
        </div>

        <div id="navbar">
          <a href="index.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="products.html">Blogs</a>
        </div>

        <div id="login_reg_panel">
          <a href="login.html">Login</a>
          <a href="register.html">Register</a>
        </div>
      </div>

      {/* Main content */}
      <div className="container">
        <h1>Welcome to Quiz .</h1>
      </div>
    </div>
  );
};

export default Home;
