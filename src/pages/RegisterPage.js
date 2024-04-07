import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import left_arrow from "../images/left_arrow.png";
import app_logo from "../images/456_logo.png";
import { db } from "../firebase_setup/firebase";
import { getDocs, addDoc, collection, where, query } from "firebase/firestore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dbref = collection(db, "Users");

  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();

    if (!isEmail(email)) {
      alert("Incorrect Email");
    } else {
      const matchedUsername = query(dbref, where("Username", "==", username));
      const matchedEmail = query(dbref, where("Email", "==", email));
      try {
        const snapshotUsername = await getDocs(matchedUsername);
        const matchedUsernameArray = snapshotUsername.docs.map((doc) =>
          doc.data()
        );

        const snapshotEmail = await getDocs(matchedEmail);
        const matchedEmailArray = snapshotEmail.docs.map((doc) => doc.data());

        if (matchedUsernameArray.length > 0) {
          alert("This username already exists.");
        } else if (matchedEmailArray.length > 0) {
          alert("This email already exists.");
        } else {
          await addDoc(dbref, {
            FullName: fullName,
            Username: username,
            Email: email,
            Password: password,
          });

          alert("Registration successful. Welcome!");

          navigate({ pathname: "/home" });
          window.location.reload();
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleBackButton = () => {
    navigate({ pathname: "/" });
    window.location.reload();
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
        <div class="flex bg-white place-content-center place-items-center place-self-center h-3/4 w-4/5 rounded-xl">
          <div class="flex flex-col place-self-center place-content-center h-5/6 w-4/5">
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
              <div class="relative">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  type="text"
                  placeholder=""
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Full Name
                </label>
              </div>

              <div class="relative">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  type="text"
                  placeholder=""
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Username
                </label>
              </div>

              <div class="relative">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  type="email"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Email
                </label>
              </div>

              <div class="relative">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  type="password"
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Password
                </label>
              </div>

              <button type="submit" class="bg-red-300 font-bold p-1 rounded">
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
    </div>
  );
}
