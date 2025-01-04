import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/content.styled.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [shoes, setShoes] = useState([]);
  const [sortedShoes, setSortedShoes] = useState([]);
  const [sortOption, setSortOption] = useState("best-selling");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const navigate = useNavigate();
  const query = searchParams.get("query");

  // Fetch shoes based on search query
  const fetchSearchResults = async () => {
    try {
      const res = await axios.get(`http://localhost:8888/shoes?search=${query}`);
      setShoes(res.data);
      setSortedShoes(res.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  // Size filter logic
  const toggleSizeFilter = async (size) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(updatedSizes);

    try {
      if (updatedSizes.length === 0) {
        fetchSearchResults();
      } else {
        const sizeQueries = updatedSizes.map((s) => `size=${s}`).join("&");
        const res = await axios.get(
          `http://localhost:8888/shoes?search=${query}&${sizeQueries}`
        );
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

  // Fetch search results on initial render
  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  const handleShoeClick = (id) => {
    navigate(`/shoe/${id}`);
  };

  return (
    <main>
      <div className="content">
        <h1>Search Results</h1>
        <nav className="bread-crumb">
          <a href="/" className="home-link" title="Home">
            Home
          </a>
          <span aria-hidden="true">›</span>
          <span>Search</span>
        </nav>
      </div>
      <div className="page-name">
        <p>Results for "{query}"</p>
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
            {sortedShoes.length > 0 ? (
              sortedShoes.map((shoe) => (
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
              ))
            ) : (
              <p>No results found for "{query}".</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchResults;
