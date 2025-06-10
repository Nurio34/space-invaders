import { Socket } from "socket.io";
import { ClientToServerEvents } from "../types/game/client";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { detectPlayer } from "../utils/detectPlayer";
import { handlePlayerSize } from "../utils/handlePlayerSize";

export const resetCanvasListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("resetCanvas", ({ roomId, socketId, width, height }) => {
    const room = rooms[roomId];
    room.canvasSize = { width, height };

    const player = detectPlayer(room, socketId);
    const playerSize = handlePlayerSize(width);
    player.size = playerSize;
    player.x = width / 2 - player.size / 2;
    player.y = height - playerSize * 2;
  });
};
