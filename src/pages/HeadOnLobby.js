import React from "react";
import Header from "../components/Header";

export default function HeadOnLobby() {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900">
      <Header pageTitle="Head On" username="machujason" />

      <div className="flex flex-row gap-40 place-content-center place-items-center h-lvh">
        <div className="flex flex-col place-items-center gap-5">
          <div className="bg-white w-80 h-96"></div>
          <span className="text-xl font-bold text-white">Create Lobby</span>
        </div>

        <div className="flex flex-col place-items-center gap-5">
          <div className="bg-white w-80 h-96"></div>
          <span className="text-xl font-bold text-white">Join Room</span>
        </div>
      </div>
    </div>
  );
}
