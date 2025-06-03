import { Server, Socket } from "socket.io";
import { ClientToServerEvents } from "./types/game/client";
import {
  GameStateType,
  RoomType,
  ServerToClientEvents,
} from "./types/game/server";
import { Player } from "./objects/player";
import { detectPlayer } from "./utils/detectPlayer";
import { Bullet } from "./objects/bullet";

const rooms: Record<string, RoomType> = {};

let interval: NodeJS.Timeout | null = null;

export const socketSetup = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on("connection", (socket) => {
    console.log(`Player connected with id: ${socket.id}`);

    socket.on("resetCanvas", ({ width, height }) => {
      for (const roomId in rooms) {
        if (rooms[roomId].players[socket.id]) {
          rooms[roomId].canvasSize = { width, height };
          break;
        }
      }
    });

    socket.on("gameStart", ({ roomId, name, maxPlayers, canvasSize }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          maxPlayers,
          players: {},
          bullets: [],
          canvasSize,
        };
      }

      const playerIdealSize = 32;
      const playerSize = Math.max(canvasSize.width / 30, playerIdealSize);

      const newPlayer = new Player(
        socket.id,
        name,
        playerSize,
        canvasSize.width / 2 - playerSize / 2,
        canvasSize.height - 2 * playerIdealSize
      );
      rooms[roomId].players[socket.id] = newPlayer;

      gameLoop(io, roomId);
    });

    socket.on("move", ({ roomId, socketId, x, y }) => {
      const player = detectPlayer(rooms, roomId, socketId);
      player.x = x;
      player.y = y;
    });

    socket.on("shot", ({ roomId, socketId }) => {
      const player = detectPlayer(rooms, roomId, socketId);

      const { size, x, y } = player;
      const bulletWidth = size / 6;
      const bulletHeight = bulletWidth * 2;

      const newBullet = new Bullet(
        socketId,
        size,
        bulletWidth,
        bulletHeight,
        x + size / 2 - bulletWidth / 2,
        y + size - bulletHeight
      );

      const room = rooms[roomId];
      room.bullets.push(newBullet);
    });

    socket.on("disconnect", () => {
      for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.players[socket.id]) {
          delete room.players[socket.id];
          if (Object.keys(room.players).length === 0) {
            delete rooms[roomId];
          } else {
            io.to(roomId).emit("gameState", room);
          }
        }
      }
    });
  });
};

function gameLoop(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  roomId: string
) {
  interval = setInterval(() => {
    const room = rooms[roomId];

    if (!room) return;

    const { bullets } = room;
    bullets.forEach((bullet) => bullet.move());

    io.to(roomId).emit("gameState", rooms[roomId]);
  }, 1);
}
