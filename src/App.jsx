import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./Components/Favorites/FavoriteContext";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Favorite from "./Components/Favorites/Favorites";
import Footer from "./Components/Footer/foter";

function App() {
  return (
    <FavoritesProvider>
      {" "}
      <Router>
        <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </main>
        <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
