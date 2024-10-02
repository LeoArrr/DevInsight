import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <nav>
        <ul className="flex space-x-4">
          <li>
            onClick={() => navigate("/")}
            className="hover:underline bg-transparent text-white border-none
            cursor-pointer" ´
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
