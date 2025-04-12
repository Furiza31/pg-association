import { Server } from "socket.io";
import { handleChatEvents } from "./chat.socket";

/**
 * Initialise tous les gestionnaires de socket
 */
export const initializeSockets = (io: Server): void => {
  console.log("🔌 Setting up Socket.io 🔌");

  io.on("connection", (socket) => {
    handleChatEvents(io, socket);
  });
};
