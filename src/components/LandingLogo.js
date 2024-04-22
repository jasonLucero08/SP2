import React from "react";
import app_logo from "../images/456_logo.png";

export default function LandingLogo() {
  return (
    <div className="flex w-3/5 place-content-center place-items-center">
      <div className="relative w-3/4 text-center">
        <img className="" src={app_logo} alt="456! Logo" />

        <span className="text-white font-bold text-lg">
          Welcome to 456! An application to test your wits regarding Discrete
          Mathematics in Computer Science. Come and test your knowledge now!
        </span>
      </div>
    </div>
  );
}
