import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () =>{
  const [shoe,setShoe] = useState({
    prod_name: "",
    prod_description: "",
    price: null,
    image: ""
  });

const navigate = useNavigate()

const handleChange = (e) => {
  setShoe((prev)=> ({...prev, [e.target.name]: e.target.value}));
  };

const handleClick = async (e) => {
  e.preventDefault()
  try{
    await axios.post("http://localhost:8888/shoes",shoe);
    navigate("/")
  }catch(err){
    console.error('Error posting data:', err.response || err);
  }


  };

  return (
    <div className="form">
      <h1>Add New Item</h1>
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

      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add