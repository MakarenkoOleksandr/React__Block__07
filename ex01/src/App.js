import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [message, setMessage] = useState({
    text: "",
    background: "",
    isVisible: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email.includes("@") || data.email.split("@").length !== 2) {
      showMessage("Please, provide a valid email.", "red");
    } else if (data.password !== data.password2) {
      showMessage("Passwords must match.", "red");
    } else if (data.password.length < 8) {
      showMessage("Password must have at least 8 characters.", "red");
    } else {
      showMessage("Successfully registered", "green");
    }
  };

  const showMessage = (text, background) => {
    setMessage({
      text,
      background,
      isVisible: true,
    });

    setTimeout(() => {
      setMessage({
        ...message,
        isVisible: false,
      });
    }, 2000);
  };

  return (
    <div className="App">
      <h2
        style={{
          background: message.background,
          visibility: message.isVisible ? "visible" : "hidden",
        }}
      >
        {message.text}
      </h2>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <span className="eye" onClick={handleTogglePassword}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            name="password2"
            value={data.password2}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
