import React from "react";
import { useFavorites } from "./FavoriteContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Access favorites and function to remove from context

  // if empty, display early message
  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <p className="no-favorites">No favorites added yet.</p>
      </div>
    );
  }

  // if list in array, return
  return (
    <div className="favorites-container">
      <ul className="favorites-list">
        {favorites.map((fav) => (
          <li key={fav.id} className="favorites-item">
            <div className="repo-info">
              <h4 className="repo-name">
                <a href={fav.html_url} target="_blank" rel="noreferrer">
                  {fav.name}
                </a>
              </h4>
              <p className="repo-description">
                {fav.description || "No description available."}
              </p>
              <p className="repo-stats">
                ⭐ {fav.stars} | 🍴 {fav.forks} | 🗓️{" "}
                {new Date(fav.updated_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => removeFavorite(fav)}
              className="favorites-remove-btn"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
