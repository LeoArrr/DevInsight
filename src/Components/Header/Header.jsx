import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); //check for component

  const isSearchPage = location.pathname === "/search";
  const isFavoritePage = location.pathname === "/favorite";
  const isHomePage = location.pathname === "/";

  const border = isSearchPage || isFavoritePage ? "nav-border" : "";

  return (
    <header className={border}>
      {" "}
      <nav>
        <ul>
          {!isSearchPage && !isHomePage && (
            <li onClick={() => navigate("/search")}>Search</li>
          )}

          {!isFavoritePage && !isHomePage && (
            <li onClick={() => navigate("/favorite")}>Favorites</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
