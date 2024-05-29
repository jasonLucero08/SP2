import React from "react";
import user_profile from "../images/user_profile.png";
import home from "../images/home.png";
import { useNavigate } from "react-router-dom";

import { initializeSocket } from "../initSocket";

import left_banner from "../images/left-banner.png";
import mid_banner from "../images/mid-banner.png";
import right_banner from "../images/right-banner.png";

export default function Header({
  isHome,
  isProfile,
  pageTitle,
  username,
  profilePicture,
  actualSocket,
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

  return (
    <div className="flex py-5 w-screen z-20 bg-stone-bg bg-cover place-items-center">
      {!isHome && (
        // <div className="flex absolute left-0">
        //   <div className="flex relative px-5 py-6 gap-5 place-items-center">

        <div className="flex relative place-items-center px-5 gap-5">
          <img src={left_banner} className="flex absolute left-0 w-full h-16" />
          <img
            src={home}
            alt="home"
            className="w-8 z-10 cursor-pointer"
            onClick={handleHomeBtnClick}
          />
          <span className="z-10 font-bold text-xl">{pageTitle}</span>
        </div>

        //   </div>
        // </div>
      )}

      {/* <div className="flex bg-green-300 h-full">
        <div className="flex relative font-bold text-xl w-fit">
          <img src={mid_banner} className="flex absolute w-full" />
          
        </div>
      </div> */}

      {!isProfile && (
        <div className="flex absolute right-0">
          <button
            className="flex relative place-items-center gap-4 p-10"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img
              src={right_banner}
              className="flex absolute right-0 w-full h-16"
            />
            <span className="z-10 text-xl">{username}</span>
            <img
              src={profilePicture}
              alt="Profile"
              className="w-9 fill-white rounded-full z-10 "
            />
          </button>
        </div>
      )}
    </div>
  );
}
