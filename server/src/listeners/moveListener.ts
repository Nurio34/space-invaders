import { Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";
import { detectPlayer } from "../utils/detectPlayer";

export const moveListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("move", ({ roomId, socketId, moveArray, velocity }) => {
    const room = rooms[roomId];
    if (!room) return;

    const player = detectPlayer(room, socketId);

    if (!Boolean(player)) return;
    if (player.isPlayerDead()) return;

    player.moveArray = moveArray;
    player.velocity = velocity;
  });
};
