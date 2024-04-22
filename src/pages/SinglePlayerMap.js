import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

import LevelCard from "../components/LevelCard";

export default function SinglePlayerMap() {
  const navigate = useNavigate();

  const handleLvl1Click = () => {
    navigate("/singleplayer-levelone");
  };

  const handleLvl2Click = () => {
    navigate("/singleplayer-leveltwo");
  };

  const handleLvl3Click = () => {
    navigate("/singleplayer-levelthree");
  };

  const handleLvl4Click = () => {
    navigate("/singleplayer-levelfour");
  };

  const handleLvl5Click = () => {
    navigate("/singleplayer-levelfive");
  };

  const handleLvl6Click = () => {
    navigate("/singleplayer-levelsix");
  };

  const handleLvl7Click = () => {
    navigate("/singleplayer-levelseven");
  };

  const handleLvl8Click = () => {
    navigate("/singleplayer-leveleight");
  };

  const handleLvl9Click = () => {
    navigate("/singleplayer-levelnine");
  };

  const handleLvl10Click = () => {
    navigate("/singleplayer-levelten");
  };

  const handleLvl11Click = () => {
    navigate("/singleplayer-leveleleven");
  };

  const handleLvl12Click = () => {
    navigate("/singleplayer-leveltwelve");
  };

  const handleLvl13Click = () => {
    navigate("/singleplayer-levelthirteen");
  };

  return (
    <div className="flex h-screen w-screen bg-slate-900 place-content-center place-items-center">
      <Header pageTitle="Level Selection" username="machujason" />

      <div className="flex w-screen gap-5 overflow-x-scroll no-scrollbar p-10">
        <LevelCard
          onClick={handleLvl1Click}
          levelNum="Level One"
          levelName="Propositional Logic - Basic Terms and Concepts"
        />

        <LevelCard
          onClick={handleLvl2Click}
          levelNum="Level Two"
          levelName="Propositional Logic - Rules of Inference and Laws of Equivalence"
        />

        <LevelCard
          onClick={handleLvl3Click}
          levelNum="Level Three"
          levelName="Propositional Logic - Methods of Proof I"
        />

        <LevelCard
          onClick={handleLvl4Click}
          levelNum="Level Four"
          levelName="Propositional Logic - Methods of Proof II"
        />

        <LevelCard
          onClick={handleLvl5Click}
          levelNum="Level Five"
          levelName="Predicate Logic - Basic Terms and Concepts"
        />

        <LevelCard
          onClick={handleLvl6Click}
          levelNum="Level Six"
          levelName="Proving Predicate Logic"
        />

        <LevelCard
          onClick={handleLvl7Click}
          levelNum="Level Seven"
          levelName="Set Theory"
        />

        <LevelCard
          onClick={handleLvl8Click}
          levelNum="Level Eight"
          levelName="Proving Sets"
        />

        <LevelCard
          onClick={handleLvl9Click}
          levelNum="Level Nine"
          levelName="Relations"
        />

        <LevelCard
          onClick={handleLvl10Click}
          levelNum="Level Ten"
          levelName="Functions, Mathematical Induction and Pigeonhole Principle"
        />

        <LevelCard
          onClick={handleLvl11Click}
          levelNum="Level Eleven"
          levelName="Boolean Algebra"
        />

        <LevelCard
          onClick={handleLvl12Click}
          levelNum="Level Twelve"
          levelName="Matrices"
        />

        <LevelCard
          onClick={handleLvl13Click}
          levelNum="Level Thirteen"
          levelName="Linear Systems"
        />
      </div>
    </div>
  );
}
