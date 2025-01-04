import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext"; // Fixed path
import "../css/register.styled.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirm_password") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8888/login", formData);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user); // Update global user state
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  return (
    <main>
      <div>
        <h2>Login Account</h2>
        <form className="container" onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-row">
            <button type="submit">Login</button>
          </div>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </main>
  );
};

export default Login;
