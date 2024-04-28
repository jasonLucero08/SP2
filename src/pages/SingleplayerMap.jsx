import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Getters";

import Header from "../components/Header";
import LevelCard from "../components/LevelCard";

export default function SinglePlayerMap() {
  const navigate = useNavigate();

  const { session } = useAuth();

  const [userName, setUsername] = useState(null);

  useEffect(() => {
    getUserInfo(session?.user.id).then(function (res) {
      setUsername(res?.username);
    });
  }, []);

  const handleLvlClick = (num) => {
    navigate("/singleplayer-level", { state: { num: num } });
  };

  return (
    <div className="flex h-screen w-screen bg-slate-900 place-content-center place-items-center">
      <Header pageTitle="Level Selection" username={userName} />

      <div className="flex w-screen gap-5 overflow-x-scroll no-scrollbar p-10">
        <LevelCard
          onClick={() => handleLvlClick(1)}
          levelNum="Level One"
          levelName="Propositional Logic - Basic Terms and Concepts"
        />

        <LevelCard
          onClick={() => handleLvlClick(2)}
          levelNum="Level Two"
          levelName="Propositional Logic - Rules of Inference and Laws of Equivalence"
        />

        <LevelCard
          onClick={() => handleLvlClick(3)}
          levelNum="Level Three"
          levelName="Propositional Logic - Methods of Proof I"
        />

        <LevelCard
          onClick={() => handleLvlClick(4)}
          levelNum="Level Four"
          levelName="Propositional Logic - Methods of Proof II"
        />

        <LevelCard
          onClick={() => handleLvlClick(5)}
          levelNum="Level Five"
          levelName="Predicate Logic - Basic Terms and Concepts"
        />

        <LevelCard
          onClick={() => handleLvlClick(6)}
          levelNum="Level Six"
          levelName="Proving Predicate Logic"
        />

        <LevelCard
          onClick={() => handleLvlClick(7)}
          levelNum="Level Seven"
          levelName="Set Theory"
        />

        <LevelCard
          onClick={() => handleLvlClick(8)}
          levelNum="Level Eight"
          levelName="Proving Sets"
        />

        <LevelCard
          onClick={() => handleLvlClick(9)}
          levelNum="Level Nine"
          levelName="Relations"
        />

        <LevelCard
          onClick={() => handleLvlClick(10)}
          levelNum="Level Ten"
          levelName="Functions, Mathematical Induction and Pigeonhole Principle"
        />

        <LevelCard
          onClick={() => handleLvlClick(11)}
          levelNum="Level Eleven"
          levelName="Boolean Algebra"
        />

        <LevelCard
          onClick={() => handleLvlClick(12)}
          levelNum="Level Twelve"
          levelName="Matrices"
        />

        <LevelCard
          onClick={() => handleLvlClick(13)}
          levelNum="Level Thirteen"
          levelName="Linear Systems"
        />
      </div>
    </div>
  );
}
