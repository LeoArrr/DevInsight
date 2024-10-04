import React from "react";
import { useFavorites } from "./FavoriteContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Access favorites

  return (
    <div className="favorites-container">
      <h3 className="favorites-heading">Favorites:</h3>
      {favorites.length > 0 ? (
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
                &times; {/* X Icon */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-favorites">No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
