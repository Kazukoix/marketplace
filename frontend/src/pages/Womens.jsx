import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import "../css/content.styled.css";

const Womens = () => {
  const { user } = useContext(UserContext);
  const [shoes, setShoes] = useState([]);
  const [sortedShoes, setSortedShoes] = useState([]);
  const [sortOption, setSortOption] = useState("best-selling");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const navigate = useNavigate();

  // Fetch all women's shoes
  const fetchWomensShoes = async () => {
    try {
      const res = await axios.get("http://localhost:8888/shoes?sex=Female");
      setShoes(res.data);
      setSortedShoes(res.data);
    } catch (err) {
      console.error("Error fetching women's shoes:", err);
    }
  };

  // Fetch women's shoes by brand
  const fetchShoesByBrand = async (brand) => {
    try {
      const res = await axios.get(`http://localhost:8888/shoes?brand=${brand}&sex=Female`);
      setShoes(res.data);
      setSortedShoes(res.data);
    } catch (err) {
      console.error("Error filtering shoes by brand:", err);
    }
  };

  // Updated size filter toggle
  const toggleSizeFilter = async (size) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(updatedSizes);
    
    try {
      if (updatedSizes.length === 0) {
        // If no sizes selected, fetch all women's shoes
        fetchWomensShoes();
      } else {
        // Fetch shoes with the selected size
        const sizeQueries = updatedSizes.map(s => `size=${s}`).join('&');
        const res = await axios.get(`http://localhost:8888/shoes?sex=Female&${sizeQueries}`);
        setShoes(res.data);
        setSortedShoes(res.data);
      }
    } catch (err) {
      console.error("Error filtering shoes by size:", err);
    }
  };

  // Sorting logic
  useEffect(() => {
    const sortShoes = () => {
      let sorted = [...shoes];
      switch (sortOption) {
        case "title-ascending":
          sorted.sort((a, b) => a.prod_name.localeCompare(b.prod_name));
          break;
        case "title-descending":
          sorted.sort((a, b) => b.prod_name.localeCompare(a.prod_name));
          break;
        case "price-ascending":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "price-descending":
          sorted.sort((a, b) => b.price - a.price);
          break;
        default:
          sorted = [...shoes];
      }
      setSortedShoes(sorted);
    };
    sortShoes();
  }, [sortOption, shoes]);

  useEffect(() => {
    fetchWomensShoes();
  }, []);

  const handleShoeClick = (id) => {
    navigate(`/shoe/womens/${id}`);
  };

  return (
    <main>
      <div className="content">
        <h1>Women Shoes</h1>
        <nav className="bread-crumb">
          <a href="/" className="home-link" title="Home">Home</a>
          <span aria-hidden="true">›</span>
          <span>Women</span>
        </nav>
      </div>
      <div className="page-name">
        <p>Women</p>
      </div>
      <div className="container">
        <div className="content-2">
          <div className="side-bar">
            <select
              id="sort-by"
              className="style-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="best-selling">Best Selling</option>
              <option value="title-ascending">Alphabetically, A-Z</option>
              <option value="title-descending">Alphabetically, Z-A</option>
              <option value="price-ascending">Price, Low to High</option>
              <option value="price-descending">Price, High to Low</option>
            </select>

            <h4>Brands</h4>
            <div className="filter">
              <ul>
                <li>
                  <button onClick={fetchWomensShoes}>All</button>
                </li>
                <li>
                  <button onClick={() => fetchShoesByBrand("nike")}>Nike</button>
                </li>
                <li>
                  <button onClick={() => fetchShoesByBrand("adidas")}>Adidas</button>
                </li>
                <li>
                  <button onClick={() => fetchShoesByBrand("nb")}>New Balance</button>
                </li>
                <li>
                  <button onClick={() => fetchShoesByBrand("puma")}>Puma</button>
                </li>
                <li>
                  <button onClick={() => fetchShoesByBrand("vans")}>Vans</button>
                </li>
                <li>
                  <button onClick={() => fetchShoesByBrand("asics")}>Asics</button>
                </li>
              </ul>
            </div>

            <h4>Size</h4>
            <div className="filter">
              <ul>
                {["4", "5", "6", "7", "8", "9", "10", "11", "12", "13"].map((size) => (
                  <li key={size}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleSizeFilter(size)}
                      />{" "}
                      US {size}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="shoes-container">
          <div className="shoes-wrapper">
            {sortedShoes.map((shoe) => (
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

export default Womens;