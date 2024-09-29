import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

// components
import Header from "./Components/Header/Header";
import InteractionBox from "./Components/Interaction/InteractionBox";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import SearchResults from "./Components/Search/SearchResults";
import Favorite from "./Components/Favorite/Favorite";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";

// custom hook for global notification
import { InteractionProvider, useInteraction } from "./Components/Context/InteractionContext";


/* layout:

App
│
├── BrowserRouter
│   ├── Header          -- Always visible
│   ├── InteractionBox  -- Always visible
│   ├── main
│   │   └── Routes
│   │       ├── Home    -- Rendered based on route
│   │       ├── Search  -- Rendered based on route
│   │       ├── Favorites -- Rendered based on route
│   │       └── About   -- Rendered based on route
│   └── Footer          -- Always visible
*/

function App() {
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [favorite, setFavorite] =  useState([]);

  return (
  <InteractionProvider>
    <Router>
      <div className="DevApp">
{<Header/>}
{<nteractionBox/>}
<main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/favorite" element={<Favorite/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
        </main>
        {<Footer/>}
      </div>
    </Router>
  </InteractionProvider>
  );
}

export default App;
