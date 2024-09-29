import React, { createContext, useContext, useState } from "react";

// Create the context
const InteractionContext = createContext();

// Provider component to wrap around parts of the app that need access to notifications
export const InteractionProvider = ({ children }) => {
  const [message, setMessage] = useState(""); // Storing a single message (string)

  // Function to update the message
  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  };

  // Function to remove the message (or clear it)
  const removeMessage = () => {
    setMessage(""); // Reset message to an empty string
  };

  // The values provided by the context
  return (
    <InteractionContext.Provider value={{ message, updateMessage, removeMessage }}>
      {children}
    </InteractionContext.Provider>
  );
};

// Custom hook to use the interaction context in other components
export const useInteraction = () => useContext(InteractionContext);
