import { Server } from "socket.io";
import { ClientToServerEvents } from "../types/game/client";
import { RoomType, ServerToClientEvents } from "../types/game/server";

export const broadcastGamestate = (
  room: RoomType,
  roomId: string,
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.to(roomId).emit("gameState", room);
};
