import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../css/content.styled.css";

const Mens = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();

  // Fetch all shoes
  const fetchAllShoes = async () => {
    try {
      const res = await axios.get("http://localhost:8888/shoes");
      setShoes(res.data); // Update the state with all shoes
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch shoes by brand
  const fetchShoesByBrand = async (brand) => {
    try {
      const res = await axios.get(`http://localhost:8888/shoes/filter/brand?brand=${brand}`);
      setShoes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch shoes by size
  const handleFilter = async (size) => {
    try {
      const res = await axios.get(`http://localhost:8888/shoes/size/${size}`);
      setShoes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Navigate to shoe details
  const handleShoeClick = (id) => {
    navigate(`/shoe/mens/${id}`);
  };

  // UseEffect to fetch all shoes on component load
  useEffect(() => {
    fetchAllShoes();
  }, []);

  return (
    <main>
      <div className="content">
        <nav className="bread-crumb">
          <a href="/" className="home-link" title="Home">Home</a>
          <span aria-hidden="true">›</span>
          <span>Men</span>
        </nav>
        <div className="content-name">
          <p>Men</p>
        </div>
        <div className="content-2">
          <div className="side-bar">
            <select id="sort-by" className="style-select">
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
                    <button
                      onClick={() => {
                      setSelectedBrand(null); // Reset selected brand state
                      fetchAllShoes(); // Fetch all shoes without filter
                      }}
                    >
                    All
                    </button>
                  </li>
                  <li>
                    <button onClick={() => {setSelectedBrand("nike"); fetchShoesByBrand("nike"); }}>Nike</button>
                  </li>
                  <li>
                    <button onClick={() => {setSelectedBrand("adidas"); fetchShoesByBrand("adidas"); }}>Adidas</button>
                  </li>
                  <li>
                    <button onClick={() => {setSelectedBrand("nb"); fetchShoesByBrand("nb"); }}>New Balance</button>
                  </li>
                  <li>
                    <button onClick={() => {setSelectedBrand("puma"); fetchShoesByBrand("puma"); }}>Puma</button>
                  </li>
                  <li>
                  <button onClick={() => {setSelectedBrand("vans"); fetchShoesByBrand("vans"); }}>Vans</button>
                  </li>
                  <li>
                  <button onClick={() => {setSelectedBrand("asics"); fetchShoesByBrand("asics"); }}>Asics</button>
                  </li>
                </ul>
              </div>
              <h4>Size</h4>
              <div className="filter">
                <ul>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        data-tag="4"
                        onChange={() => handleFilter("4")}
                      /> US 4
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="5"
                        onChange={() => handleFilter("5")}
                      /> US 5
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="6"
                        onChange={() => handleFilter("6")}
                      /> US 6
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="7"
                        onChange={() => handleFilter("7")}
                      /> US 7
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="8"
                        onChange={() => handleFilter("8")}
                      /> US 8
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="9"
                        onChange={() => handleFilter("9")}
                      /> US 9
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="10"
                        onChange={() => handleFilter("10")}
                      /> US 10
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="11"
                        onChange={() => handleFilter("11")}
                      /> US 11
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="12"
                        onChange={() => handleFilter("12")}
                      /> US 12
                    </label>
                  </li>
                  <li>
                    <label>
                    <input
                        type="checkbox"
                        data-tag="13"
                        onChange={() => handleFilter("13")}
                      /> US 13
                    </label>
                  </li>
                </ul>
              </div>
          </div>
          <div className ="shoes-container">
            <div className ="shoes-wrapper">
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
      </div>
    </main>
  );
}

export default Mens;
