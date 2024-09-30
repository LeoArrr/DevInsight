import React, { createContext, useContext, useState } from "react";
import Messages from "../Interaction/Messages";

const InteractionContext = createContext();

// Wrap around parts of the app that need access to notifications
export const InteractionProvider = ({ children }) => {
  const [message, setMessage] = useState(""); // Storing a single message

  // Function to update the message
  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  };

  // Remove the message
  const removeMessage = () => {
    setMessage(""); // Reset to an empty string
  };

  // The values provided by the context
  return (
    <InteractionContext.Provider
      value={{ message, updateMessage, removeMessage }}
    >
      {children}
    </InteractionContext.Provider>
  );
};

// Custom hook to use the interaction context in other components
export const useInteraction = () => useContext(InteractionContext);
