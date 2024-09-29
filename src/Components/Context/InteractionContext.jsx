import React, { useContext, createContext, useState } from "react";

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  const [message, setMessage] = useState([]);

  const updateMessage = (message) => {
    setMessage((prevMessage) => [...prevMessage, message]);
  };

  const removeMessage = () => {
    setMessage((prevMessage) => prevMessage.slice(1));
  };

  return (
    <InteractionMessage.Provider
      value={{ message, updateMessage, removeMessage }}
    >
      {children}
    </InteractionMessage.Provider>
  );
};
export const userInteraction = () => useContext(InteractionContext);
//new function scope because you want to call useContext everytime when userInteraction is triggered
