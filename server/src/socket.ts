import { Server } from "socket.io";
import { ClientToServerEvents } from "./types/game/client";
import { RoomType, ServerToClientEvents } from "./types/game/server";
import { resetCanvasListener } from "./listeners/resetCanvasListener";
import { gameStartListener } from "./listeners/gameStartListener";
import { moveListener } from "./listeners/moveListener";
import { shotListener } from "./listeners/shotListener";
import { disconnectListener } from "./listeners/disconnectListener";
import { continueListener } from "./listeners/continueListener";
import { leaveRequestListener } from "./listeners/leaveRequestListener";

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
    continueListener(rooms, socket);
    leaveRequestListener(
      rooms,
      socket,
      gameLoopIntervals,
      alienSpawnIntervals,
      alienBulletSpawnIntervals
    );
    //! ***

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
