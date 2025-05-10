import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AudioProvider } from "./context/AudioContext.jsx";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AudioProvider>
      <App />
    </AudioProvider>
  </BrowserRouter>
);
