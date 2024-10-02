import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <ul>
          <li onClick={() => navigate("/search")}>Search</li>
          <li onClick={() => navigate("/favorite")}>Favorites</li>
          <li onClick={() => navigate("/about")}>About</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
