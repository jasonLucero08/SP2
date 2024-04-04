import React from "react";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleRegisterBtnClick = () => {
    navigate({ pathname: "/register" });
  };

  const handleLoginBtnClick = () => {
    navigate({ pathname: "/login" });
  };

  return (
    <div class="h-screen grid grid-cols-2 bg-green-200">
      <div class="grid grid-rows-5 grid-cols-10">
        <div class="grid place-items-center row-start-3 col-start-2 col-span-9 bg-white bg-opacity-50">
          <span>456!</span>
        </div>
      </div>

      <div class="grid grid-rows-6 grid-cols-6 gap-4">
        <button
          onClick={handleRegisterBtnClick}
          class="bg-blue-300 row-start-3 col-start-2 col-span-4 w-45"
        >
          Register
        </button>

        <button
          onClick={handleLoginBtnClick}
          class="bg-orange-400 row-start-4 col-start-2 col-span-4"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
