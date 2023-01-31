import { demoRooms } from "@/store/constants";
import { Server } from "socket.io";
export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket Already running");
  } else {
    console.log("socket initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      console.log("connected");
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
      socket.on("create", ({ room, email }) => {
        socket.join(room);
        socket.broadcast.emit("new-room", room);
        io.to(room).emit(
          "created",
          `user ${email} sucessfully created room ${room}`
        );
        // socket.in(room).emit("created", "Room Created Succesfully");
      });
      socket.on("join", ({ room, email }) => {
        console.log(room, email);
        socket.join(room);
        socket.to(room).emit("new-user", `User ${email} joined the chat`);
      });
    });
  }
  res.end();
}
