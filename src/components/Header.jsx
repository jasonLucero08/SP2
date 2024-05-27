import React from "react";
import user_profile from "../images/user_profile.png";
import home from "../images/home.png";
import { useNavigate } from "react-router-dom";

import { initializeSocket } from "../initSocket";

export default function Header({
  isHome,
  pageTitle,
  username,
  profilePicture,
  disconnectSocket,
  actualSocket,
}) {
  const socket = initializeSocket();
  const navigate = useNavigate();

  const handleHomeBtnClick = () => {
    if (socket) {
      socket.emit("clearUserList");
    }
    navigate({ pathname: "/" });
  };

  return (
    <div className="flex absolute top-0 p-4 w-screen place-content-center place-items-center bg-sky-900 z-20">
      {!isHome && (
        <div className="flex absolute left-5">
          <button onClick={handleHomeBtnClick}>
            <img src={home} alt="home" className="w-8" />
          </button>
        </div>
      )}

      {disconnectSocket && actualSocket && (
        <button
          className="text-white"
          onClick={() => {
            actualSocket.disconnect();
          }}
        >
          X
        </button>
      )}

      <div className="flex place-content-center font-bold text-xl text-white">
        <span>{pageTitle}</span>
      </div>

      <div className="flex absolute right-5 place-items-center gap-2 text-white">
        <span>{username}</span>

        <button>
          <img
            src={profilePicture}
            alt="Profile"
            className="w-9 fill-white rounded-full"
          />
        </button>
      </div>
    </div>
  );
}
