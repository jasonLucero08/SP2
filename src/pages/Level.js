import React from "react";
import Header from "../components/Header";

export default function Level() {
  return (
    <div class="w-screen h-screen ">
      <Header pageTitle="Level One" username="machujason" />

      <div class="flex flex-col place-items-center w-screen h-2/3">
        <div
          className="questionBubble"
          class="bg-gray-300 w-screen h-1/4 mb-4"
        ></div>
        <div class="flex relative flex-row  h-2/3 w-screen">
          <div
            className="userCard"
            class="relative bg-orange-300 w-64 h-full left-40"
          ></div>
          <div
            className="enemyCard"
            class="absolute bg-yellow-300 w-64 h-full inset-y-0 right-40"
          ></div>
        </div>
      </div>

      <div
        className="cardChoices"
        class="flex flex-row  h-1/4 w-screen place-content-center"
      >
        <div class=" bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
        <div class="bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
        <div class="bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
        <div class="bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
      </div>
    </div>
  );
}
