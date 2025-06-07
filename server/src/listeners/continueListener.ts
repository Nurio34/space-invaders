import { Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";

export const continueListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("continue", ({ roomId, socketId }) => {
    const player = rooms[roomId].players[socketId];
    player.revieve();
  });
};
