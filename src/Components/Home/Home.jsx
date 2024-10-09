import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const ctaButton = () => {
    navigate("/search");
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">DevInsight</h1>

      <p className="welcome-text">
        Search for GitHub repositories by user & add your fabvorite repositories
        to your list.
      </p>
      <button onClick={ctaButton} className="cta-button">
        Get Started
      </button>
      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        className="github-icon"
      >
        <FaGithub className="github-icon" />
      </a>
    </div>
  );
};

export default Home;
