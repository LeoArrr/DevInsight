import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./output.css";

// components
import Header from "./Components/Header/Header";
import InteractionBox from "./Components/Interaction/InteractionBox";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Favorite from "./Components/Favorite/Favorite";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";

// custom hook for global notification
import {
  InteractionProvider,
  useInteraction,
} from "./Components/Context/InteractionContext";
import Messages from "./Components/Interaction/Messages";

function App() {
  const [userInput, setUserInput] = useState("");
  const { updateMessage } = useInteraction();
  const [results, setResults] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const useDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Message for theme change
    const message = newDarkMode ? Messages.darkMode : Messages.lightMode;
    updateMessage(message);
  };

  useEffect(() => {
    const appRoot = document.getElementById("root");
    if (appRoot) {
      if (darkMode) {
        appRoot.classList.add("dark");
      } else {
        appRoot.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <Router>
      <div
        id="root"
        className={`DevApp ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <Header />
        <InteractionBox />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer useDarkMode={useDarkMode} darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
