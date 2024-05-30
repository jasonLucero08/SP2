import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { getUserInfo } from "../hooks/Hooks";
import { initializeSocket } from "../initSocket";

import Header from "../components/Header";

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
    setRemove(true);
    socket.emit("createRoom", (code) => {
      setRoomCode(code);
      setMessage(`Room created with code: ${code}`);
    });
  };

  const joinRoom = () => {
    setRemove(true);
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

    // async function get() {
    //   try {
    //     const userData = await getUserInfo(session?.user.id);
    //     setUserInfo(userData);
    //     setUsername(userData.username);
    //     setCharacterImg(userData.selectedImgUrl);
    //   } catch (err) {
    //     console.error("Error: ", err.message);
    //   }
    // }

    // get();
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

      {!remove && (
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
              onClick={() => joinRoom()}
            ></div>
            <span className="text-xl font-bold text-white">Join Room</span>
          </div>
        </div>
      )}

      {remove && (
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
      )}
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
