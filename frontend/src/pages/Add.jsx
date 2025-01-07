import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Add = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shoe, setShoe] = useState({
    prod_name: "",
    brand: "",
    size: "",
    sex: "",
    prod_description: "",
    price: "",
    image: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user?.is_admin || !token) {
      setError("Unauthorized access. Redirecting to home page.");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!shoe.prod_name.trim()) return "Product name is required";
    if (!shoe.brand.trim()) return "Brand is required";
    if (!shoe.size.trim()) return "At least one size is required";
    if (!shoe.sex) return "Gender selection is required";
    if (!shoe.prod_description.trim()) return "Product description is required";
    if (!shoe.price || parseFloat(shoe.price) <= 0) return "Valid price is required";
    if (!shoe.image.trim()) return "At least one image filename is required";
    return null;
  };

  const resetForm = () => {
    setShoe({
      prod_name: "",
      brand: "",
      size: "",
      sex: "",
      prod_description: "",
      price: "",
      image: ""
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        setIsLoading(false);
        return;
      }

      const sizeArray = shoe.size
        .split(',')
        .map(size => size.trim())
        .filter(size => size !== "");

      const imageArray = shoe.image
        .split(',')
        .map(img => img.trim())
        .filter(img => img !== "");

      const submissionData = {
        ...shoe,
        size: JSON.stringify(sizeArray),
        image: JSON.stringify(imageArray),
        price: parseFloat(shoe.price)
      };

      const response = await axios.post(
        "http://localhost:8888/add", 
        submissionData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Product added successfully!");
        resetForm();
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error('Error details:', err);
      setError(err.response?.data?.message || "An error occurred while adding the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <h1>Add New Item</h1>
      
      {error && <div className="error-message" role="alert">{error}</div>}
      {successMessage && <div className="success-message" role="alert">{successMessage}</div>}
      
      <input
        type="text"
        placeholder="Product Name"
        onChange={handleChange}
        name="prod_name"
        value={shoe.prod_name}
        disabled={isLoading}
        maxLength={100}
      />

      <input
        type="text"
        placeholder="Brand"
        onChange={handleChange}
        name="brand"
        value={shoe.brand}
        disabled={isLoading}
        maxLength={50}
      />

      <input
        type="text"
        placeholder="Sizes (comma-separated, e.g.: 7,8,9,10)"
        onChange={handleChange}
        name="size"
        value={shoe.size}
        disabled={isLoading}
      />

      <select
        onChange={handleChange}
        name="sex"
        value={shoe.sex}
        disabled={isLoading}
      >
        <option value="">Select Gender</option>
        <option value="Male">Men</option>
        <option value="Female">Women</option>
        <option value="Unisex">Unisex</option>
      </select>

      <textarea
        placeholder="Product Description"
        onChange={handleChange}
        name="prod_description"
        value={shoe.prod_description}
        disabled={isLoading}
        maxLength={500}
        rows={4}
      />

      <input
        type="text"
        placeholder="Price"
        onChange={handleChange}
        name="price"
        value={shoe.price}
        disabled={isLoading}
        pattern="\d*\.?\d*"
      />

      <input
        type="text"
        placeholder="Image filenames (comma-separated, e.g.: image1.webp,image2.webp)"
        onChange={handleChange}
        name="image"
        value={shoe.image}
        disabled={isLoading}
      />

      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Product'}
      </button>
    </div>
  );
};

export default Add;