import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "../src/lib/db";
import Message from "../src/models/message";

export interface MessagePayload {
  roomId: string;
  user: string;
  message: string;
}

export interface ConnectionStatus {
  isConnected: boolean;
  userId: string;
  timestamp: number;
}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Track connected users per room
const roomUsers = new Map<string, Set<string>>();

async function startServer() {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Send connection confirmation to client
      socket.emit("connectionStatus", {
        isConnected: true,
        userId: socket.id,
        timestamp: Date.now(),
      } as ConnectionStatus);

      // Join room dan kirim history
      socket.on("joinRoom", async (roomId: string, username?: string) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);

        // Track user in room
        if (!roomUsers.has(roomId)) {
          roomUsers.set(roomId, new Set());
        }
        roomUsers.get(roomId)?.add(username || socket.id);

        try {
          // Send chat history
          const history = await Message.find({ roomId })
            .sort({ timestamp: 1 })
            .limit(100)
            .lean();

          socket.emit("chatHistory", history);

          // Send room info and user list
          const usersInRoom = Array.from(roomUsers.get(roomId) || []);
          socket.emit("roomInfo", {
            roomId,
            userCount: usersInRoom.length,
            users: usersInRoom,
          });

          // Notify others in room about new user
          socket.to(roomId).emit("userJoined", {
            userId: username || socket.id,
            userCount: usersInRoom.length,
            users: usersInRoom,
          });
        } catch (err) {
          console.error("Failed to fetch chat history:", err);
          socket.emit("error", {
            message: "Failed to load chat history",
            type: "HISTORY_ERROR",
          });
        }
      });

      // Kirim pesan baru
      socket.on("sendMessage", async (msg: MessagePayload) => {
        if (!msg.roomId || !msg.user || !msg.message.trim()) {
          socket.emit("error", {
            message: "Invalid message format",
            type: "MESSAGE_VALIDATION_ERROR",
          });
          return;
        }

        try {
          const newMessage = new Message({
            roomId: msg.roomId,
            user: msg.user,
            message: msg.message.trim(),
            timestamp: Date.now(),
          });

          const savedMessage = await newMessage.save();

          // Emit to all users in the room
          io.to(msg.roomId).emit("receiveMessage", savedMessage);

          console.log(`Message sent to room ${msg.roomId}:`, {
            user: msg.user,
            message:
              msg.message.substring(0, 50) +
              (msg.message.length > 50 ? "..." : ""),
          });
        } catch (err) {
          console.error("Failed to save/send message:", err);
          socket.emit("error", {
            message: "Failed to send message",
            type: "MESSAGE_SEND_ERROR",
          });
        }
      });

      // Handle typing indicators
      socket.on(
        "typing",
        (data: { roomId: string; user: string; isTyping: boolean }) => {
          socket.to(data.roomId).emit("userTyping", {
            user: data.user,
            isTyping: data.isTyping,
          });
        },
      );

      // Handle leaving room
      socket.on("leaveRoom", (roomId: string, username?: string) => {
        socket.leave(roomId);

        // Remove user from room tracking
        const roomUserSet = roomUsers.get(roomId);
        if (roomUserSet) {
          roomUserSet.delete(username || socket.id);

          const usersInRoom = Array.from(roomUserSet);

          // Notify others about user leaving
          socket.to(roomId).emit("userLeft", {
            userId: username || socket.id,
            userCount: usersInRoom.length,
            users: usersInRoom,
          });

          // Clean up empty rooms
          if (usersInRoom.length === 0) {
            roomUsers.delete(roomId);
          }
        }

        console.log(`User ${socket.id} left room ${roomId}`);
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        // Remove user from all rooms
        roomUsers.forEach((users, roomId) => {
          if (users.has(socket.id)) {
            users.delete(socket.id);

            const usersInRoom = Array.from(users);

            // Notify others about user disconnecting
            socket.to(roomId).emit("userLeft", {
              userId: socket.id,
              userCount: usersInRoom.length,
              users: usersInRoom,
            });

            // Clean up empty rooms
            if (usersInRoom.length === 0) {
              roomUsers.delete(roomId);
            }
          }
        });
      });

      // Health check endpoint
      socket.on("ping", () => {
        socket.emit("pong", { timestamp: Date.now() });
      });
    });

    server.listen(4000, () => {
      console.log("✅ Socket.IO server running on http://localhost:4000");
      console.log("📡 Ready to accept connections...");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🔄 Shutting down server gracefully...");
  server.close(() => {
    console.log("✅ Server closed successfully");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\n🔄 Shutting down server gracefully...");
  server.close(() => {
    console.log("✅ Server closed successfully");
    process.exit(0);
  });
});

// Start server
startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
