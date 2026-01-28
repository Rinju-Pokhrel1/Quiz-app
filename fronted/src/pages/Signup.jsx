import React, { useState } from "react";
import "../index.css";

const RegisterPage = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    term: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // First Name
    if (!form.first_name.trim()) {
      validationErrors.first_name = "Please enter first name";
    }

    // Last Name
    if (!form.last_name.trim()) {
      validationErrors.last_name = "Please enter last name";
    }

    // Email
    if (!form.email.trim()) {
      validationErrors.email = "Please enter email";
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(form.email)) {
        validationErrors.email = "Please enter a valid email address";
      }
    }

    // Password
    if (!form.password) {
      validationErrors.password = "Please enter password";
    } else if (form.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    // Terms
    if (form.term !== "1") {
      validationErrors.term = "You must accept the terms and conditions";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No errors, proceed to submit
      console.log("Form submitted:", form);
      // Here you can call API, e.g., axios.post("/api/register", form)
    }
  };

  return (
    <div>
      <div id="header">
        <div id="logo">
          <img src="images/logo.png" alt="eStore" title="eStore" />
        </div>

        <div id="navbar">
          <a href="index.html">Home</a>
          <a href="about.html">About us</a>
          <a href="contact.html">Contact</a>
          <a href="products.html">Products</a>
        </div>

        <div id="login_reg_panel">
          <a href="login.html">Login</a>
          <a href="register.html">Register</a>
        </div>
      </div>

      <div className="container">
        <div id="register_form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Firstname</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
              />
              <span className="validation_error">{errors.first_name}</span>
            </div>

            <div>
              <label>Lastname</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
              />
              <span className="validation_error">{errors.last_name}</span>
            </div>

            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <span className="validation_error">{errors.email}</span>
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span className="validation_error">{errors.password}</span>
            </div>

            <div>
              <p>Do you accept terms and conditions?</p>
                           <input
                type="radio"
                name="term"
                value="0"
                checked={form.term === "0"}
                onChange={handleChange}
              />
              <label>No</label>
            </div>

            <div>
              <input type="submit" id="register_btn" value="Register now" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
