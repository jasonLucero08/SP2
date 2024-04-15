import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../api/user";

import app_logo from "../images/456_logo.png";
import Header from "../components/Header";

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState();

  const getUser = async () => {
    const user = await getCurrentUser(currentUser.uid);
    setCurrUser(user);
  };

  useEffect(() => {
    try {
      getUser();
    } catch (error) {}
  }, []);

  const handleSingleplayerBtnClick = () => {
    navigate("/singleplayermap");
  };

  const handleHeadOnBtnClick = () => {
    navigate("/headon");
  };

  const handleCustomizeBtnClick = () => {
    navigate("/customize");
  };

  const handleSettingsBtnClick = () => {
    navigate("/settings");
  };

  const handleLogOutBtnClick = () => {
    logOut();
    navigate("/");
  };

  return (
    <div class="h-screen w-screen flex flex-col place-items-center gap-11">
      <Header
        isHome={true}
        pageTitle="HOME"
        username={currUser && currUser.username}
      />

      <div class="flex place-content-center place-self-center">
        <img class="w-2/3" src={app_logo} alt="456! Logo" />
      </div>

      <div class="flex flex-col w-1/2 gap-4">
        <div class="flex flex-row gap-3">
          <button
            class="bg-blue-400 h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleSingleplayerBtnClick}
          >
            Singleplayer
          </button>
          <button
            class="bg-blue-400 h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleHeadOnBtnClick}
          >
            Head On
          </button>
        </div>

        <div class="flex flex-row gap-3">
          <button
            class="bg-blue-400 h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleCustomizeBtnClick}
          >
            Customize
          </button>
          <button
            class="bg-blue-400 h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleSettingsBtnClick}
          >
            Settings
          </button>
          <button
            class="bg-blue-400 h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleLogOutBtnClick}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
