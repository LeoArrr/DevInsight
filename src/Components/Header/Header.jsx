import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">RepoSearch</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => navigate("/")}
              className="hover:underline bg-transparent text-white border-none cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/search")}
              className="hover:underline bg-transparent text-white border-none cursor-pointer"
            >
              Search
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/favorite")}
              className="hover:underline bg-transparent text-white border-none cursor-pointer"
            >
              Favorites
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/about")}
              className="hover:underline bg-transparent text-white border-none cursor-pointer"
            >
              About
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
