import React from "react";
import user_profile from "../images/user_profile.png";
import home from "../images/home.png";
import { useNavigate } from "react-router-dom";

import { initializeSocket } from "../initSocket";

import left_arrow from "../images/left_arrow.png";
import mid_banner from "../images/mid-banner.png";
import right_banner from "../images/right-banner.png";

export default function Header({
  isProfile,
  pageTitle,
  username,
  profilePicture,
  actualSocket,
  isLevel,
}) {
  // const socket = initializeSocket();
  const navigate = useNavigate();

  const handleHomeBtnClick = () => {
    if (actualSocket) {
      actualSocket.emit("clearUserList");
      actualSocket.disconnect();
    }
    navigate({ pathname: "/" });
  };

  const handleBackBtnClick = () => {
    navigate("/singleplayermap");
  };

  return (
    <div className="flex relative w-screen h-min z-20 bg-stone-bg bg-cover place-items-center">
      <div className="flex h-3/4">
        {/* //   <div className="flex relative px-5 py-6 gap-5 place-items-center"> */}

        <div className="flex relative place-items-center p-7 gap-5 bg-white rounded-e-xl">
          {/* <img src={left_banner} className="flex absolute left-0 w-full h-16" /> */}
          {!isLevel ? (
            <img
              src={home}
              alt="home"
              className="w-8 z-10 cursor-pointer"
              onClick={handleHomeBtnClick}
            />
          ) : (
            <img
              src={left_arrow}
              alt="home"
              className="w-6 z-10 cursor-pointer"
              onClick={handleBackBtnClick}
            />
          )}
          <span className="z-10 font-bold text-xl">{pageTitle}</span>
        </div>
      </div>

      {/* <div className="flex bg-green-300 h-full">
        <div className="flex relative font-bold text-xl w-fit">
          <img src={mid_banner} className="flex absolute w-full" />
          
        </div>
      </div> */}

      {!isProfile && (
        // <div className="flex absolute right-0 h-3/4 hover:w-1/3 bg-purple-600 rounded-s-xl">
        <button
          className="flex absolute right-0 h-3/4 bg-amber-600 rounded-s-xl place-content-center place-items-center gap-4 p-7 w-1/6 hover:w-1/3 transition-all"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <span className="z-10 text-xl text-white font-bold">{username}</span>
          <img
            src={profilePicture}
            alt="Profile"
            className="w-9 fill-white rounded-full z-10 "
          />
        </button>
        // </div>
      )}
    </div>
  );
}
