import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/account.styled.css";

const Account = () => {
  const [activeSection, setActiveSection] = useState("details");
  const [userDetails, setUserDetails] = useState({ first_name: "",last_name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from local storage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserDetails(storedUser);
    }
  }, []);

  useEffect(() => {
    // Check if the user is logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      // If no user data, redirect to login
      navigate("/login");
    } else {
      // Set user details from local storage
      setUserDetails(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (activeSection === "logout") {
      // Handle logout
      localStorage.removeItem("user");
      window.location.href = "/login"; // Redirect to login page
    }
  }, [activeSection]);

  

  return (
    <main className="account-container">
      <nav className="bread-crumb">
        <a href="/" className="home-link" title="Home">
          Home
        </a>
        <span aria-hidden="true">›</span>
        <span>Account</span>
      </nav>
      <h2>Account</h2>
      <div className="account-wrapper">
        {/* Left Menu */}
        <div className="account-menu">
          <p
            className={activeSection === "details" ? "active" : ""}
            onClick={() => setActiveSection("details")}
          >
            Account Details
          </p>
          <p
            className={activeSection === "history" ? "active" : ""}
            onClick={() => setActiveSection("history")}
          >
            Order History
          </p>
          <p
            className={activeSection === "logout" ? "active" : ""}
            onClick={() => setActiveSection("logout")}
          >
            Logout
          </p>
        </div>

        {/* Right Content */}
        <div className="account-content">
          {activeSection === "details" && (
            <div className="account-details">
              <p>{`${userDetails.first_name} ${userDetails.last_name}`}</p>
              <p>{userDetails.email || "Email not available"}</p>
            </div>
          )}
          {activeSection === "history" && (
            <div className="order-history">
              <p>You haven't placed any orders yet.</p>
            </div>
          )}
          {activeSection === "logout" && (
            <div className="logout">
              <p>You have logged out successfully.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Account;
