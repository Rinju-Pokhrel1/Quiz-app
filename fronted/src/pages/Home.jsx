import React from "react";
import "../index.css";

const Home = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="home">
      {/* Header / Navbar */}
      <header className="header">
        <div className="logo">
          <h1>QuizMaster</h1>
        </div>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          {role === 'admin' && <a href="/admin">Admin</a>}
        </nav>
        <div className="auth-buttons">
          <a href="/login" className="btn btn-secondary">Login</a>
          <a href="/signup" className="btn btn-primary">Sign Up</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Test Your Knowledge</h1>
          <p>Challenge yourself with our interactive quizzes. Learn, compete, and have fun!</p>
          <a href="/signup" className="btn btn-primary btn-large">Get Started</a>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/500x300?text=Quiz+Illustration" alt="Quiz Illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose QuizMaster?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Diverse Topics</h3>
            <p>Explore quizzes on various subjects from science to history.</p>
          </div>
          <div className="feature-card">
            <h3>🏆 Track Progress</h3>
            <p>Monitor your scores and improve over time.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Free</h3>
            <p>Enjoy a safe, ad-free experience at no cost.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 QuizMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
