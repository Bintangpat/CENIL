"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import io, { Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface Message {
  _id?: string;
  user: string;
  message: string;
  timestamp: number;
}

let socket: Socket;

export default function ChatRoomPage() {
  const { id: roomId } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [userCount, setUserCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Connect to your socket server (bukan Next.js API route)
    socket = io("http://localhost:4000", {
      transports: ["websocket", "polling"],
      timeout: 20000,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
      setConnectionStatus("connected");

      // Join room setelah connected
      if (roomId && user) {
        socket.emit("joinRoom", roomId, user.name);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
      setConnectionStatus("error");
    });

    // Terima chat history
    socket.on("chatHistory", (history) => {
      console.log("📜 Chat history received:", history);
      setMessages(history || []);
    });

    // Terima pesan baru
    socket.on("receiveMessage", (msg) => {
      console.log("📨 New message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Room info
    socket.on("roomInfo", (info) => {
      console.log("🏠 Room info:", info);
      setUserCount(info.userCount || 0);
    });

    socket.on("userJoined", (info) => {
      console.log("👋 User joined:", info);
      setUserCount(info.userCount || 0);
    });

    socket.on("userLeft", (info) => {
      console.log("👋 User left:", info);
      setUserCount(info.userCount || 0);
    });

    // Handle error
    socket.on("error", (errorData) => {
      console.error("🚨 Socket error:", errorData);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, user?.name]);

  const sendMessage = () => {
    if (!input.trim() || !user || connectionStatus !== "connected") return;

    console.log("📤 Sending message:", {
      roomId,
      user: user.name,
      message: input,
    });

    // Gunakan format yang sesuai dengan server
    socket.emit("sendMessage", {
      roomId,
      user: user.name,
      message: input,
    });

    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Status indicator
  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "🟢 Connected";
      case "error":
        return "❌ Error";
      case "disconnected":
        return "🔴 Disconnected";
      default:
        return "🟡 Connecting...";
    }
  };

  return (
    <div className="bg-background flex h-screen flex-col">
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-semibold">Chat Room: {roomId}</h1>
          {userCount > 0 && (
            <span className="text-sm text-gray-600">👥 {userCount} online</span>
          )}
        </div>
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Loading state */}
      {connectionStatus !== "connected" && (
        <div className="border-b border-yellow-200 bg-yellow-50 p-2">
          <div className="text-center text-sm text-yellow-700">
            {connectionStatus === "disconnected" &&
              "🔄 Connecting to server..."}
            {connectionStatus === "error" &&
              "❌ Connection failed. Retrying..."}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {connectionStatus !== "connected" && messages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <div className="inline-flex items-center space-x-2">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span>Connecting to chat server...</span>
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg._id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-3 flex ${
                msg.user === user?.name ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 shadow ${
                  msg.user === user?.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <div className="mb-1 text-xs opacity-75">
                  {msg.user} • {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
                <div className="break-words">{msg.message}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-border flex gap-2 border-t p-4">
        <input
          className="flex-1 rounded-lg border p-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            connectionStatus === "connected"
              ? "Tulis pesan..."
              : "Connecting..."
          }
          disabled={connectionStatus !== "connected"}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={connectionStatus !== "connected" || !input.trim()}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
