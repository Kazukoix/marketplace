import { useEffect, useState } from 'react';
import '../css/topPick.styled.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const TopPicks = () => {
  const [topPicks, setTopPicks] = useState([]);

  // Fetch top picks from the backend
  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await fetch('http://localhost:8888/top-picks');
        const data = await response.json();
        setTopPicks(data);
      } catch (error) {
        console.error('Error fetching top picks:', error);
      }
    };

    fetchTopPicks();
  }, []);

  // Initialize Swiper
  useEffect(() => {
    const swiper = new Swiper(".card-wrapper", {
      loop: true,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        764: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });

    return () => {
      if (swiper) swiper.destroy();
    };
  }, [topPicks]); // Reinitialize when topPicks changes

  return (
    <div className="whole">
      <div className="top-picks-divider">
        <h2 className="divider"><span>Random Picks</span></h2>
      </div>
      <div className="body">
        <div className="container swiper">
          <div className="card-wrapper">
            <ul className="card-list swiper-wrapper">
              {topPicks.map((shoe) => (
                <li key={shoe.id} className="card-item swiper-slide">
                  <a href={`/shoe/${shoe.id}`} className="card-link">
                  <img src={`http://localhost:8888/images/${
                        Array.isArray(JSON.parse(shoe.image)) 
                        ? JSON.parse(shoe.image)[0] 
                        : ''
                      }`} 
                      alt={shoe.prod_name} 
                      className="card-image"
                    />
                    <p className="shoe-name">{shoe.brand}</p>
                    <h2 className="card-title">{shoe.prod_name}</h2>
                    <p className="price">&#8369;{shoe.price}</p>
                  </a>
                </li>
              ))}
            </ul>

            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;