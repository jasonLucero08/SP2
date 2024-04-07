import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function SinglePlayerMap() {
  const navigate = useNavigate();

  const handleLvl1Click = () => {
    navigate({ pathname: "/singleplayer-levelone" });
    window.location.reload();
  };

  const handleLvl2Click = () => {
    navigate({ pathname: "/singleplayer-leveltwo" });
    window.location.reload();
  };

  const handleLvl3Click = () => {
    navigate({ pathname: "/singleplayer-levelthree" });
    window.location.reload();
  };

  const handleLvl4Click = () => {
    navigate({ pathname: "/singleplayer-levelfour" });
    window.location.reload();
  };

  const handleLvl5Click = () => {
    navigate({ pathname: "/singleplayer-levelfive" });
    window.location.reload();
  };

  const handleLvl6Click = () => {
    navigate({ pathname: "/singleplayer-levelsix" });
    window.location.reload();
  };

  const handleLvl7Click = () => {
    navigate({ pathname: "/singleplayer-levelseven" });
    window.location.reload();
  };

  const handleLvl8Click = () => {
    navigate({ pathname: "/singleplayer-leveleight" });
    window.location.reload();
  };

  const handleLvl9Click = () => {
    navigate({ pathname: "/singleplayer-levelnine" });
    window.location.reload();
  };

  const handleLvl10Click = () => {
    navigate({ pathname: "/singleplayer-levelten" });
    window.location.reload();
  };

  const handleLvl11Click = () => {
    navigate({ pathname: "/singleplayer-leveleleven" });
    window.location.reload();
  };

  const handleLvl12Click = () => {
    navigate({ pathname: "/singleplayer-leveltwelve" });
    window.location.reload();
  };

  const handleLvl13Click = () => {
    navigate({ pathname: "/singleplayer-levelthirteen" });
    window.location.reload();
  };

  return (
    <div>
      <Header pageTitle="Map Selection" username="machujason" />

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
