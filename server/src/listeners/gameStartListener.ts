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
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on(
    "gameStart",
    ({ roomId, socketId, name, maxPlayers, canvasSize }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          maxPlayers,
          canvasSize,
          players: {},
          bullets: [],
          aliens: [],
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

      gameLoop(
        rooms,
        gameLoopIntervals,
        alienSpawnIntervals,
        io,
        roomId,
        socketId
      );
    }
  );
};
