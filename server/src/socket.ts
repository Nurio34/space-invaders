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
import { handlePlayerSize } from "./utils/handlePlayerSize";

const rooms: Record<string, RoomType> = {};

const gameLoopIntervals: Record<string, NodeJS.Timeout> = {};

export const socketSetup = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on("connection", (socket) => {
    console.log(`Player connected with id: ${socket.id}`);

    socket.on("resetCanvas", ({ roomId, socketId, width, height }) => {
      const player = detectPlayer(rooms, roomId, socketId);
      const playerSize = handlePlayerSize(width);
      player.size = playerSize;
    });

    socket.on(
      "gameStart",
      ({ roomId, socketId, name, maxPlayers, canvasSize }) => {
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

        const playerSize = handlePlayerSize(canvasSize.width);

        const newPlayer = new Player(
          socket.id,
          name,
          playerSize,
          canvasSize.width / 2 - playerSize / 2,
          canvasSize.height - 2 * playerSize
        );
        rooms[roomId].players[socket.id] = newPlayer;

        gameLoop(io, roomId, socketId);
      }
    );

    socket.on("move", ({ roomId, socketId, x, y }) => {
      const player = detectPlayer(rooms, roomId, socketId);
      player.x = x;
      player.y = y;
    });

    socket.on("shot", ({ roomId, socketId }) => {
      const player = detectPlayer(rooms, roomId, socketId);

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

      const room = rooms[roomId];
      room.bullets.push(newBullet);
    });

    socket.on("disconnect", () => {
      //! *** if a player leave the room, delete the player from room ***
      for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.players[socket.id]) {
          delete room.players[socket.id];
          //! *** and check if any playerin the room. If not, delete the room from rooms ***
          if (Object.keys(room.players).length === 0) {
            delete rooms[roomId];
            console.log(`Room "${roomId}" deleted because it has no players.`);
          }
          //! *******************************************************************************
          else {
            io.to(roomId).emit("gameState", room);
          }
        }
      }
    });
  });
};

function gameLoop(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  roomId: string,
  socketId: string
) {
  if (gameLoopIntervals[roomId]) return; // prevent double-start

  gameLoopIntervals[roomId] = setInterval(() => {
    const room = rooms[roomId];

    //! *** if all players left the room, stop the gameLoop ***
    if (!room) {
      clearInterval(gameLoopIntervals[roomId]);
      delete gameLoopIntervals[roomId];
      return;
    }
    //! ********************************************************

    //! *** handle bullets ***
    room.bullets = room.bullets.filter((bullet) => {
      bullet.move();
      return bullet.y > bullet.height * -1;
    });
    //! **********************

    //? *** Broadcast the game ***
    io.to(roomId).emit("gameState", room);
    //? *************************
  }, 1000 / 60);
}
