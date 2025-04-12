import { io, Socket } from "socket.io-client";
import { reactive } from "vue";

// Updated Message type to include user object instead of sender string
export type Message = {
  message: string;
  user?: {
    id: string;
    username?: string;
    email?: string;
    [key: string]: any;
  };
  timestamp: string;
};

// État réactif qui sera partagé entre les composants
export const state = reactive({
  connected: false,
  messages: {} as Record<string, Message[]>,
  currentRoom: "",
});

const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const socket: Socket = io(URL, { autoConnect: false });

socket.on("connect", () => {
  state.connected = true;
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("Socket disconnected");
});

socket.on("receive_message", (data: Message) => {
  if (!state.messages[state.currentRoom]) {
    state.messages[state.currentRoom] = [];
  }

  state.messages[state.currentRoom].push(data);
});

// Add error handling for authentication issues
socket.on("error", (error: { message: string }) => {
  console.error("Socket error:", error.message);
});

export const useSocket = () => {
  const connect = () => {
    if (!state.connected) {
      socket.connect();
    }
  };

  const disconnect = () => {
    if (state.connected) {
      socket.disconnect();
    }
  };

  const joinRoom = (roomId: string) => {
    state.currentRoom = roomId;

    if (!state.messages[roomId]) {
      state.messages[roomId] = [];
    }

    socket.emit("join_room", roomId);
  };

  // Updated to accept userId and token instead of sender
  const sendMessage = (
    message: string,
    userId: number | null,
    token: string | null
  ) => {
    if (!state.currentRoom) return;

    socket.emit("send_message", {
      room: state.currentRoom,
      message,
      userId,
      token,
    });
  };

  return {
    state,
    connect,
    disconnect,
    joinRoom,
    sendMessage,
  };
};
