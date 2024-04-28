import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getQuestionsPerLevel } from "../hooks/Getters";
import { supabase } from "../supabaseClient";

import Header from "../components/Header";

export default function Level() {
  const location = useLocation();

  const { user, session } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [levelData, setLevelData] = useState([]);

  const levelid = "L" + location.state.num;

  const getPageTitle = () => {
    switch (location.state.num) {
      case 1:
        setPageTitle("Level One");
        break;
      case 2:
        setPageTitle("Level Two");
        break;
      case 3:
        setPageTitle("Level Three");
        break;
      case 4:
        setPageTitle("Level Four");
        break;
      case 5:
        setPageTitle("Level Five");
        break;
      case 6:
        setPageTitle("Level Six");
        break;
      case 7:
        setPageTitle("Level Seven");
        break;
      case 8:
        setPageTitle("Level Eight");
        break;
      case 9:
        setPageTitle("Level Nine");
        break;
      case 10:
        setPageTitle("Level Ten");
        break;
      case 11:
        setPageTitle("Level Eleven");
        break;
      case 12:
        setPageTitle("Level Twelve");
        break;
      case 13:
        setPageTitle("Level Thirteen");
        break;
      default:
        setPageTitle(" ");
        break;
    }
  };

  const setGame = (data) => {
    console.log(data);
  };

  useEffect(() => {
    getPageTitle();

    getUserInfo(user.id).then(function (res) {
      setUserInfo(res);
      setUsername(res?.username);
    });

    getQuestionsPerLevel(levelid).then(function (res) {
      setLevelData(res);
      setGame(res);
    });
  }, []);

  return (
    <div className="w-screen h-screen place-content-end bg-slate-900">
      <Header pageTitle={pageTitle} username={username} />

      <div className="flex flex-col place-items-center w-screen h-2/3 ">
        <div className="bg-white w-screen h-1/4 mb-4">
          {/* <span>{currQuestion}</span> */}
        </div>
        <div className="flex relative flex-row  h-2/3 w-screen">
          <div className="relative bg-orange-300 w-64 h-full left-40"></div>
          <div className="absolute bg-yellow-300 w-64 h-full inset-y-0 right-40"></div>
        </div>
      </div>

      <div className="flex flex-row  h-1/4 w-screen place-content-center">
        <button
          className="bg-white w-1/4 h-30 rounded-xl m-3"
          // value={button1Val}
          // onClick={() => handleChoiceClick(button1Val)}
        >
          {/* <span>{button1Txt}</span> */}
        </button>
        <button
          className="bg-white w-1/4 h-30 rounded-xl m-3"
          // value={button2Val}
          // onClick={() => handleChoiceClick(button2Val)}
        >
          {/* <span>{button2Txt}</span> */}
        </button>
        <button
          className="bg-white w-1/4 h-30 rounded-xl m-3"
          // value={button3Val}
          // onClick={() => handleChoiceClick(button3Val)}
        >
          {/* <span>{button3Txt}</span> */}
        </button>
        <button
          className="bg-white w-1/4 h-30 rounded-xl m-3"
          // value={button4Val}
          // onClick={() => handleChoiceClick(button4Val)}
        >
          {/* <span>{button4Txt}</span> */}
        </button>
      </div>
    </div>
  );
}
