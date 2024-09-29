import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Search from "./Components/Search/Search";
import SearchResults from "./Components/Search/SearchResults";
import Footer from "./Components/Footer/Footer";
import InteractionBox from "./Components/Interaction/InteractionBox";
import { InteractionProvider, userInteraction } from "./context/InteractionContext";

function App() {
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const []

  return (
  
  );
}

export default App;
