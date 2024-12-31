import React from "react";
import "../css/footer.styled.css"; // Link the external CSS file
import { LogoW } from "../svg-components"; // Assuming LogoW is a valid SVG component or path

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <section className="footer-section">
          <img className="footer-logo" src={LogoW} alt="Sole Box Logo" />
          <h4>About Us</h4>
          <p>
            Discover the best collection of shoes for everyone at Sole Box.
            Designed for comfort, style, and durability.
          </p>
        </section>
        <section className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-list">
            <li>
              <a href="/mens" className="footer-link">
                Men's Collection
              </a>
            </li>
            <li>
              <a href="/mens" className="footer-link">
                Women's Collection
              </a>
            </li>
            <li>
              <a href="/mens" className="footer-link">
                Kid's Collection
              </a>
            </li>
            <li>
              <a href="/register" className="footer-link">
                Register
              </a>
            </li>
          </ul>
        </section>
        <section className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@solebox.com</p>
          <p>Phone: +1 234 567 890</p>
        </section>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Sole Box. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
