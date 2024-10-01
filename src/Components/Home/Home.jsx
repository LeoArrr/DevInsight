import React from "react";
import { useNavigate } from "react-router-dom";
import "../../output.css";

const Home = () => {
  const navigate = useNavigate();

  const ctaButton = () => {
    navigate("/search");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="absolute top-4 left-4 text-4xl font-bold">bla</div>

      <h1 className="text-3xl mb-2 bg-red-600">blabla</h1>
      <p className="mb-8">catchybla</p>

      <button
        onClick={ctaButton}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        cta
      </button>
    </div>
  );
};

export default Home;
