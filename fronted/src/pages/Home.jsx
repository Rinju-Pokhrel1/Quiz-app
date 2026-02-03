import React from "react";
import "../index.css";

const Home = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="home">
      {/* Header / Navbar */}
      <header className="header">
        <div className="logo">
          <h1>🧠 QuizMaster</h1>
        </div>
        <nav className="navbar">
          <a href="/">Home</a>
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
          <h1>Challenge Your Mind Daily</h1>
          <p>Join thousands of users testing their knowledge with fun, interactive quizzes. Learn something new every day!</p>
          <a href="/signup" className="btn btn-primary btn-large">Start Quizzing Now</a>
        </div>
        <div className="hero-image">
          <div className="quiz-icon">❓</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why QuizMaster?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">🎯</div>
            <h3>Varied Topics</h3>
            <p>Explore quizzes on history, science, pop culture, and more.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📈</div>
            <h3>Track Progress</h3>
            <p>Monitor your scores and see how you improve over time.</p>
          </div>
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Quick & Fun</h3>
            <p>Short, engaging quizzes that fit into your busy schedule.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Test Your Knowledge?</h2>
        <p>Create an account and dive into the world of quizzes!</p>
        <a href="/signup" className="btn btn-primary btn-large">Join Now</a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 QuizMaster. Challenge yourself daily.</p>
      </footer>
    </div>
  );
};

export default Home;
