import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import left_arrow from "../images/left_arrow.png";
import app_logo from "../images/456_logo.png";
import { db } from "../firebase_setup/firebase";
import { getDocs, collection, where, query } from "firebase/firestore";

export default function LoginPage() {
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const dbref = collection(db, "Users");

  const handleBackButton = () => {
    navigate({ pathname: "/" });
    window.location.reload();
  };

  const handleLoginBtnClick = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    const matchedUsername = query(
      dbref,
      where("Username", "==", usernameOrEmail)
    );
    const matchedEmail = query(dbref, where("Email", "==", usernameOrEmail));
    const matchedPassword = query(dbref, where("Password", "==", password));

    try {
      const snapshotUsername = await getDocs(matchedUsername);
      const matchedUsernameArray = snapshotUsername.docs.map((doc) =>
        doc.data()
      );

      const snapshotEmail = await getDocs(matchedEmail);
      const matchedEmailArray = snapshotEmail.docs.map((doc) => doc.data());

      const snapshotPassword = await getDocs(matchedPassword);
      const matchedPasswordArray = snapshotPassword.docs.map((doc) =>
        doc.data()
      );

      if (
        (matchedUsernameArray.length > 0 || matchedEmailArray.length > 0) &&
        matchedPasswordArray.length > 0
      ) {
        alert("Login successful");
        navigate({ pathname: "/home" });
        window.location.reload();
      } else {
        alert("Username/Email and Password do not match. Try again.");
      }
    } catch (error) {
      alert(error);
    }
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

      <div class="flex grow">
        <div class="flex bg-white place-content-center place-items-center place-self-center h-3/5 w-4/5 rounded-xl">
          <div class="flex flex-col place-self-center place-content-center h-5/6 w-5/6">
            <div class="flex m-5">
              <button onClick={handleBackButton} class="w-4 bg-transparent">
                <img src={left_arrow} alt="Back Button" />
              </button>
              <h1 class="flex grow place-content-center font-bold text-3xl">
                LOG IN
              </h1>
            </div>

            <form
              class="flex flex-col m-5 gap-3"
              onSubmit={handleLoginBtnClick}
            >
              <div class="relative">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  type="text"
                  placeholder=""
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Email/Username
                </label>
              </div>

              <div class="relative">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  type="password"
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Password
                </label>
              </div>

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
    </div>
  );
}
