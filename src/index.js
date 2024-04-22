import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/Auth";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
