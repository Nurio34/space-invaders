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
import { alienBulletSpawner } from "./utils/alienBulletSpawner";
import { aliensBulletsMove } from "./utils/alienBulletsMove";
import { detectAlienBulletPlayerCollision } from "./utils/detectAlienBulletPlayerCollision ";
import { detectAlienBulletAlienCollision } from "./utils/detectAlienBulletAlienCollision ";
import { detectAlienPassBorder } from "./utils/detectAlienPassBorder";
import { detectPlayerPlayerCollision } from "./utils/detectPlayerPlayerCollision";
import { detectBulletAlienBulletCollision } from "./utils/detectBulletAlienBulletCollision";

export const gameLoop = (
  rooms: Record<string, RoomType>,
  gameLoopIntervals: Record<string, NodeJS.Timeout>,
  alienSpawnIntervals: Record<string, NodeJS.Timeout>,
  alienBulletSpawnIntervals: Record<string, NodeJS.Timeout>,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  roomId: string,
  socketId: string
) => {
  if (gameLoopIntervals[roomId]) return; // prevent double-start

  gameLoopIntervals[roomId] = setInterval(() => {
    const room = rooms[roomId];

    handleEmptyRoom(
      room,
      gameLoopIntervals,
      alienSpawnIntervals,
      alienBulletSpawnIntervals,
      roomId
    );

    if (!room) return;

    bulletsMove(room);
    aliensMove(room);
    aliensBulletsMove(room);

    detectBulletAlienCollision(room);
    detectBulletPlayerCollision(room);
    detectAlienPlayerCollision(room);
    detectAlienBulletPlayerCollision(room);
    detectAlienBulletAlienCollision(room);
    detectBulletAlienBulletCollision(room);

    detectAlienPassBorder(room);
    detectPlayerPlayerCollision(room);

    broadcastGamestate(room, roomId, io);
  }, 1000 / 60);

  alienSpawnIntervals[roomId] = setInterval(() => {
    alienSpawner(rooms, roomId);
  }, 3000);
  alienSpawner(rooms, roomId);

  alienBulletSpawnIntervals[roomId] = setInterval(() => {
    alienBulletSpawner(rooms, roomId);
  }, 3000);
};
