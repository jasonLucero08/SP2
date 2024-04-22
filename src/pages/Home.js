import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Getters";

import app_logo from "../images/456_logo.png";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();

  const { user, session, signOut } = useAuth();

  const [userName, setUsername] = useState(null);

  useEffect(() => {
    getUserInfo(session?.user.id).then(function (res) {
      setUsername(res?.username);
    });
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

  const handleLogOutBtnClick = async (e) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <div className="h-screen w-screen flex flex-col place-items-center place-content-center gap-11 bg-slate-900">
      <Header isHome={true} pageTitle="HOME" username={userName} />

      <div className="flex place-content-center place-self-center">
        <img className="w-2/3" src={app_logo} alt="456! Logo" />
      </div>

      <div className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-row gap-3">
          <button
            className="bg-red-500 text-white h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleSingleplayerBtnClick}
          >
            Singleplayer
          </button>
          <button
            className="bg-blue-500 text-white h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleHeadOnBtnClick}
          >
            Head On
          </button>
        </div>

        <div className="flex flex-row gap-3">
          <button
            className="bg-white h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleCustomizeBtnClick}
          >
            Customize
          </button>
          <button
            className="bg-white h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleSettingsBtnClick}
          >
            Settings
          </button>
          <button
            className="bg-white h-20 w-5/6 font-bold text-xl rounded-xl"
            onClick={handleLogOutBtnClick}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
