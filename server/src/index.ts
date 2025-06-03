import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { socketSetup } from "./socket";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketSetup(io);

server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
