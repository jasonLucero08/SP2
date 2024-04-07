import React from "react";
import user_profile from "../images/user_profile.png";
import menu from "../images/menu.png";

export default function Header({ pageTitle, username }) {
  return (
    <div class="flex p-3 bg-gray-100 w-screen place-content-center place-items-center">
      <div class="flex">
        <button>
          <img src={menu} alt="Menu" class="w-10" />
        </button>
      </div>

      <div class="flex grow place-content-center font-bold text-xl">
        <span>{pageTitle}</span>
      </div>

      <div class="flex place-items-center gap-2">
        <span>{username}</span>

        <button>
          <img src={user_profile} alt="Profile Picture" class="w-9" />
        </button>
      </div>
    </div>
  );
}
