// import React, { useState } from "react";
// import "../index.css";

// const RegisterPage = () => {
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     term: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: "" }); // Clear error on change
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = {};

//     // First Name
//     if (!form.first_name.trim()) {
//       validationErrors.first_name = "Please enter first name";
//     }

//     // Last Name
//     if (!form.last_name.trim()) {
//       validationErrors.last_name = "Please enter last name";
//     }

//     // Email
//     if (!form.email.trim()) {
//       validationErrors.email = "Please enter email";
//     } else {
//       const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!emailPattern.test(form.email)) {
//         validationErrors.email = "Please enter a valid email address";
//       }
//     }

//     // Password
//     if (!form.password) {
//       validationErrors.password = "Please enter password";
//     } else if (form.password.length < 6) {
//       validationErrors.password = "Password must be at least 6 characters";
//     }

//     // Terms
//     if (form.term !== "1") {
//       validationErrors.term = "You must accept the terms and conditions";
//     }

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       // No errors, proceed to submit
//       console.log("Form submitted:", form);
//       // Here you can call API, e.g., axios.post("/api/register", form)
//     }
//   };

//   return (
//     <div>
//       <div id="header">
//         <div id="logo">
//           <img src="images/logo.png" alt="eStore" title="eStore" />
//         </div>

//         <div id="navbar">
//           <a href="/">Home</a>
//           <a href="/about">About us</a>
//           <a href="/contact">Contact</a>
//           <a href="/products">Products</a>
//         </div>

//         <div id="login_reg_panel">
//           <a href="/Login">Login</a>
//           <a href="/signup">Register</a>
//         </div>
//       </div>

//       <div className="container">
//         <div id="register_form">
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>Firstname</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={form.first_name}
//                 onChange={handleChange}
//               />
//               <span className="validation_error">{errors.first_name}</span>
//             </div>

//             <div>
//               <label>Lastname</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={form.last_name}
//                 onChange={handleChange}
//               />
//               <span className="validation_error">{errors.last_name}</span>
//             </div>

//             <div>
//               <label>Email</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//               />
//               <span className="validation_error">{errors.email}</span>
//             </div>

//             <div>
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//               />
//               <span className="validation_error">{errors.password}</span>
//             </div>

//             <div>
//               <p>Do you accept terms and conditions?</p>
//                            <input
//                 type="radio"
//                 name="term"
//                 value="0"
//                 checked={form.term === "0"}
//                 onChange={handleChange}
//               />
//               <label>No</label>
//             </div>

//             <div>
//               <input type="submit" id="register_btn" value="Register now" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";
import "../index.css";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
    setServerMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!form.name.trim()) validationErrors.name = "Name is required";
    if (!form.email.trim()) {
      validationErrors.email = "Email is required";
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(form.email))
        validationErrors.email = "Invalid email address";
    }
    if (!form.password) validationErrors.password = "Password is required";
    else if (form.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerMessage(data.message || "Signup failed");
        return;
      }

      // On success, store token and redirect / show success
      if (data.token) {
        localStorage.setItem("token", data.token);
        setServerMessage("Registration successful!");
        // Optionally redirect to quiz page
        window.location.href = "/quiz";
      }
    } catch (err) {
      console.error("Signup error:", err);
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
          <a href="/">Home</a>
          <a href="/about">About us</a>
          <a href="/contact">Contact</a>
          <a href="/products">Products</a>
        </div>
        <div id="login_reg_panel">
          <a href="/login">Login</a>
          <a href="/signup">Register</a>
        </div>
      </div>

      <div className="container">
        <div id="register_form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <span className="validation_error">{errors.name}</span>
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
              <input type="submit" id="register_btn" value="Register now" />
            </div>

            {serverMessage && <p className="server_message">{serverMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
