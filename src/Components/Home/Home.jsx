import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const ctaButton = () => {
    navigate("/search");
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">DevInsight</h1>
      <p className="welcome-text">
        Search for GitHub repositories by user, country, or coding language.
      </p>
      <button onClick={ctaButton} className="cta-button">
        Get Started
      </button>
    </div>
  );
};

export default Home;
