import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket Already running");
  } else {
    console.log("socket initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
      socket.on("increase", (msg) => {
        const fetcher = async () => {
          const res = await fetch("http://127.0.0.1:8000/change?type=increase");
          const { count } = await res.json();
          socket.broadcast.emit("new-count", count);
        };
        fetcher();
      });
      socket.on("decrease", (msg) => {
        const fetcher = async () => {
          const res = await fetch("http://127.0.0.1:8000/change?type=decrease");
          const { count } = await res.json();
          socket.emit("new-count", count);
        };
        fetcher();
      });
    });
  }
  res.end();
}
