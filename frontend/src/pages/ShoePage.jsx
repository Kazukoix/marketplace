import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext"; // Import context
import "../css/shoes.page.styled.css";

const ShoePage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext); // Access user info from context
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/shoes/${id}`);
        setShoe(res.data);
      } catch (err) {
        console.error("Error fetching shoe:", err);
      }
    };
    fetchShoe();
  }, [id]);

  if (!shoe) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="shoe-content-box">
        <div className="shoe-item">
          <h1>{user ? `${user.name}, here's a great choice!` : "A Great Shoe Choice!"}</h1>
          <div className="image-container">
            {JSON.parse(shoe.image).map((img, index) => (
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoePage;
