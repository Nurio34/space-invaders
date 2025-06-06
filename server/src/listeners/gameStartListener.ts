import { Socket, Server } from "socket.io";
import { Player } from "../objects/player";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { handlePlayerSize } from "../utils/handlePlayerSize";
import { ClientToServerEvents } from "../types/game/client";
import { gameLoop } from "../gameLoop";

export const gameStartListener = (
  rooms: Record<string, RoomType>,
  gameLoopIntervals: Record<string, NodeJS.Timeout>,
  alienSpawnIntervals: Record<string, NodeJS.Timeout>,
  alienBulletSpawnIntervals: Record<string, NodeJS.Timeout>,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on(
    "gameStart",
    ({ roomId, socketId, name, maxPlayers, canvasSize }) => {
      socket.join(roomId);

      // const id = crypto.randomUUID();
      // const botPlayer = new Player(id, "DiffieHellmanGroup", 3, 32, 900, 500);

      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          maxPlayers,
          canvasSize,
          // players: { [id]: player },
          players: {},
          bullets: [],
          aliens: [],
          alienBullets: [],
        };
      }

      const maxLife = 3;
      const playerSize = handlePlayerSize(canvasSize.width);

      const newPlayer = new Player(
        socket.id,
        name,
        maxLife,
        playerSize,
        canvasSize.width / 2 - playerSize / 2,
        canvasSize.height - 2 * playerSize
      );
      rooms[roomId].players[socket.id] = newPlayer;

      gameLoop(
        rooms,
        gameLoopIntervals,
        alienSpawnIntervals,
        alienBulletSpawnIntervals,
        io,
        roomId,
        socketId
      );
    }
  );
};
