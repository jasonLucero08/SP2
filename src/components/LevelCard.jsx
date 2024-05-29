import React from "react";

import star from "../images/star.png";
import nonstar from "../images/nonstar.png";
import gray_card from "../images/gray-levelCard.png";

export default function LevelCard({ ...props }) {
  return (
    <button
      disabled={props.disabled}
      className="flex relative flex-col flex-none w-80 h-96 rounded-xl p-10 place-items-center gap-5"
      onClick={props.onClick}
      id={props.id}
    >
      {/* {console.log(props.stars)} */}
      {props.stars !== null ? (
        <div className="flex flex-row place-content-center gap-3 z-10 mt-14">
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
        <div className="flex flex-row place-content-center gap-3 z-10 mt-14">
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
      <span className="flex flex-grow text-3xl font-bold z-10 text-white">
        {props.levelNum}
      </span>
      <span className="flex text-xl z-10 mb-3 text-white">
        {props.levelName}
      </span>
    </button>
  );
}
