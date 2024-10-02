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
              <a
                href={fav.html_url}
                target="_blank"
                rel="noreferrer"
                className="favorites-link"
              >
                {fav.name}
              </a>
              <button
                onClick={() => removeFavorite(fav)}
                className="favorites-remove-btn"
              >
                Remove from Favorites
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
