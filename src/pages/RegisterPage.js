import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../api/auth";
import { useAuth } from "../context/AuthContext";

import left_arrow from "../images/left_arrow.png";
import app_logo from "../images/456_logo.png";

import InputField from "../components/InputField";

export default function RegisterPage() {
  const navigate = useNavigate();
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const { userLoggedIn } = useAuth();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState();

  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    if (!isEmail) {
      alert("Please provide a valid email.");
    } else {
      if (!isRegistering) {
        try {
          setIsRegistering(true);
          await registerWithEmailAndPassword(
            fullName,
            username,
            email,
            password
          );
        } catch (err) {
          console.log(err);
          alert(err.message);
          setButtonDisabled(false);
        }
      }
      // registerWithEmailAndPassword(
      //   fullName,
      //   username,
      //   email,
      //   password,
      //   setButtonDisabled
      // );
    }
  };

  const handleBackButton = () => {
    navigate({ pathname: "/" });
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
        <div class="flex flex-col bg-white place-content-center place-self-center h-3/4 w-4/5 rounded-xl p-10">
          <div class="flex m-5">
            <button onClick={handleBackButton} class="w-4 bg-transparent">
              <img src={left_arrow} alt="Back Button" />
            </button>
            <h1 class="flex grow place-content-center font-bold text-3xl">
              REGISTER
            </h1>
          </div>

          <form
            class="flex flex-col m-5 gap-3"
            onSubmit={handleRegisterBtnClick}
          >
            <InputField
              type={"text"}
              label={"Full Name"}
              onChange={(e) => setFullName(e.target.value)}
            />

            <InputField
              type={"text"}
              label={"Username"}
              onChange={(e) => setUsername(e.target.value)}
            />

            <InputField
              type={"email"}
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
              class="bg-red-300 font-bold p-1 rounded"
              disabled={buttonDisabled}
            >
              REGISTER
            </button>
          </form>

          <span class="flex m-5">
            Already have an account?{"  "}
            <Link
              to="/login"
              class="underline text-blue-500 hover:no-underline focus:outline"
            >
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
