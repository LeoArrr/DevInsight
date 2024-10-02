import React from "react";
import { useFavorites } from "./FavoriteContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Access favorites

  return (
    <div className="mt-8">
      <h3 className="main-heading">Favorites:</h3>
      {favorites.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {favorites.map((fav) => (
            <li key={fav.id} className="profile-container">
              <a
                href={fav.html_url}
                target="_blank"
                rel="noreferrer"
                className="profile-name"
              >
                {fav.name}{" "}
              </a>
              <button
                onClick={() => removeFavorite(fav)}
                className="text-red-500 remove-button"
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
