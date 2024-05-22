import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Hooks";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

import Header from "../components/Header";

export default function HeadOnLobby() {
  const navigate = useNavigate();

  const { session } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [characterImg, setCharacterImg] = useState(null);

  const [roomCode, setRoomCode] = useState("");
  const [message, setMessage] = useState("");

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
    async function get() {
      try {
        const userData = await getUserInfo(session?.user.id);
        setUserInfo(userData);
        setUsername(userData.username);
        setCharacterImg(userData.selectedImgUrl);
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }

    get();
  }, []);

  useEffect(() => {
    socket.on("roomReady", (roomCode) => {
      console.log(`Room ${roomCode} is ready`);
      navigate(`/room/${roomCode}`, { state: { num: 1 } });
    });

    return () => {
      socket.off("roomReady");
    };
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900">
      <Header
        pageTitle="Head On"
        username={username}
        profilePicture={characterImg}
      />

      <div className="flex flex-row gap-40 place-content-center place-items-center h-lvh">
        <div className="flex flex-col place-items-center gap-5">
          <div
            className="bg-white w-80 h-96"
            onClick={() => createRoom()}
          ></div>
          <span className="text-xl font-bold text-white">Create Lobby</span>
        </div>

        <div className="flex flex-col place-items-center gap-5">
          <div className="bg-white w-80 h-96" onClick={() => joinRoom()}></div>
          <span className="text-xl font-bold text-white">Join Room</span>
        </div>
      </div>

      {roomCode && <p className="text-white">Current Room: {roomCode}</p>}
      {message && <span className="text-white">Message: {message}</span>}
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
