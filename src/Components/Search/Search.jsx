import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiBuildingsFill } from "react-icons/pi";
import { useFavorites } from "../Favorites/FavoriteContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch profile data
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) {
        throw new Error("User Not Found");
      }
      const userData = await userResponse.json();
      setProfile(userData);
      setError(null);

      // Fetch repository
      const repoResponse = await fetch(
        `https://api.github.com/search/repositories?q=user:${username}`
      );
      if (!repoResponse.ok) {
        throw new Error("Repositories Not Found");
      }
      const repoData = await repoResponse.json();
      setRepositories(repoData.items);
    } catch (error) {
      setProfile(null);
      setRepositories([]);
      setError(error.message);
    }
  };

  const handleFavorites = (repo) => {
    const isFavorite = favorites.find((fav) => fav.id === repo.id);
    if (isFavorite) {
      removeFavorite(repo);
    } else {
      addFavorite(repo);
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">DevInsight</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub Username..."
          value={username}
          className="search-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {profile && (
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-img">
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="profile-avatar"
              />
            </div>
            <div className="profile-details">
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-created">
                Joined: {new Date(profile.created_at).toLocaleDateString()}
              </p>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="profile-username"
              >
                @{profile.login}
              </a>
              <p className="profile-bio">{profile.bio}</p>

              <div className="profile-stats">
                <div>
                  <p>Repositories</p>
                  <p className="stats">{profile.public_repos}</p>
                </div>
                <div>
                  <p>Followers</p>
                  <p className="stats">{profile.followers}</p>
                </div>
                <div>
                  <p>Following</p>
                  <p className="stats">{profile.following}</p>
                </div>
              </div>

              <div className="profile-info">
                {profile.location && (
                  <p className="profile-location">
                    <FaMapMarkerAlt /> {profile.location}
                  </p>
                )}
                {profile.company && (
                  <p className="profile-company">
                    <PiBuildingsFill /> {profile.company}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Repositories Section */}
          {repositories.length > 0 && (
            <div>
              <h3>Repositories:</h3>
              <ul className="repo-list">
                {repositories.map((repo) => (
                  <li key={repo.id} className="repo-item">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="repo-name"
                    >
                      {repo.name}
                    </a>
                    <p className="repo-description">{repo.description}</p>
                    <button
                      onClick={() => handleFavorites(repo)}
                      className="repo-favorite-btn"
                    >
                      {favorites.find((fav) => fav.id === repo.id)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </button>
                    <hr className="repo-separator" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
