import { useState } from "react";
import axios from "axios";
import "../css/content.styled.css";
import "../css/register.styled.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend
      const response = await axios.post("http://localhost:8888/register", formData);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  return (
    <main>
      <div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
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
            <button type="submit">Create</button>
          </div>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </main>
  );
};

export default Register;
