import { Server, Socket } from "socket.io";
import { RoomType, ServerToClientEvents } from "../types/game/server";
import { ClientToServerEvents } from "../types/game/client";

export const disconnectListener = (
  rooms: Record<string, RoomType>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
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
};
