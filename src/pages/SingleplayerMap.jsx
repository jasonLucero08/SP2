import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getQuestionsPerLevel } from "../hooks/Hooks";
import { useImmerReducer } from "use-immer";

import Header from "../components/Header";
import LevelCard from "../components/LevelCard";
import gray_card from "../images/gray-levelCard.png";
import blue_card from "../images/blue-levelCard.png";
import home_w from "../images/home_white.png";

export default function SinglePlayerMap() {
  const navigate = useNavigate();

  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUsername] = useState(null);
  const [cards, setCards] = useState([]);

  const [characterImg, setCharacterImg] = useState(null);

  const setLevels = (userData) => {
    const data = userData.levelsUnlocked;
    Object.keys(data).forEach(function (key) {
      var card = document.getElementById(key);
      let imgId = key + "-img";
      var cardImg = document.getElementById(imgId);
      if (data[key] === null) {
        card.disabled = true;
        cardImg.src = gray_card;
      } else {
        // card.stars = userData.levelStars[key];
        // card.classList.add("bg-orange-300");
        cardImg.src = blue_card;
      }
    });
  };

  const getStars = (id) => {
    const data = profile.levelStars[id];
    return data;
  };

  useEffect(() => {
    if (profile) {
      setUserInfo(profile);
      setUsername(profile.username);
      setCharacterImg(profile.selectedImgUrl);
      setLevels(profile);
      // console.log(profile.levelStars["L2"]);
    }
  }, []);

  const handleLvlClick = (num) => {
    navigate("/singleplayer-level", { state: { num: num } });
  };

  const handleHomeBtnClick = () => {
    navigate({ pathname: "/" });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-stone-bg bg-cover place-content-center place-items-center">
      {/* <Header
        pageTitle="Level Selection"
        username={userName}
        profilePicture={characterImg}
        titleColor={"bg-emerald-700"}
      /> */}
      {/* Start of Header */}
      <div className="flex relative w-screen h-min z-20 bg-stone-bg bg-cover place-items-center">
        <div className="flex h-3/4">
          <div className="flex relative place-items-center p-7 gap-5 bg-emerald-700 rounded-e-xl outline outline-yellow-300 outline-2">
            <div className="flex flex-row gap-5 place-items-center place-content-center">
              <img
                src={home_w}
                alt="home"
                className="w-8 z-10 cursor-pointer"
                onClick={handleHomeBtnClick}
              />
              <span className="z-30 text-3xl text-white">Level Selection</span>
            </div>
          </div>
        </div>

        <button
          className="flex absolute right-0 h-3/4 bg-[rgba(250,229,187,255)] rounded-s-xl outline outline-amber-950 outline-2 place-content-center place-items-center gap-4 p-7 w-1/6 hover:w-1/3 transition-all"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <span className="z-10 text-xl text-amber-950">{userName}</span>
          <img
            src={characterImg}
            alt="Profile"
            className="w-9 fill-white rounded-full z-10 "
          />
        </button>
      </div>
      {/* End of Header */}

      <div className="grid grid-cols-4 place-items-center w-screen h-screen gap-10 overflow-y-scroll no-scrollbar px-10 ">
        <LevelCard
          id="L1"
          imageId="L1-img"
          onClick={() => handleLvlClick(1)}
          levelNum="Level One"
          levelName="Propositional Logic - Basic Terms and Concepts"
          stars={getStars("L1")}
        />

        <LevelCard
          id="L2"
          imageId="L2-img"
          onClick={() => handleLvlClick(2)}
          levelNum="Level Two"
          levelName="Propositional Logic - Rules of Inference and Laws of Equivalence"
          stars={getStars("L2")}
          // stars={0}
        />

        <LevelCard
          id="L3"
          imageId="L3-img"
          onClick={() => handleLvlClick(3)}
          levelNum="Level Three"
          levelName="Propositional Logic - Methods of Proof I"
          stars={getStars("L3")}
          // stars={0}
        />

        <LevelCard
          id="L4"
          imageId="L4-img"
          onClick={() => handleLvlClick(4)}
          levelNum="Level Four"
          levelName="Propositional Logic - Methods of Proof II"
          stars={getStars("L4")}
          // stars={0}
        />

        <LevelCard
          id="L5"
          imageId="L5-img"
          onClick={() => handleLvlClick(5)}
          levelNum="Level Five"
          levelName="Predicate Logic - Basic Terms and Concepts"
          stars={getStars("L5")}
          // stars={0}
        />

        <LevelCard
          id="L6"
          imageId="L6-img"
          onClick={() => handleLvlClick(6)}
          levelNum="Level Six"
          levelName="Proving Predicate Logic"
          stars={getStars("L6")}
          // stars={0}
        />

        <LevelCard
          id="L7"
          imageId="L7-img"
          onClick={() => handleLvlClick(7)}
          levelNum="Level Seven"
          levelName="Set Theory"
          stars={getStars("L7")}
          // stars={0}
        />

        <LevelCard
          id="L8"
          imageId="L8-img"
          onClick={() => handleLvlClick(8)}
          levelNum="Level Eight"
          levelName="Proving Sets"
          stars={getStars("L8")}
          // stars={0}
        />

        <LevelCard
          id="L9"
          imageId="L9-img"
          onClick={() => handleLvlClick(9)}
          levelNum="Level Nine"
          levelName="Relations"
          stars={getStars("L9")}
          // stars={0}
        />

        <LevelCard
          id="L10"
          imageId="L10-img"
          onClick={() => handleLvlClick(10)}
          levelNum="Level Ten"
          levelName="Functions, Mathematical Induction and Pigeonhole Principle"
          stars={getStars("L10")}
          // stars={0}
        />

        <LevelCard
          id="L11"
          imageId="L11-img"
          onClick={() => handleLvlClick(11)}
          levelNum="Level Eleven"
          levelName="Boolean Algebra"
          stars={getStars("L11")}
          // stars={0}
        />

        <LevelCard
          id="L12"
          imageId="L12-img"
          onClick={() => handleLvlClick(12)}
          levelNum="Level Twelve"
          levelName="Matrices"
          stars={getStars("L12")}
          // stars={0}
        />

        <LevelCard
          id="L13"
          imageId="L13-img"
          onClick={() => handleLvlClick(13)}
          levelNum="Level Thirteen"
          levelName="Linear Systems"
          stars={getStars("L13")}
          // stars={0}
        />
      </div>
    </div>
  );
}
