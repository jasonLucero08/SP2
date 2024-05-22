import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Hooks";
import { supabase } from "../supabaseClient";

import app_logo from "../images/456_logo.png";
import Header from "../components/Header";
import InputField from "../components/InputField";

export default function Home() {
  const navigate = useNavigate();

  const { session, signOut } = useAuth();

  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [infoIncomplete, setInfoIncomplete] = useState(false);
  const [usernameError, setUsernameError] = useState(null);

  const [characterImg, setCharacterImg] = useState(null);

  useEffect(() => {
    try {
      getUserInfo(session?.user.id).then(function (res) {
        if (res?.username === null || res?.fullname === null) {
          setInfoIncomplete(true);
        } else {
          setUsername(res?.username);
          setCharacterImg(res?.selectedImgUrl);
        }
      });
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }, [username]);

  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();

    const { data, error1 } = await supabase
      .from("profile")
      .select("username")
      .eq("username", username);

    if (error1) {
      console.log(error1.message);
    }

    if (data.length > 0) {
      console.log(data);
      setUsernameError("Username is already taken. Please enter a new one.");
    } else {
      const { error2 } = await supabase
        .from("profile")
        .update({ fullname: fullname, username: username })
        .eq("id", session?.user.id);

      if (error2) {
        console.log(error2.message);
      }

      setInfoIncomplete(false);
      window.location.reload();
    }
  };

  const handleSingleplayerBtnClick = () => {
    navigate("/singleplayermap");
  };

  const handleHeadOnBtnClick = () => {
    navigate("/head-on-lobby");
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
          <div className="flex flex-col absolute h-1/2 w-2/5 bg-white rounded-xl p-5 place-content-center text-center gap-3">
            <span className="relative font-bold text-3xl">SET YOUR NAME</span>
            <span className="relative text-sm">
              Welcome, new user! Register your name and unique username first.
            </span>

            {usernameError && (
              <div className="relative bg-red-200 text-sm text-left mx-5 pl-3 p-2 rounded text-red-900">
                Error: {usernameError}
              </div>
            )}

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
                onChange={(e) => {
                  setUsernameError(null);
                  setUsername(e.target.value);
                }}
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
        profilePicture={characterImg}
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
