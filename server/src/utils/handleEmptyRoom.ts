import { RoomType } from "../types/game/server";

export const handleEmptyRoom = (
  room: RoomType,
  gameLoopIntervals: Record<string, NodeJS.Timeout>,
  roomId: string
) => {
  if (!room) {
    clearInterval(gameLoopIntervals[roomId]);
    delete gameLoopIntervals[roomId];
    return;
  }
};
