import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { supabase } from "../client";

import app_logo from "../images/456_logo.png";

import LandingLogo from "../components/LandingLogo";
import InputField from "../components/InputField";

export default function CreateUsername() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const { session, signOut } = useAuth();

  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("profile")
      .update({ fullname: fullName, username: username })
      .eq("id", session?.user.id);

    if (error) {
      console.log(error.message);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="h-screen flex bg-slate-900">
      <LandingLogo />

      <div className="flex grow">
        <div className="flex flex-col bg-white place-content-center place-self-center h-1/2 w-4/5 rounded-xl p-10">
          <div className="flex flex-col m-5 gap-2">
            <span className="flex grow place-content-center font-bold text-3xl">
              SET YOUR NAME
            </span>

            <span className="text-sm text-center">
              Welcome, new user! Register your name and unique username first.
            </span>
          </div>

          <form
            className="flex flex-col m-5 gap-5"
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

            <button
              type="submit"
              className="bg-red-500 font-bold p-1 rounded text-white"
              // disabled={loading}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
