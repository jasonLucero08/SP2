import "./css/App.css";
import Landing from "./pages/Landing";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SinglePlayerMap from "./pages/SinglePlayerMap";
import Level from "./pages/Level";
import HeadOnLobby from "./pages/HeadOnLobby";
import CustomizeScreen from "./pages/CustomizeScreen";
import SettingsScreen from "./pages/SettingsScreen";
import { Routes, Route } from "react-router-dom";
import CreateUsername from "./pages/CreateUsername";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create-username" element={<CreateUsername />} />
        {/* <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/singleplayermap" element={<SinglePlayerMap />} />
        <Route path="/singleplayer-levelone" element={<Level />} />
        <Route path="/headon" element={<HeadOnLobby />} />
        <Route path="/customize" element={<CustomizeScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        {/* <Route path="/profile" element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default App;
