import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext"; // Fixed path
import "../css/ribbon-styled.css";
import { Logo, Profile, Cart } from "../svg-components";

const Ribbon = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="offers-bar">OFFERS</div>
      <div className="ribbon-container">
        <div className="ribbon">
          <a href="/" target="_self" rel="noopener noreferrer">
            <img className="sole-box" src={Logo} alt="sole-box" />
          </a>
          <form onSubmit={handleSearch} className="search-form">
            <input
              className="search-box"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">🔍</button>
          </form>
          <div className="icons">
            <img
              className="sole-box"
              src={Profile}
              alt="profile"
              onClick={handleProfileClick}
            />
            {user ? (
              <p>Welcome!</p>
            ) : (
              <a href="/login" target="_self" rel="noopener noreferrer">
                <p>Sign in</p>
              </a>
            )}
            <img className="sole-box" src={Cart} alt="cart" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ribbon;
