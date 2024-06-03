import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Hooks";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient";

import app_logo from "../images/456_logo.png";
import log_out from "../images/log-out.png";
import single_player from "../images/single-player.png";
import head_on from "../images/head-on.png";
import shop from "../images/shop.png";
import stats from "../images/stats.png";
import settings from "../images/settings.png";
import white from "../images/white-banner.png";
import red from "../images/red-banner.png";
import orange from "../images/orange-banner.png";
import purple from "../images/purple-banner.png";
import green from "../images/green-banner.png";
import deleteQ from "../images/delete.png";
import addQ from "../images/addQ.png";
import editQ from "../images/editQ.png";
import brown from "../images/brown-banner.png";

import Header from "../components/Header";
import InputField from "../components/InputField";

export default function Home() {
  const navigate = useNavigate();

  const { profile, session, signOut } = useAuth();

  const [loggedIn, setLoggedIn] = useState(null);

  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [infoIncomplete, setInfoIncomplete] = useState(false);
  const [usernameError, setUsernameError] = useState(null);

  const [characterImg, setCharacterImg] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
    if (profile) {
      navigate("/singleplayermap");
    } else {
      alert("Login to play!");
    }
  };

  const handleHeadOnBtnClick = () => {
    if (profile) {
      navigate("/head-on-lobby");
    } else {
      alert("Login to play!");
    }
  };

  const handleShopBtnClick = () => {
    if (profile) {
      navigate("/shop");
    } else {
      alert("Login to play!");
    }
  };

  const handleStatsBtnClick = () => {
    if (profile) {
      navigate("/stats");
    } else {
      alert("Login to play!");
    }
  };

  const handleSettingsBtnClick = () => {
    if (profile) {
      navigate("/settings");
    } else {
      alert("Login to play!");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAddQClick = () => {
    navigate("/admin-add-question");
  };

  const handleModifyQClick = () => {
    navigate("/admin-modify-question");
  };

  const handleDeleteQClick = () => {
    navigate("/admin-delete-question");
  };

  const handleLogOutBtnClick = async (e) => {
    e.preventDefault();
    setIsAdmin(false);
    signOut();
  };

  useEffect(() => {
    // getUser();
    if (profile) {
      if (profile.username === null || profile.fullname === null) {
        setInfoIncomplete(true);
      } else if (
        profile.username === "admin-456" ||
        profile.fullname === "admin-456"
      ) {
        setUsername(profile.username);
        setIsAdmin(true);
      } else {
        setUsername(profile.username);
        setCharacterImg(profile.selectedImgUrl);
      }
    }
  }, [profile]);

  return (
    <div className="h-screen w-screen flex flex-row place-items-center place-content-center bg-stone-bg bg-cover">
      {infoIncomplete && (
        <div className="h-screen w-screen flex absolute place-content-center place-items-center">
          <div className="h-screen w-screen bg-black opacity-50 z-20"></div>
          <div className="flex flex-col absolute h-1/2 w-2/5 bg-white rounded-xl p-5 place-content-center text-center gap-3 z-20">
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
        {/* <div className="flex absolute bg-slate-700 w-2/4 h-full z-0 rounded-t-full overflow-hidden"></div> */}
        <div className="flex flex-col place-content-center place-items-center gap-5">
          <img className="w-3/5 z-10" src={app_logo} alt="456! Logo" />
          <div className="flex px-20 text-center text-white font-bold text-xl z-10">
            Welcome to 456! An application to test your wits regarding Discrete
            Mathematics in Computer Science. Come and test your knowledge now!
          </div>
        </div>
      </div>

      <>
        <div className="flex flex-col gap-4 w-2/6 h-full overflow-hidden place-content-center">
          {profile ? (
            <div className="flex w-full place-self-end gap-5 place-items-center">
              <button
                className="group flex relative place-items-center w-full place-content-center gap-5 px-24 py-5 hover:px-26 transition-all"
                onClick={() => {
                  !isAdmin && handleProfileClick();
                }}
              >
                <img
                  src={white}
                  className="flex absolute w-full h-full left-0 z-0"
                />
                <span className="flex text-3xl font-bold group-hover:text-4xl transition-all z-10">
                  {username}
                </span>
                {characterImg && (
                  <img
                    src={characterImg}
                    alt="Profile"
                    className="flex w-10 fill-white rounded-full group-hover:w-14 transition-all z-10"
                  />
                )}
              </button>
            </div>
          ) : (
            <div className="flex relative gap-5 w-full place-items-center">
              {/* <div className="flex font-bold  px-5 py-2 place-content-center place-items-center"> */}
              <div className="flex w-full flex-row text-2xl font-bold z-10 px-10 py-2 gap-5 place-items-center">
                <span className="flex grow">Log in to play:</span>
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  theme="dark"
                  providers={["google"]}
                  onlyThirdPartyProviders
                />
              </div>
              <img src={white} className="flex absolute w-full left-0 z-0" />
              {/* </div> */}
            </div>
          )}

          {isAdmin ? (
            <>
              <button
                className="group flex relative gap-5 w-5/6 text-white font-bold text-xl rounded-s-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:py-7 transition-all cursor-pointer"
                onClick={() => handleAddQClick()}
              >
                <img
                  src={green}
                  className="flex absolute w-full h-full left-0"
                />
                <img
                  src={addQ}
                  className="w-7 group-hover:w-10 transition-all z-10"
                />
                <span className="text-xl group-hover:text-2xl transition-all z-10">
                  Add Question
                </span>
              </button>

              <button
                className="group flex relative gap-5 w-5/6 text-white font-bold text-xl rounded-s-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:py-7 transition-all cursor-pointer"
                onClick={handleModifyQClick}
              >
                <img
                  src={orange}
                  className="flex absolute w-full h-full left-0"
                />
                <img
                  src={editQ}
                  className="w-7 group-hover:w-10 transition-all z-10"
                />
                <span className="text-xl group-hover:text-2xl transition-all z-10">
                  Modify Question
                </span>
              </button>

              <button
                className="group flex relative gap-5 w-5/6 text-white font-bold text-xl rounded-s-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:px-14 hover:py-8 transition-all cursor-pointer"
                onClick={handleDeleteQClick}
              >
                <img src={red} className="flex absolute w-full h-full left-0" />
                <img
                  src={deleteQ}
                  className="w-7 group-hover:w-10 transition-all z-10"
                />
                <span className="text-xl group-hover:text-2xl transition-all z-10">
                  Delete Question
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                className="group flex relative gap-5 w-5/6 text-white font-bold text-xl rounded-s-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:px-14 hover:py-8 transition-all"
                onClick={handleSingleplayerBtnClick}
              >
                <img
                  src={green}
                  className="flex absolute w-full h-full left-0"
                />
                <img
                  src={single_player}
                  className="w-7 group-hover:w-10 transition-all z-10"
                />
                <span className="text-xl group-hover:text-2xl transition-all z-10">
                  Singleplayer
                </span>
              </button>
              <button
                className="group flex relative gap-5 w-5/6 text-white font-bold text-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:px-14 hover:py-8 transition-all"
                onClick={handleHeadOnBtnClick}
              >
                <img
                  src={purple}
                  className="flex absolute w-full h-full left-0"
                />
                <img
                  src={head_on}
                  className="w-7 group-hover:w-10 transition-all z-10"
                />
                <span className="text-xl group-hover:text-2xl transition-all z-10">
                  Head On
                </span>
              </button>

              <button
                className="group flex relative gap-5 w-5/6 text-white font-bold text-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:px-14 hover:py-8 transition-all"
                onClick={handleShopBtnClick}
              >
                <img
                  src={orange}
                  className="flex absolute w-full h-full left-0"
                />
                <img
                  src={shop}
                  className="w-7 group-hover:w-10 transition-all z-10"
                />
                <span className=" text-white text-xl group-hover:text-2xl transition-all z-10">
                  Shop
                </span>
              </button>
              <button
                className="group flex relative gap-5 w-5/6 text-white font-bold text-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:px-14 hover:py-8 transition-all"
                onClick={handleStatsBtnClick}
              >
                <img src={red} className="flex absolute w-full h-full left-0" />
                <img
                  src={stats}
                  className="w-7 group-hover:w-10 transition-all z-10"
                />
                <span className="text-white text-xl group-hover:text-2xl transition-all z-10">
                  Leaderboard
                </span>
              </button>
            </>
          )}
          {/* <button
            className="group flex relative gap-5 w-4/6 font-bold text-xl px-10 py-3 place-items-center place-self-end hover:w-full hover:py-7 transition-all"
            onClick={handleSettingsBtnClick}
          >
            <img src={white} className="flex absolute w-full h-full left-0" />
            <img
              src={settings}
              className="w-7 group-hover:w-10 transition-all z-10"
            />
            <span className="text-xl group-hover:text-2xl transition-all z-10">
              Settings
            </span>
          </button> */}
          {profile && (
            <button
              className="group flex relative gap-5 w-5/6 font-bold text-xl px-10 py-5 place-items-center place-self-end hover:w-full hover:px-14 hover:py-8 transition-all"
              onClick={handleLogOutBtnClick}
            >
              <img src={white} className="flex absolute w-full h-full left-0" />
              <img src={log_out} className="flex w-8 z-10" />
              <span className="text-xl group-hover:text-2xl transition-all z-10">
                Log Out
              </span>
            </button>
          )}
        </div>
      </>
    </div>
  );
}
