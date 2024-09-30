import React from "react";

const Messages = {
  darkMode:
    "You just activated dark mode! The app now uses a dark color scheme by applying the 'dark' class to the root element. Here's the code behind it:\n\n" +
    "document.getElementById('root').classList.add('dark');",
  lightMode:
    "You just activated light mode! The app has reverted to a light color scheme by removing the 'dark' class from the root element. Here's how it's done:\n\n" +
    "document.getElementById('root').classList.remove('dark');",
  stateChangeBtn:
    "By clicking the toggle button, you triggered a state change in the app. This is how you manage component states in React:\n\n" +
    "setDarkMode(prevMode => !prevMode);",
};

export default Messages;
