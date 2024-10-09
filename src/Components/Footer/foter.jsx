import React from "react";
import { FaGithub} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        

        <div className="footer-contact">
          <p className="footer-title">Contact Us</p>
          <a href="https://github.com/LeoArrr/DevInsight" className="footer-link">
          https://github.com/LeoArrr/DevInsight
          </a>
        </div>

        <div className="footer-social">
          <p className="footer-title">Follow Us</p>
          <div className="social-icons">
            <a href="https://github.com/LeoArrr" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>2024 DevInsight. Made by Lea, Fabrice, and Ebrahim.</p>
      </div>
    </footer>
  );
};

export default Footer;
