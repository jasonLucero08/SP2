import React from "react";
import app_logo from "../images/456_logo.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSingleplayerBtnClick = () => {
    navigate({ pathname: "/singleplayer" });
    window.location.reload();
  };

  const handleHeadOnBtnClick = () => {
    navigate({ pathname: "/headon" });
    window.location.reload();
  };

  const handleCustomizeBtnClick = () => {
    navigate({ pathname: "/customize" });
    window.location.reload();
  };

  const handleSettingsBtnClick = () => {
    navigate({ pathname: "/settings" });
    window.location.reload();
  };

  const handleLogOutBtnClick = () => {
    navigate({ pathname: "/" });
    window.location.reload();
  };
  return (
    <div class="h-screen w-screen flex flex-col place-items-center bg-violet-200">
      <div class="sticky top-0">
        <span>Username</span>
        <img alt="Profile Picture" />
      </div>

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
