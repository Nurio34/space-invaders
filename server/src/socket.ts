import { Server, Socket } from "socket.io";
import { ClientToServerEvents } from "./types/game/client";
import {
  GameStateType,
  ServerToClientEvents,
  RoomType,
} from "./types/game/server";
import { Player } from "./objects/player";

const gameState: GameStateType = {
  rooms: {},
};

const { rooms } = gameState;

export const socketSetup = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      console.log(`Player connected with id: ${socket.id}`);

      socket.on("gameStart", ({ roomId, name, maxPlayers }) => {
        socket.join(roomId);

        // Create room if it doesn't exist
        if (!rooms[roomId]) {
          rooms[roomId] = {
            id: roomId,
            maxPlayers,
            players: {},
          };
        }

        // Add player to room
        const newPlayer = new Player(socket.id, roomId, 100, 100);
        rooms[roomId].players[socket.id] = newPlayer;

        // Optionally broadcast updated game state
        io.to(roomId).emit("gameState", gameState);
        console.log(rooms[roomId].players);
      });

      socket.on("disconnect", () => {
        // Remove player from any room
        for (const roomId in gameState.rooms) {
          const room = gameState.rooms[roomId];
          if (room.players[socket.id]) {
            delete room.players[socket.id];
            io.to(roomId).emit("gameState", gameState); // update state
          }
        }
      });
    }
  );
};
