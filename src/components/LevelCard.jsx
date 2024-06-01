import React from "react";

import star from "../images/star.png";
import nonstar from "../images/nonstar.png";
import gray_card from "../images/gray-levelCard.png";

export default function LevelCard({ ...props }) {
  return (
    <button
      disabled={props.disabled}
      className="flex relative flex-col w-full h-full rounded-xl p-10 place-items-center gap-5"
      onClick={props.onClick}
      id={props.id}
    >
      {props.stars !== null ? (
        <div className="flex relative flex-row place-content-center gap-3 z-10 mt-14 w-fit h-fit">
          {[...Array(props.stars)].map((item, index) => {
            return <img className="w-16" key={index} src={star} alt="Star" />;
          })}
          {[...Array(3 - props.stars)].map((item, index) => {
            return (
              <img className="w-16" key={index} src={nonstar} alt="Non-Star" />
            );
          })}
        </div>
      ) : (
        <div className="flex relative flex-row place-content-center gap-3 z-10 mt-14">
          {[...Array(3)].map((item, index) => {
            return (
              <img className="w-16" key={index} src={nonstar} alt="Non-Star" />
            );
          })}
        </div>
      )}
      <img
        src={gray_card}
        className="flex absolute w-fit h-fit"
        id={props.imageId}
      />
      <span className="flex relative flex-grow text-3xl font-bold z-10 text-white drop-shadow-sm">
        {props.levelNum}
      </span>
      <span className="flex relative text-xl z-10 mb-3 text-white">
        {props.levelName}
      </span>
    </button>
  );
}
