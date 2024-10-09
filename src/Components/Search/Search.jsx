import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useFavorites } from "../Favorites/FavoriteContext";
import { FaGithub } from "react-icons/fa";

const Search = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [data, setData] = useState(1); // Track pagination
  const [perPage, setPerPage] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const fetchRepos = async (username, page, perPage) => {
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`
    );

    if (!repoResponse.ok) {
      throw new Error("Repositories Not Found");
    }

    const repoData = await repoResponse.json();
    if (repoData.length === 0) {
      throw new Error("No more repositories found");
    }

    return repoData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData(1); // Reset to the first page

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userResponse.ok) {
        throw new Error("User Not Found");
      }

      const userData = await userResponse.json();
      setProfile(userData);
      setError(null);

      const repos = await fetchRepos(username, 1, perPage);
      setRepositories(repos);

      // Save data to local storage
      localStorage.setItem(
        "searchData",
        JSON.stringify({ username, profile: userData, repositories: repos })
      );
    } catch (error) {
      setError(error.message);
      setProfile(null);
      setRepositories([]);
    }
  };

  useEffect(() => {
    const savedSearchData = localStorage.getItem("searchData");
    if (savedSearchData) {
      const { username, profile, repositories } = JSON.parse(savedSearchData);
      setUsername(username);
      setProfile(profile);
      setRepositories(repositories);
    }
  }, []);

  const loadMoreRepositories = async () => {
    try {
      setLoadingMore(true); // Set loading state
      const nextData = data + 1;

      const moreRepos = await fetchRepos(username, nextData, perPage);
      setRepositories((prevRepos) => [...prevRepos, ...moreRepos]);
      setData(nextData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingMore(false); // Reset loading state
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
    <div className="main-container-search">
      <h1 className="main-heading-search">DevInsight</h1>

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
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="github-icon"
                >
                  <FaGithub className="github-icon-search" />
                </a>
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
