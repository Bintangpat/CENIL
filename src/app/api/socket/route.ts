// app/api/socket/route.ts
import { NextResponse } from "next/server";
import { Server } from "socket.io";

export async function GET(req: Request) {
  const res: any = {}; // NextResponse tidak expose socket, ini hanya contoh
  if (!res.socket?.server?.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
      });

      socket.on("chatMessage", (msg) => {
        socket.to(msg.roomId).emit("chatMessage", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
    console.log("Socket.IO initialized");
  }

  return NextResponse.json({ status: "ok" });
}
