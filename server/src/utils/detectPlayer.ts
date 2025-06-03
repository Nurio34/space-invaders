import { RoomType } from "../types/game/server";

export const detectPlayer = (
  rooms: Record<string, RoomType>,
  roomId: string,
  socketId: string
) => {
  const room = rooms[roomId];
  const player = room.players[socketId];

  return player;
};
