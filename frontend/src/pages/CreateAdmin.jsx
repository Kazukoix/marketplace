import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";  // Make sure path is correct
import "../css/register.styled.css";

const CreateAdmin = () => {
  const { token } = useContext(UserContext);  // Get token directly from context
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
      const response = await axios.post(
        "http://localhost:8888/create-admin", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`  // Use token from context
          }
        }
      );
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  return (
    <main>
      <div>
        <h2>Create Admin Account</h2>
        <form className="container" onSubmit={handleSubmit}>
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
            <button type="submit">Create Admin</button>
          </div>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </main>
  );
};

export default CreateAdmin;