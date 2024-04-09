import React from "react";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app_logo from "../images/456_logo.png";

export default function Landing() {
  const navigate = useNavigate();

  const handleRegisterBtnClick = () => {
    navigate({ pathname: "/register" });
  };

  const handleLoginBtnClick = () => {
    navigate({ pathname: "/login" });
  };

  return (
    <div class="h-screen flex bg-violet-200">
      <div class="flex w-3/5 place-content-center place-items-center">
        <div class="relative w-3/4 text-center">
          <img class="" src={app_logo} alt="456! Logo" />

          <span class="">
            This is a description of this application. Battle your way to the
            top using your wits and eme eme. Please sana matapos ko to
            huhuhuhuhh
          </span>
        </div>
      </div>

      <div class="flex flex-col grow place-self-center gap-5">
        <button
          onClick={handleRegisterBtnClick}
          class="bg-red-300 h-20 w-5/6 font-bold text-xl rounded-xl"
        >
          REGISTER
        </button>

        <button
          onClick={handleLoginBtnClick}
          class="bg-blue-400 h-20 w-5/6 font-bold text-xl rounded-xl"
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}
