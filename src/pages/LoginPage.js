import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "../api/auth";
import { useAuth } from "../context/AuthContext";

import left_arrow from "../images/left_arrow.png";
import app_logo from "../images/456_logo.png";

import InputField from "../components/InputField";

export default function LoginPage() {
  const navigate = useNavigate();

  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleBackButton = () => {
    navigate({ pathname: "/" });
  };

  const handleLoginBtnClick = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        await logInWithEmailAndPassword(email, password);
      } catch (err) {
        console.log(err);
        alert(err.message);
        setButtonDisabled(false);
      }
    }

    // logInWithEmailAndPassword(email, password, setButtonDisabled);
  };

  useEffect(() => {}, []);

  return (
    <div class="h-screen flex bg-violet-200">
      {userLoggedIn && navigate("/home")}
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

      <div class="flex grow">
        <div class="flex flex-col bg-white place-content-center place-self-center h-3/5 w-4/5 rounded-xl p-10">
          <div class="flex m-5">
            <button onClick={handleBackButton} class="w-4 bg-transparent">
              <img src={left_arrow} alt="Back Button" />
            </button>
            <h1 class="flex grow place-content-center font-bold text-3xl">
              LOG IN
            </h1>
          </div>

          <form class="flex flex-col m-5 gap-3" onSubmit={handleLoginBtnClick}>
            <InputField
              type={"text"}
              label={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              type={"password"}
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              class="bg-blue-300 font-bold p-1 rounded"
              disabled={buttonDisabled}
            >
              LOG IN
            </button>

            <span class="flex m-5">
              Don't have an account?{" "}
              <Link
                to="/register"
                class="underline text-blue-500 hover:no-underline focus:outline"
              >
                Register
              </Link>{" "}
              first.
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
