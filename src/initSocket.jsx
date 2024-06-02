import io from "socket.io-client";

// const socket = io("https://456-server.glitch.me/");
let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io("https://456-server.glitch.me/", { transports: ["websocket"] });
  }

  return socket;
};
