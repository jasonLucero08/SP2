import React, { useDebugValue, useEffect, useState } from "react";
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

  const [loggedIn, setLoggedIn] = useState(null);

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
  const handleStatsBtnClick = () => {};

  const handleSettingsBtnClick = () => {
    navigate("/settings");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogOutBtnClick = async (e) => {
    e.preventDefault();
    await signOut();
    window.location.reload();
  };

  return (
    <div className="h-screen w-screen flex flex-row place-items-center place-content-center bg-stone-bg bg-cover">
      {infoIncomplete && (
        <div className="h-screen w-screen flex absolute place-content-center place-items-center">
          <div className="h-screen w-screen bg-black opacity-50"></div>
          <div className="flex flex-col absolute h-1/2 w-2/5 bg-white rounded-s-xl p-5 place-content-center text-center gap-3">
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
      {/* <Header
        isHome={true}
        pageTitle="HOME"
        username={!infoIncomplete && username}
        profilePicture={characterImg}
      /> */}

      <div className="flex flex-col grow place-items-center place-content-center w-4/6">
        <div className="flex absolute bg-slate-700 w-2/4 h-full z-0 rounded-t-full overflow-hidden"></div>
        <div className="flex flex-col place-content-center place-items-center gap-5">
          <img className="w-3/5 z-10" src={app_logo} alt="456! Logo" />
          <div className="flex w-3/5 text-center text-white font-bold text-lg z-10">
            Welcome to 456! An application to test your wits regarding Discrete
            Mathematics in Computer Science. Come and test your knowledge now!
          </div>
        </div>
      </div>

      <>
        <div className="flex flex-col gap-4 w-2/6 h-full overflow-hidden">
          {session ? (
            <div className="flex pt-10 pb-10 gap-5 w-full place-content-end place-items-center">
              <button
                className="flex flex-row place-items-center gap-5 bg-orange-400 text-white p-3 rounded"
                onClick={() => handleProfileClick()}
              >
                <img
                  src={characterImg}
                  alt="Profile"
                  className="w-20 fill-white rounded-full"
                />
                <span className="text-2xl font-bold">{username}</span>
              </button>
              <button
                className="flex bg-white font-bold text-xl rounded-s-xl p-3 w-1/3 place-content-center"
                onClick={handleLogOutBtnClick}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex pt-10 pb-10 gap-5 w-full place-content-center place-items-center">
              <button
                className="flex flex-row place-items-center place-self-center gap-5 bg-slate-500 p-5 rounded-md text-white"
                onClick={() => navigate("/login")}
              >
                {/* <img
              src={characterImg}
              alt="Profile"
              className="w-20 fill-white rounded-full"
            /> */}
                <span className="text-2xl font-bold">Login to Play!</span>
              </button>
            </div>
          )}

          <button
            className="flex shadow-inner bg-red-500 w-2/6 text-white font-bold text-xl rounded-s-xl p-7 place-items-center place-self-end hover:w-full"
            onClick={handleSingleplayerBtnClick}
          >
            Singleplayer
          </button>
          <button
            className="flex shadow-inner bg-blue-500 w-3/6 text-white font-bold text-xl rounded-s-xl p-7 place-items-center place-self-end hover:w-full"
            onClick={handleHeadOnBtnClick}
          >
            Head On
          </button>

          <button
            className="flex shadow-inner bg-white w-4/6 font-bold text-xl rounded-s-xl p-7 place-items-center place-self-end hover:w-full"
            onClick={handleCustomizeBtnClick}
          >
            Customize
          </button>
          <button
            className="flex shadow-inner bg-white w-5/6 font-bold text-xl rounded-s-xl p-7 place-items-center place-self-end hover:w-full"
            onClick={handleStatsBtnClick}
          >
            Stats
          </button>
          <button
            className="flex bg-white font-bold text-xl rounded-s-xl p-7 place-items-center"
            onClick={handleSettingsBtnClick}
          >
            Settings
          </button>
        </div>
      </>
    </div>
  );
}
