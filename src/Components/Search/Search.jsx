import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiBuildingsFill } from "react-icons/pi";
import { useFavorites } from "../Favorites/FavoriteContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [displayedRepositories, setDisplayedRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const fetchRepositories = async (username, page, perPage) => {
    const repoResponse = await fetch(
      `https://api.github.com/search/repositories?q=user:${username}&page=${page}&per_page=${perPage}`
    );
    if (!repoResponse.ok) {
      throw new Error("Repositories Not Found");
    }
    const repoData = await repoResponse.json();
    return repoData.items;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);

    try {
      // If username is provided, fetch the user profile and their repositories
      if (username) {
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );

        if (!userResponse.ok) {
          throw new Error("User Not Found");
        }

        const userData = await userResponse.json();
        setProfile(userData);

        // Fetch repositories for the user
        const repoResponse = await fetch(
          `https://api.github.com/users/${username}/repos`
        );

        if (!repoResponse.ok) {
          throw new Error("Repositories Not Found");
        }

        const repoData = await repoResponse.json();
        setRepositories(repoData);
      }
      // If language is provided, fetch repositories by language
      else if (language) {
        const langRepoResponse = await fetch(
          `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
        );

        if (!langRepoResponse.ok) {
          throw new Error("Repositories Not Found");
        }

        const langRepoData = await langRepoResponse.json();
        setRepositories(langRepoData.items);
        setProfile(null); // Reset profile for language searches
      } else {
        setError("Please enter a GitHub username or a programming language.");
      }
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
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="per-page-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
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
              <h2 className="profile-name">
                {profile.name || "No name provided"}
              </h2>
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
              <p className="profile-bio">{profile.bio || "No bio available"}</p>

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
                {profile.location && profile.location.trim() !== "" && (
                  <p className="profile-location">
                    <FaMapMarkerAlt /> {profile.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {repositories.length > 0 && (
            <div>
              <h3>Repositories:</h3>
              <ul className="repo-list">
                {displayedRepositories.map((repo) => (
                  <li key={repo.id} className="repo-item">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="repo-name"
                    >
                      {repo.name}
                    </a>
                    <p className="repo-description">
                      {repo.description || "No description available"}
                    </p>
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

              <button
                onClick={loadMoreRepositories}
                disabled={loadingMore}
                className="load-more-btn"
              >
                {loadingMore ? <span>Loading...</span> : "Show More"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
