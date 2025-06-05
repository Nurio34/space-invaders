import { Server } from "socket.io";
import { ClientToServerEvents } from "./types/game/client";
import { RoomType, ServerToClientEvents } from "./types/game/server";
import { alienSpawner } from "./utils/alienSpawner";
import { handleEmptyRoom } from "./utils/handleEmptyRoom";
import { bulletsMove } from "./utils/bulletsMove";
import { aliensMove } from "./utils/aliensMove";
import { detectBulletAlienCollision } from "./utils/detectBulletAlienCollision";
import { detectBulletPlayerCollision } from "./utils/detectBulletPlayerCollision";
import { detectAlienPlayerCollision } from "./utils/detectAlienPlayerCollision";
import { broadcastGamestate } from "./utils/broadcastGamestate";

export const gameLoop = (
  rooms: Record<string, RoomType>,
  gameLoopIntervals: Record<string, NodeJS.Timeout>,
  alienSpawnIntervals: Record<string, NodeJS.Timeout>,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  roomId: string,
  socketId: string
) => {
  if (gameLoopIntervals[roomId]) return; // prevent double-start

  gameLoopIntervals[roomId] = setInterval(() => {
    const room = rooms[roomId];
    const { width: canvasWidth, height: canvasHeight } = room.canvasSize;

    handleEmptyRoom(room, gameLoopIntervals, roomId);
    bulletsMove(room);
    aliensMove(room, canvasWidth, canvasHeight);
    detectBulletAlienCollision(room);
    detectBulletPlayerCollision(room);
    detectAlienPlayerCollision(room);

    broadcastGamestate(room, roomId, io);
  }, 1000 / 60);

  alienSpawnIntervals[roomId] = setInterval(() => {
    alienSpawner(rooms, roomId, socketId);
  }, 3000);
  alienSpawner(rooms, roomId, socketId);
};
