import React from "react";

import star from "../images/star.png";
import nonstar from "../images/nonstar.png";

export default function LevelCard({ ...props }) {
  return (
    <button
      disabled={props.disabled}
      className="flex flex-col flex-none w-80 h-96 rounded-xl p-10 place-items-center gap-10"
      onClick={props.onClick}
      id={props.id}
    >
      <div className="flex flex-row place-content-center gap-3">
        {[...Array(props.stars)].map((item, index) => {
          return <img className="w-16" key={index} src={star} alt="Star" />;
        })}
        {[...Array(3 - props.stars)].map((item, index) => {
          return (
            <img className="w-16" key={index} src={nonstar} alt="Non-Star" />
          );
        })}
      </div>
      <span className="flex flex-grow text-3xl font-bold">
        {props.levelNum}
      </span>
      <span className="flex text-xl">{props.levelName}</span>
    </button>
  );
}
