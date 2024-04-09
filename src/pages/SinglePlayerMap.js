import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../api/user";

export default function SinglePlayerMap() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState();

  const getUser = async () => {
    const user = await getCurrentUser(currentUser.uid);
    setCurrUser(user);
  };

  useEffect(() => {
    try {
      getUser();
    } catch (error) {}
  }, []);

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
    <div class="h-screen w-screen bg-violet-200">
      <Header
        pageTitle="Level Selection"
        username={currUser && currUser.username}
      />

      <div>
        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl1Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl2Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl3Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl4Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl5Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl6Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl7Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl8Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl9Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl10Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl11Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl12Click}
        ></div>

        <div
          class="bg-black w-10 h-10 rounded-3xl"
          onClick={handleLvl13Click}
        ></div>
      </div>
    </div>
  );
}
