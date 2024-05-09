import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo, getQuestionsPerLevel } from "../hooks/Hooks";
import { useImmerReducer } from "use-immer";

import Header from "../components/Header";
import LevelCard from "../components/LevelCard";

export default function SinglePlayerMap() {
  const navigate = useNavigate();

  const { session } = useAuth();

  const [userName, setUsername] = useState(null);
  const [cards, setCards] = useState([]);

  const [characterImg, setCharacterImg] = useState(null);

  const setLevels = (userData) => {
    const data = userData.levelsUnlocked;
    Object.keys(data).forEach(function (key) {
      var card = document.getElementById(key);
      if (data[key] === null) {
        card.disabled = true;
        card.classList.add("bg-gray-500");
      } else {
        card.stars = userData.levelStars[key];
        card.classList.add("bg-orange-300");
      }
    });
  };

  useEffect(() => {
    async function get() {
      try {
        const userData = await getUserInfo(session?.user.id);
        setUsername(userData.username);
        setCharacterImg(userData.selectedImgUrl);
        setLevels(userData);
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }

    get();
  }, []);

  const handleLvlClick = (num) => {
    navigate("/singleplayer-level", { state: { num: num } });
  };

  return (
    <div className="flex h-screen w-screen bg-slate-900 place-content-center place-items-center">
      <Header
        pageTitle="Level Selection"
        username={userName}
        profilePicture={characterImg}
      />

      <div className="flex w-screen gap-5 overflow-x-scroll no-scrollbar p-10">
        <LevelCard
          id="L1"
          onClick={() => handleLvlClick(1)}
          levelNum="Level One"
          levelName="Propositional Logic - Basic Terms and Concepts"
          stars={0}
        />

        <LevelCard
          id="L2"
          onClick={() => handleLvlClick(2)}
          levelNum="Level Two"
          levelName="Propositional Logic - Rules of Inference and Laws of Equivalence"
          stars={0}
        />

        <LevelCard
          id="L3"
          onClick={() => handleLvlClick(3)}
          levelNum="Level Three"
          levelName="Propositional Logic - Methods of Proof I"
          stars={0}
        />

        <LevelCard
          id="L4"
          onClick={() => handleLvlClick(4)}
          levelNum="Level Four"
          levelName="Propositional Logic - Methods of Proof II"
          stars={0}
        />

        <LevelCard
          id="L5"
          onClick={() => handleLvlClick(5)}
          levelNum="Level Five"
          levelName="Predicate Logic - Basic Terms and Concepts"
          stars={0}
        />

        <LevelCard
          id="L6"
          onClick={() => handleLvlClick(6)}
          levelNum="Level Six"
          levelName="Proving Predicate Logic"
          stars={0}
        />

        <LevelCard
          id="L7"
          onClick={() => handleLvlClick(7)}
          levelNum="Level Seven"
          levelName="Set Theory"
          stars={0}
        />

        <LevelCard
          id="L8"
          onClick={() => handleLvlClick(8)}
          levelNum="Level Eight"
          levelName="Proving Sets"
          stars={0}
        />

        <LevelCard
          id="L9"
          onClick={() => handleLvlClick(9)}
          levelNum="Level Nine"
          levelName="Relations"
          stars={0}
        />

        <LevelCard
          id="L10"
          onClick={() => handleLvlClick(10)}
          levelNum="Level Ten"
          levelName="Functions, Mathematical Induction and Pigeonhole Principle"
          stars={0}
        />

        <LevelCard
          id="L11"
          onClick={() => handleLvlClick(11)}
          levelNum="Level Eleven"
          levelName="Boolean Algebra"
          stars={0}
        />

        <LevelCard
          id="L12"
          onClick={() => handleLvlClick(12)}
          levelNum="Level Twelve"
          levelName="Matrices"
          stars={0}
        />

        <LevelCard
          id="L13"
          onClick={() => handleLvlClick(13)}
          levelNum="Level Thirteen"
          levelName="Linear Systems"
          stars={0}
        />
      </div>
    </div>
  );
}
