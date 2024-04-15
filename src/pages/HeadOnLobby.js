import React from "react";
import Header from "../components/Header";

export default function HeadOnLobby() {
  return (
    <div class="flex flex-col h-screen w-screen bg-violet-200">
      <Header pageTitle="Head On" username="machujason" />

      <div class="flex flex-row gap-40 place-content-center place-items-center h-lvh">
        <div class="flex flex-col place-items-center gap-5">
          <div class="bg-white w-80 h-96"></div>
          <span class="text-xl font-bold">Create Lobby</span>
        </div>

        <div class="flex flex-col place-items-center gap-5">
          <div class="bg-white w-80 h-96"></div>
          <span class="text-xl font-bold">Join Room</span>
        </div>
      </div>
    </div>
  );
}
