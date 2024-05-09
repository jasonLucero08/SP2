import React from "react";
import user_profile from "../images/user_profile.png";
import home from "../images/home.png";
import { useNavigate } from "react-router-dom";

export default function Header({
  isHome,
  pageTitle,
  username,
  profilePicture,
}) {
  const navigate = useNavigate();

  const handleHomeBtnClick = () => {
    navigate({ pathname: "/home" });
  };

  return (
    <div className="flex absolute top-0 p-4 w-screen place-content-center place-items-center bg-indigo-950 z-20">
      {!isHome && (
        <div className="flex absolute left-5">
          <button onClick={handleHomeBtnClick}>
            <img src={home} alt="home" className="w-8" />
          </button>
        </div>
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
