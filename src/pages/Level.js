import React from "react";
import Header from "../components/Header";

export default function Level() {
  return (
    <div className="w-screen h-screen place-items-center place-content-center">
      <Header pageTitle="Level One" username="machujason" />

      <div className="flex flex-col place-items-center w-screen h-2/3">
        <div className="bg-gray-300 w-screen h-1/4 mb-4"></div>
        <div className="flex relative flex-row  h-2/3 w-screen">
          <div className="relative bg-orange-300 w-64 h-full left-40"></div>
          <div className="absolute bg-yellow-300 w-64 h-full inset-y-0 right-40"></div>
        </div>
      </div>

      <div className="flex flex-row  h-1/4 w-screen place-content-center">
        <div className=" bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
        <div className="bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
        <div className="bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
        <div className="bg-gray-300 w-1/4 h-30 rounded-xl m-3"></div>
      </div>
    </div>
  );
}
