import React from "react";

import star from "../images/star.png";
import nonstar from "../images/nonstar.png";
import gray_card from "../images/gray-levelCard.png";

export default function LevelCard({ ...props }) {
  return (
    <button
      disabled={props.disabled}
      className="group flex relative flex-col w-5/6 h-full rounded-xl p-10 place-items-center gap-5 hover:w-full hover:h-full transition-all"
      onClick={props.onClick}
      id={props.id}
    >
      {props.stars !== null ? (
        <div className="flex relative flex-row place-content-center gap-3 z-10 mt-14 w-fit h-fit">
          {[...Array(props.stars)].map((item, index) => {
            return (
              <img
                className="w-10 h-10 group-hover:w-16 group-hover:h-16 transition-all"
                key={index}
                src={star}
                alt="Star"
              />
            );
          })}
          {[...Array(3 - props.stars)].map((item, index) => {
            return (
              <img
                className="w-10 h-10 group-hover:w-16 group-hover:h-16 transition-all"
                key={index}
                src={nonstar}
                alt="Non-Star"
              />
            );
          })}
        </div>
      ) : (
        <div className="flex relative flex-row place-content-center gap-3 z-10 mt-14 w-fit h-fit">
          {[...Array(3)].map((item, index) => {
            return (
              <img
                className="w-10 h-10 group-hover:w-16 group-hover:h-16 transition-all"
                key={index}
                src={nonstar}
                alt="Non-Star"
              />
            );
          })}
        </div>
      )}
      <img
        src={gray_card}
        className="flex absolute w-full h-full"
        id={props.imageId}
      />
      <span className="flex relative flex-grow text-xl font-bold z-10 text-white drop-shadow-sm group-hover:text-3xl transition-all">
        {props.levelNum}
      </span>
      <span className="flex relative text-md z-10 mb-3 text-white group-hover:text-xl transition-all">
        {props.levelName}
      </span>
    </button>
  );
}
