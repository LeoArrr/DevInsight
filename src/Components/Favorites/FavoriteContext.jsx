import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for the favorites
const FavoriteContext = createContext();

// Custom hook to use the FavoritesContext
export const useFavorites = () => {
  return useContext(FavoriteContext);
};

// Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (repo) => {
    setFavorites((prevFavorites) => [...prevFavorites, repo]);
  };

  const removeFavorite = (repo) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== repo.id)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
