import "./css/App.css";

import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import SinglePlayerMap from "./pages/SingleplayerMap";
import Level from "./pages/Level";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/singleplayermap" element={<SinglePlayerMap />} />
        <Route path="/singleplayer-level" element={<Level />} />
      </Routes>
    </div>
  );
}

export default App;
