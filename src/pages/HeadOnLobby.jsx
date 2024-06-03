import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Hooks";
import { initializeSocket } from "../initSocket";

import Header from "../components/Header";
import create from "../images/create.png";
import join from "../images/join.png";

export default function HeadOnLobby() {
  const socket = initializeSocket();
  const navigate = useNavigate();

  const { profile } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [characterImg, setCharacterImg] = useState(null);

  const [roomCode, setRoomCode] = useState("");
  const [message, setMessage] = useState("");

  const [remove, setRemove] = useState(false);

  const createRoom = () => {
    socket.emit("createRoom", (code) => {
      setRoomCode(code);
      setMessage(`Room created with code: ${code}`);
    });
  };

  const joinRoom = () => {
    const code = prompt("Enter room code:");
    socket.emit("joinRoom", code, (response) => {
      if (response.success) {
        setRoomCode(response.roomCode);
        setMessage(`Joined room with code: ${code}`);
      } else {
        setMessage(response.message);
      }
    });
  };

  useEffect(() => {
    socket.connect();
    if (profile) {
      setUserInfo(profile);
      setUsername(profile.username);
      setCharacterImg(profile.selectedImgUrl);
    }
  }, []);

  useEffect(() => {
    socket.on("roomReady", (roomCode) => {
      console.log(`Room ${roomCode} is ready`);
      navigate(`/room/${roomCode}`, { state: { num: 1, code: roomCode } });
    });

    return () => {
      socket.off("roomReady");
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-stone-bg bg-cover place-items-center">
      <Header
        pageTitle="Head On"
        username={username}
        profilePicture={characterImg}
      />

      <div className="flex flex-col gap-10 place-content-center place-items-center h-screen w-screen">
        <div
          className="flex flex-col place-items-center gap-5 bg-purple-600 w-1/2 p-10 rounded-xl cursor-pointer hover:w-3/4 transition-all"
          onClick={() => createRoom()}
        >
          <div className="flex flex-row gap-5 place-items-center w-full">
            <img src={create} className="w-20" />
            <span className="text-3xl font-bold text-white">Create Lobby</span>
          </div>
        </div>
        {roomCode && (
          <p className="flex flex-col place-items-center w-1/2 p-5 rounded-xl text-3xl bg-white hover:w-2/3 hover:text-4xl transition-all">
            Room created with code: {roomCode}
          </p>
        )}

        <div
          className="flex flex-row place-items-center gap-5 bg-red-600 w-1/2 p-10 rounded-xl cursor-pointer hover:w-3/4 transition-all"
          onClick={() => joinRoom()}
        >
          <img src={join} className="w-20" />
          <span className="text-3xl font-bold text-white">Join Room</span>
        </div>
      </div>

      {/* {remove && (
        <div className="flex w-full h-full justify-center">
          <div className="flex flex-col gap-7 relative bg-white w-1/2 h-1/2 place-content-center place-self-center place-items-center">
            <button
              onClick={() => setRemove(false)}
              className="flex absolute top-5 left-5"
            >
              X
            </button>
            <span className="text-5xl">
              {roomCode && <p className="">Current Room: {roomCode}</p>}
            </span>
            <span className="text-xl">
              Tell your friend to join using this code!
            </span>
          </div>
        </div>
      )} */}
    </div>
  );
}

/*
{!showCreated && !showJoin && (
        <>
          <div className="flex flex-row gap-40 place-content-center place-items-center h-lvh">
            <div className="flex flex-col place-items-center gap-5">
              <div
                className="bg-white w-80 h-96"
                onClick={() => createRoom()}
              ></div>
              <span className="text-xl font-bold text-white">Create Lobby</span>
            </div>

            <div className="flex flex-col place-items-center gap-5">
              <div
                className="bg-white w-80 h-96"
                onClick={() => setShowJoin(true)}
              ></div>
              <span className="text-xl font-bold text-white">Join Room</span>
            </div>
          </div>
        </>
      )}

      {showCreated && (
        <>
          <div className="flex flex-col place-content-center place-items-center h-lvh">
            <button
              className="absolute left-5 top-20 w-24 h-24 text-white text-xl "
              onClick={() => setShowCreated(false)}
            >
              X
            </button>
            {roomCode && <p className="text-white">Current Room: {roomCode}</p>}
            {message && <span className="text-white">Message: {message}</span>}
          </div>
        </>
      )}

      {showJoin && (
        <>
          <div className="flex flex-col place-content-center place-items-center h-lvh">
            <div className="bg-white w-3/4 h-3/4 flex flex-col ">
              <button
                className="absolute left-5 top-20 w-24 h-24 text-white text-xl "
                onClick={() => setShowJoin(false)}
              >
                X
              </button>

              <form onSubmit={() => joinRoom(joinCode)}>
                <InputField
                  type={"text"}
                  label={"Enter room code"}
                  onChange={(e) => setJoinCode(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="bg-blue-300"
                  onClick={() => joinCode(joinCode)}
                >
                  Join Room
                </button>
              </form>
            </div>
          </div>
        </>
      )}
*/
