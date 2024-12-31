import { useEffect, useState } from "react";
import "../css/shoes.page.styled.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShoePage = () => {
  const { id } = useParams(); // Get the shoe ID from the route
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/shoes`);
        const selectedShoe = res.data.find((s) => s.id === parseInt(id));
        setShoe(selectedShoe);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShoe();
  }, [id]);

  if (!shoe) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="top-picks-divider">
        <h2 className="divider">
          <span>Our Top Picks</span>
        </h2>
      </div>

      <div className="shoe-content-box">
        <div className="shoe-item">
          <div className="image-container">
            {/* Iterate over the images array */}
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
            <h3>Price: ${shoe.price}</h3>
            <p>{shoe.prod_description}</p>
            <select id="size" className="style-size">
              <option value="">Select Size</option>
              <option value="4">US-4</option>
              <option value="5">US-5</option>
              <option value="6">US-6</option>
              <option value="7">US-7</option>
              <option value="8">US-8</option>
              <option value="9">US-9</option>
              <option value="10">US-10</option>
              <option value="11">US-11</option>
              <option value="12">US-12</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoePage;
