import { Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";
import { detectPlayer } from "../utils/detectPlayer";
import { Bullet } from "../objects/bullet";

export const shotListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("shoot", ({ roomId, socketId, isShooting }) => {
    const player = detectPlayer(rooms, roomId, socketId);

    if (!Boolean(player)) return;
    if (player.isPlayerDead()) return;

    player.isShooting = isShooting;
  });
};
