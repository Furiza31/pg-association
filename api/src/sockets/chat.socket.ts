import { PrismaClient } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { AuthService } from "../services/auth.service";

const prisma = new PrismaClient();

export const handleChatEvents = (io: Server, socket: Socket): void => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("send_message", async (data) => {
    try {
      const { room, message, userId, token } = data;

      let validToken;
      try {
        validToken = AuthService.verifyToken({ token });
      } catch (error) {
        console.error("Invalid token:", error);
        socket.emit("error", { message: "Authentication failed" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        socket.emit("error", { message: "User not found" });
        return;
      }

      const safeUser = AuthService.safeUser({ user });

      io.to(room).emit("receive_message", {
        message,
        user: safeUser,
        timestamp: new Date().toISOString(),
      });

      console.log(
        `Message sent in room ${room} by user ${
          safeUser.username || safeUser.email
        }: ${message}`
      );
    } catch (error) {
      console.error("Error processing message:", error);
      socket.emit("error", { message: "Failed to process message" });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};
