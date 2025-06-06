import { Server, Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";

export const disconnectListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  gameLoopIntervals: Record<string, NodeJS.Timeout>,
  alienSpawnIntervals: Record<string, NodeJS.Timeout>,
  alienBulletSpawnIntervals: Record<string, NodeJS.Timeout>
) => {
  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.players[socket.id]) {
        console.log(`${room.players[socket.id].id} left the room`);
        delete room.players[socket.id];

        if (Object.keys(room.players).length === 0) {
          clearInterval(gameLoopIntervals[roomId]);
          clearInterval(alienSpawnIntervals[roomId]);
          clearInterval(alienBulletSpawnIntervals[roomId]);

          delete gameLoopIntervals[roomId];
          delete alienSpawnIntervals[roomId];
          delete alienBulletSpawnIntervals[roomId];
          delete rooms[roomId];

          console.log(`Room "${roomId}" deleted because it has no players.`);
        } else {
          io.to(roomId).emit("gameState", room);
        }

        break;
      }
    }
  });
};
