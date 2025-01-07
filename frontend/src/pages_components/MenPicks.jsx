import { useEffect, useState } from 'react';
import '../css/topPick.styled.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const MenPicks = () => {
  const [malePicks, setMalePicks] = useState([]);

  useEffect(() => {
    const fetchMalePicks = async () => {
      try {
        const response = await fetch('http://localhost:8888/male-picks');
        const data = await response.json();
        setMalePicks(data);
      } catch (error) {
        console.error('Error fetching male picks:', error);
      }
    };

    fetchMalePicks();
  }, []);

  useEffect(() => {
    if (malePicks.length > 0) {
      const swiper = new Swiper(".men-picks-wrapper", {
        loop: true,
        spaceBetween: 30,
        pagination: {
          el: ".men-picks-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".men-picks-button-next",
          prevEl: ".men-picks-button-prev",
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
        swiper?.destroy?.(true, true);
      };
    }
  }, [malePicks]);

  return (
    <div className="whole">
      <div className="top-picks-divider">
        <h2 className="divider"><span>Men's Picks</span></h2>
      </div>
      <div className="body">
        <div className="container swiper">
          <div className="men-picks-wrapper card-wrapper">
            <ul className="card-list swiper-wrapper">
              {malePicks.map((shoe) => (
                <li key={shoe.id} className="card-item swiper-slide">
                  <a href={`/shoe/${shoe.id}`} className="card-link">
                    <img 
                      src={`http://localhost:8888/images/${
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

            <div className="swiper-pagination men-picks-pagination"></div>
            <div className="swiper-button-prev men-picks-button-prev"></div>
            <div className="swiper-button-next men-picks-button-next"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenPicks;