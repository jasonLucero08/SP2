import React from "react";

export default function LevelCard({ ...props }) {
  return (
    <div
      className="flex flex-col flex-none bg-orange-300 w-80 h-96 rounded-xl p-10 place-items-center gap-10"
      onClick={props.onClick}
    >
      <span className="flex flex-grow text-3xl font-bold">
        {props.levelNum}
      </span>
      <span className="flex text-xl">{props.levelName}</span>
    </div>
  );
}
