import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext"; // Import context
import "../css/shoes.page.styled.css";
import { useNavigate } from "react-router-dom";

const ShoePage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext); // Access user info from context
  const [shoe, setShoe] = useState(null);
  const [error, setError] = useState(null); // New error state
  const navigate = useNavigate();

  const handleBuy = async () => {
    if (!user) {
      alert("Please log in to add items to your cart!");
      return navigate("/login"); // Redirect to login if user is not logged in
    }

    try {
      await axios.post("http://localhost:8888/cart", {
        userId: user.id,
        shoeId: shoe.id,
        quantity: 1, // Default quantity is 1
      });
      alert("Item added to cart!");
      navigate("/cart"); // Navigate to the cart page
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/shoes/${id}`);
        console.log("Shoe data fetched:", res.data); // Debug log
        setShoe(res.data);
      } catch (err) {
        console.error("Error fetching shoe:", err);
        setError("Unable to fetch shoe data. Please try again later.");
      }
    };
    fetchShoe();
  }, [id]);

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  if (!shoe) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="shoe-content-box">
        <div className="shoe-item">
          <div className="image-container">
            {Array.isArray(JSON.parse(shoe.image)) &&
              JSON.parse(shoe.image).map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:8888/images/${img}`}
                  alt={`${shoe.prod_name} ${index + 1}`}
                  className="shoe-image"
                />
              ))}
          </div>
          <div className="shoe-info">
            <h2>{shoe.prod_name}</h2>
            <h3>Brand: {shoe.brand}</h3>
            <h3>Price: &#8369;{shoe.price}</h3>
            <p>{shoe.prod_description}</p>
            <button onClick={() => handleBuy(shoe)}>Buy</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoePage;
