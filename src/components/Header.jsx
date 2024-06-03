import React from "react";
import { useNavigate } from "react-router-dom";

import home from "../images/home.png";
import left_arrow from "../images/left_arrow.png";
import home_w from "../images/home_white.png";
import arrow_w from "../images/arrow_white.png";

export default function Header({
  isProfile,
  pageTitle,
  username,
  profilePicture,
  actualSocket,
  isLevel,
  titleColor,
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
        <div
          className={`flex relative place-items-center p-7 gap-5 ${titleColor} rounded-e-xl outline outline-amber-950 outline-2`}
        >
          {!isLevel ? (
            <div>
              {titleColor === "bg-[rgba(250,229,187,255)]" ? (
                <div className="flex flex-row gap-5 place-items-center place-content-center">
                  <img
                    src={home}
                    alt="home"
                    className="w-8 z-10 cursor-pointer"
                    onClick={handleHomeBtnClick}
                  />
                  <span className="z-30 text-3xl text-amber-950">
                    {pageTitle}
                  </span>
                </div>
              ) : (
                <div className="flex flex-row gap-5 place-items-center place-content-center">
                  <img
                    src={home_w}
                    alt="home"
                    className="w-8 z-10 cursor-pointer"
                    onClick={handleHomeBtnClick}
                  />
                  <span className="z-30 text-3xl text-white">{pageTitle}</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              {titleColor === "bg-[rgba(250,229,187,255)]" ? (
                <div className="flex flex-row gap-5 place-items-center place-content-center">
                  <img
                    src={left_arrow}
                    alt="home"
                    className="w-6 z-10 cursor-pointer"
                    onClick={handleBackBtnClick}
                  />
                  <span className="z-30 text-3xl text-amber-950">
                    {pageTitle}
                  </span>
                </div>
              ) : (
                <div className="flex flex-row gap-5 place-items-center place-content-center">
                  <img
                    src={arrow_w}
                    alt="home"
                    className="w-6 z-10 cursor-pointer"
                    onClick={handleBackBtnClick}
                  />
                  <span className="z-30 text-3xl text-white">{pageTitle}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!isProfile && (
        <button
          className="flex absolute right-0 h-3/4 bg-[rgba(250,229,187,255)] rounded-s-xl outline outline-amber-950 outline-2 place-content-center place-items-center gap-4 p-7 w-1/6 hover:w-1/3 transition-all"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <span className="z-10 text-xl text-amber-950">{username}</span>
          <img
            src={profilePicture}
            alt="Profile"
            className="w-9 fill-white rounded-full z-10 "
          />
        </button>
      )}
    </div>
  );
}
