import { Server } from "socket.io";
import { ClientToServerEvents } from "./types/game/client";
import { RoomType, ServerToClientEvents } from "./types/game/server";
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
import { alienSpawner } from "./utils/alienSpawner";
import { detectAlienAlienCollision } from "./utils/detectAlienAlienCollision";
import { detectPlayer } from "./utils/detectPlayer";
import { Bullet } from "./objects/bullet";

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

    for (const player of Object.values(room.players)) {
      player.move(room.canvasSize.width, room.canvasSize.height);
    }

    //! ***
    const player = detectPlayer(rooms, roomId, socketId);
    console.log(player);
    if (player.isShooting) {
      const now = Date.now();

      if (now - player.lastShotTime >= player.shootCooldown) {
        player.lastShotTime = now;

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

        room.bullets.push(newBullet);
      }
    }

    //! ***

    bulletsMove(room);
    aliensMove(room);
    aliensBulletsMove(room);

    detectBulletAlienCollision(room);
    detectBulletPlayerCollision(room);
    detectAlienPlayerCollision(room);
    detectAlienBulletPlayerCollision(room);
    detectAlienBulletAlienCollision(room);
    detectBulletAlienBulletCollision(room);
    detectAlienAlienCollision(room);
    detectPlayerPlayerCollision(room);
    detectAlienPassBorder(room);

    broadcastGamestate(room, roomId, io);
  }, 1000 / 60);

  alienSpawnIntervals[roomId] = setInterval(() => {
    alienSpawner(rooms, roomId);
  }, 1000);
  alienSpawner(rooms, roomId);

  alienBulletSpawnIntervals[roomId] = setInterval(() => {
    alienBulletSpawner(rooms, roomId);
  }, 3000);
};
