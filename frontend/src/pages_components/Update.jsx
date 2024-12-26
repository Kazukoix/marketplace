import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () =>{
  const [shoe,setShoe] = useState({
    prod_name: "",
    prod_description: "",
    price: null,
    image: ""
  });

const navigate = useNavigate()
const location= useLocation(); 
const shoeId=location.pathname.split("/")[2];

const handleChange = (e) => {
  setShoe((prev)=> ({...prev, [e.target.name]: e.target.value}));
  };

const handleClick = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`http://localhost:8888/shoes/${shoeId}`, shoe);
    navigate("/");
  } catch (err) {
    console.error('Error updating data:', err.response || err);
  }
};

  return (
    <div className="form">
      <h1>Update Item</h1>
      <input
        type="text"
        placeholder="Product Name"
        onChange={handleChange}
        name="prod_name"
        value={shoe.prod_name}
      />
      <input
        type="text"
        placeholder="Product Description"
        onChange={handleChange}
        name="prod_description"
        value={shoe.prod_description}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
        value={shoe.price}
      />
      <input
        type="text"
        placeholder="Image URL"
        onChange={handleChange}
        name="image"
        value={shoe.image}
      />

      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update