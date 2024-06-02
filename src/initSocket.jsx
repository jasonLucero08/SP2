import io from "socket.io-client";

// const socket = io("https://456-server.glitch.me/");
let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000", { transports: ["websocket"] });
  }

  return socket;
};
