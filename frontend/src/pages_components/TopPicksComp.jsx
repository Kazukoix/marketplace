import {shoeOne, shoeTwo, shoeThree} from '../images/shoes';
import { useEffect } from 'react';
import '../css/topPick.styled.css'; // Correct file name and path
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const TopPicks = () => {
  useEffect(() => {
    new Swiper(".card-wrapper", {
      loop: true,
      spaceBetween: 30,

      // Pagination bullets
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // Responsive breakpoints
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
  }, []); // Run only once after component mounts


  return (
    //This will print out the data from the database using DOM
    <div>
      <div className="top-picks-divider">
        <h2 className="divider"><span>THIS IS A TEST</span></h2>
      </div>
      <div className="body">
        <div className="container swiper">
          <div className="card-wrapper">
            <ul className="card-list swiper-wrapper">
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeOne} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 1</p>
                  <h2 className="card-title">Shoe 1 Name Insert</h2>
                </a>
              </li>
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeTwo} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 2</p>
                  <h2 className="card-title">Shoe 2 Name Insert</h2>
                </a>
              </li>
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeThree} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 3</p>
                  <h2 className="card-title">Shoe 3 Name Insert</h2>
                </a>
              </li>
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeOne} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 4</p>
                  <h2 className="card-title">Shoe 4 Name Insert</h2>
                </a>
              </li>
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeTwo} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 5</p>
                  <h2 className="card-title">Shoe 5 Name Insert</h2>
                </a>
              </li>
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeOne} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 6</p>
                  <h2 className="card-title">Shoe 6 Name Insert</h2>
                </a>
              </li>
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeTwo} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 7</p>
                  <h2 className="card-title">Shoe 7 Name Insert</h2>
                </a>
              </li>
              <li className="card-item swiper-slide">
                <a href="/" className="card-link">
                  <img src={shoeThree} alt="showOne" className="card-image"/>
                  <p className="shoe-name">Shoe 8</p>
                  <h2 className="card-title">Shoe 8 Name Insert</h2>
                </a>
              </li>
            </ul>

            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>


          </div>
        </div>
    </div>
  </div>

  )
}

export default TopPicks;