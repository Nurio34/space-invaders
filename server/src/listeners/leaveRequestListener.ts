import { Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";

export const leaveRequestListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  gameLoopIntervals: Record<string, NodeJS.Timeout>,
  alienSpawnIntervals: Record<string, NodeJS.Timeout>,
  alienBulletSpawnIntervals: Record<string, NodeJS.Timeout>
) => {
  socket.on("leaveRequest", ({ roomId, socketId }) => {
    const room = rooms[roomId];
    if (!room) return;

    delete room.players[socketId];
    socket.leave(roomId);

    // Check if room is now empty
    const isRoomEmpty = Object.keys(room.players).length === 0;

    if (isRoomEmpty) {
      // Clean up intervals
      clearInterval(gameLoopIntervals[roomId]);
      clearInterval(alienSpawnIntervals[roomId]);
      clearInterval(alienBulletSpawnIntervals[roomId]);

      delete gameLoopIntervals[roomId];
      delete alienSpawnIntervals[roomId];
      delete alienBulletSpawnIntervals[roomId];
      delete rooms[roomId];

      console.log(`Room ${roomId} deleted`);
      socket.emit("leave");
    } else {
      console.log(`Player ${socketId} left room ${roomId}`);
    }
  });
};
