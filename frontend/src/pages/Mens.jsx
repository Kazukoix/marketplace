import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext"; // Import context
import "../css/content.styled.css";

const Mens = () => {
  const { user } = useContext(UserContext); // Access user info from context
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();

  const fetchAllShoes = async () => {
    try {
      const res = await axios.get("http://localhost:8888/shoes");
      setShoes(res.data);
    } catch (err) {
      console.error("Error fetching shoes:", err);
    }
  };

  useEffect(() => {
    fetchAllShoes();
  }, []);

  const handleShoeClick = (id) => {
    navigate(`/shoe/mens/${id}`);
  };

  return (
    <main>
      <div className="content">
        <h1>Welcome to Men's Shoes, {user ? user.name : "Guest"}!</h1>
        <div className="shoes-container">
          <div className="shoes-wrapper">
            {shoes.map((shoe) => (
              <div
                key={shoe.id}
                className="shoe-display"
                onClick={() => handleShoeClick(shoe.id)}
              >
                <img
                  className="shoe-image"
                  src={`http://localhost:8888/images/${JSON.parse(shoe.image)[0]}`}
                  alt={shoe.prod_name}
                />
                <p>{shoe.prod_name}</p>
                <p>&#8369;{shoe.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Mens;
