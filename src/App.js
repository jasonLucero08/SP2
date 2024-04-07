import "./css/App.css";
import Landing from "./pages/Landing";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SinglePlayerMap from "./pages/SinglePlayerMap";
import LevelOne from "./pages/LevelOne";
import HeadOn from "./pages/HeadOn";
import CustomizeScreen from "./pages/CustomizeScreen";
import SettingsScreen from "./pages/SettingsScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div class="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/singleplayermap" element={<SinglePlayerMap />} />
          <Route path="/singleplayer-levelone" element={<LevelOne />} />
          <Route path="/headon" element={<HeadOn />} />
          <Route path="/customize" element={<CustomizeScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          {/* <Route path="/profile" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
