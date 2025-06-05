import { Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";
import { detectPlayer } from "../utils/detectPlayer";

export const moveListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("move", ({ roomId, socketId, x, y }) => {
    const { width: canvasWidth, height: canvasHeight } =
      rooms[roomId].canvasSize;
    const player = detectPlayer(rooms, roomId, socketId);
    player.move(x, y, canvasWidth, canvasHeight);
  });
};
