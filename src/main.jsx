import React from "react";
import ReactDOM from "react-dom/client";
import AudioProvider from "./context/AudioContext.jsx";
import FavoriteProvider from "./context/FavoriteContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AudioProvider>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </AudioProvider>
);
