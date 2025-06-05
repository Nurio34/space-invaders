import { Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";
import { detectPlayer } from "../utils/detectPlayer";
import { Bullet } from "../objects/bullet";

export const shotListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("shot", ({ roomId, socketId }) => {
    const player = detectPlayer(rooms, roomId, socketId);

    const { size, x, y } = player;
    const bulletWidth = size / 8;
    const bulletHeight = bulletWidth * 2;

    const newBullet = new Bullet(
      socketId,
      size,
      bulletWidth,
      bulletHeight,
      x + size / 2 - bulletWidth / 2,
      y
    );

    const room = rooms[roomId];
    room.bullets.push(newBullet);
  });
};
