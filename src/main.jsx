import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { InteractionProvider } from "./Components/Context/InteractionContext.jsx";

//provider covers the entire app
createRoot(document.getElementById("root")).render(
  <InteractionProvider>
    <App />
  </InteractionProvider>
);
