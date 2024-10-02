import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./Components/Favorites/FavoriteContext";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import About from "./Components/About/About";
import Favorite from "./Components/Favorites/Favorites";

function App() {
  return (
    <FavoritesProvider>
      {" "}
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
