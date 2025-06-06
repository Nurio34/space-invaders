import { Server } from "socket.io";
import { ClientToServerEvents } from "./types/game/client";
import { RoomType, ServerToClientEvents } from "./types/game/server";
import { resetCanvasListener } from "./listeners/resetCanvasListener";
import { gameStartListener } from "./listeners/gameStartListener";
import { moveListener } from "./listeners/moveListener";
import { shotListener } from "./listeners/shotListener";
import { disconnectListener } from "./listeners/disconnectListener";

const rooms: Record<string, RoomType> = {};
const gameLoopIntervals: Record<string, NodeJS.Timeout> = {};
const alienSpawnIntervals: Record<string, NodeJS.Timeout> = {};
const alienBulletSpawnIntervals: Record<string, NodeJS.Timeout> = {};

export const socketSetup = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on("connection", (socket) => {
    console.log(`Player connected with id: ${socket.id}`);

    resetCanvasListener(rooms, socket);
    gameStartListener(
      rooms,
      gameLoopIntervals,
      alienSpawnIntervals,
      alienBulletSpawnIntervals,
      io,
      socket
    );
    moveListener(rooms, socket);
    shotListener(rooms, socket);

    //! **
    socket.on("continue", ({ roomId, socketId }) => {
      const player = rooms[roomId].players[socketId];
      player.revieve();
    });
    //! ***

    //! ***
    socket.on("leave", ({ roomId, socketId }) => {
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
      } else {
        console.log(`Player ${socketId} left room ${roomId}`);
      }
    });

    //! ***

    disconnectListener(
      rooms,
      socket,
      io,
      gameLoopIntervals,
      alienSpawnIntervals,
      alienBulletSpawnIntervals
    );
  });
};
