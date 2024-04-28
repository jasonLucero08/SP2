import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Getters";
import { supabase } from "../supabaseClient";

import app_logo from "../images/456_logo.png";
import Header from "../components/Header";
import InputField from "../components/InputField";

export default function Home() {
  const navigate = useNavigate();

  const { user, session, signOut } = useAuth();

  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [infoIncomplete, setInfoIncomplete] = useState(false);

  useEffect(() => {
    try {
      getUserInfo(session?.user.id).then(function (res) {
        if (res?.username === null || res?.fullname === null) {
          setInfoIncomplete(true);
        } else {
          setUsername(res?.username);
        }
      });
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }, [username]);

  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("profile")
      .update({ fullname: fullname, username: username })
      .eq("id", session?.user.id);

    if (error) {
      console.log(error.message);
    }

    setInfoIncomplete(false);
    window.location.reload();
  };

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
      {infoIncomplete && (
        <div className="h-screen w-screen flex absolute place-content-center place-items-center">
          <div className="h-screen w-screen bg-black opacity-50"></div>
          <div className="absolute h-1/2 w-2/5 bg-white self-center rounded-xl p-5 place-content-center text-center">
            <span className="flex grow place-content-center font-bold text-3xl">
              SET YOUR NAME
            </span>
            <span className="text-sm">
              Welcome, new user! Register your name and unique username first.
            </span>

            <form
              className="flex flex-col m-5 gap-5"
              onSubmit={handleRegisterBtnClick}
            >
              <InputField
                type={"text"}
                label={"Full Name"}
                onChange={(e) => setFullname(e.target.value)}
              />

              <InputField
                type={"text"}
                label={"Username"}
                onChange={(e) => setUsername(e.target.value)}
              />

              <button
                type="submit"
                className="bg-red-500 font-bold p-1 rounded text-white"
                // disabled={loading}
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      )}
      <Header
        isHome={true}
        pageTitle="HOME"
        username={!infoIncomplete && username}
      />

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
