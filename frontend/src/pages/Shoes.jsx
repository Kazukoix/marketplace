import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ShowCase from '../pages_components/Front.ad';
import TopPicks from '../pages_components/TopPicksComp';
const Shoes = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchAllShoes = async () => {
      try {
        const res = await axios.get("http://localhost:8888/shoes");
        setShoes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllShoes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8888/shoes/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ShowCase/>
      <TopPicks/>
      <h1>MarketPlace</h1>
      <div className="shoes">
        {shoes.map((shoe) => {
          // Parse the JSON array and pick the first image
          const images = shoe.image ? JSON.parse(shoe.image) : [];
          const firstImage = images.length > 0 ? images[0] : null;

          return (
            <div className="shoe" key={shoe.id}>
              {firstImage && (
                <img
                  className="product-shoe-image"
                  src={`http://localhost:8888/images/${firstImage}`}
                  alt={shoe.prod_name}
                />
              )}
              <h2>{shoe.prod_name}</h2>
              <h2>{shoe.brand}</h2>
              <span>{shoe.price}</span>
              <button className="delete" onClick={() => handleDelete(shoe.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${shoe.id}`}>Update</Link>
              </button>
            </div>
          );
        })}
      </div>

      <button>
        <Link to="/add">Add new item</Link>
      </button>
    </div>
  );
};

export default Shoes;
