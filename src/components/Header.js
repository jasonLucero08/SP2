import React from "react";
import user_profile from "../images/user_profile.png";
import home from "../images/home.png";
import { useNavigate } from "react-router-dom";

export default function Header({ isHome, pageTitle, username }) {
  const navigate = useNavigate();

  const handleHomeBtnClick = () => {
    navigate({ pathname: "/home" });
  };

  return (
    <div class="flex p-4 w-screen place-content-center place-items-center bg-violet-200">
      {!isHome && (
        <div class="flex absolute left-5">
          <button onClick={handleHomeBtnClick}>
            <img src={home} alt="home" class="w-8" />
          </button>
        </div>
      )}

      <div class="flex place-content-center font-bold text-xl">
        <span>{pageTitle}</span>
      </div>

      <div class="flex absolute right-5 place-items-center gap-2">
        <span>{username}</span>

        <button>
          <img src={user_profile} alt="Profile" class="w-9" />
        </button>
      </div>
    </div>
  );
}
