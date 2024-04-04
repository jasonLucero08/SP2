import React from "react";
import { Link, useNavigate } from "react-router-dom";
import left_arrow from "../images/left_arrow.png";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate({ pathname: "/" });
  };
  return (
    <div class="h-screen grid grid-cols-2 bg-green-200">
      <div class="grid grid-rows-5 grid-cols-10">
        <div class="grid place-items-center row-start-3 col-start-2 col-span-9 bg-white bg-opacity-50">
          <span>456!</span>
        </div>
      </div>

      <div class="grid grid-rows-10 grid-cols-10 gap-4">
        <div class="grid grid-rows-12 grid-cols-12 row-start-2 row-span-8 col-start-3 col-span-6 bg-white">
          <div class="flex-col justify-center row-start-2 row-span-10 col-start-2 col-span-10 bg-gray-200">
            <div class="flex justify-center">
              <button onClick={handleBackButton} class="w-5 bg-white">
                <img src={left_arrow} alt="Back Button" />
              </button>
              <h1 class="">Register</h1>
            </div>

            <div class="grid justify-self-center content-center">
              <div class="flex justify-center">
                <input type="text" placeholder="Full Name"></input>
              </div>

              <div class="flex justify-center">
                <input type="text" placeholder="Username"></input>
              </div>

              <div class="flex justify-center">
                <input type="text" placeholder="Email"></input>
              </div>

              <div class="flex justify-center">
                <input type="text" placeholder="Password"></input>
              </div>

              <button>Register</button>

              <span>
                Already have an account? <Link to="/login">Log In</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
