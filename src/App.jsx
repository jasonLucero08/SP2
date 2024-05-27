import "./css/App.css";

import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import SinglePlayerMap from "./pages/SingleplayerMap";
import Level from "./pages/Level";
import Customize from "./pages/Customize";
import Admin from "./pages/Admin";
import HeadOnLobby from "./pages/HeadOnLobby";
import HeadOnGame from "./pages/HeadOnGame";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/singleplayermap" element={<SinglePlayerMap />} />
        <Route path="/singleplayer-level" element={<Level />} />
        <Route path="/head-on-lobby" element={<HeadOnLobby />} />
        <Route path="/room/:roomId" element={<HeadOnGame />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
