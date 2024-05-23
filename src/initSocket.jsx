import io from "socket.io-client";

// const socket = io("http://localhost:4000");
let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io("http://localhost:4000");
  }

  return socket;
};
