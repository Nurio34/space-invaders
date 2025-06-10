import { RoomType } from "../types/game/server";

export const detectPlayer = (room: RoomType, socketId: string) => {
  const player = room.players[socketId];

  return player;
};
