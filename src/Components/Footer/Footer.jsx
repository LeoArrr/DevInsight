import React from "react";

const Footer = ({ useDarkMode, darkMode }) => {
  return (
    <footer className="p-4">
      <button onClick={useDarkMode} className="p-2">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </footer>
  );
};

export default Footer;
