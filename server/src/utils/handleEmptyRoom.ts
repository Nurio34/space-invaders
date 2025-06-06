import { RoomType } from "../types/game/server";

export const handleEmptyRoom = (
  room: RoomType,
  gameLoopIntervals: Record<string, NodeJS.Timeout>,
  alienSpawnIntervals: Record<string, NodeJS.Timeout>,
  alienBulletSpawnIntervals: Record<string, NodeJS.Timeout>,
  roomId: string
) => {
  if (!room) {
    clearInterval(gameLoopIntervals[roomId]);
    delete gameLoopIntervals[roomId];
    clearInterval(alienSpawnIntervals[roomId]);
    delete alienSpawnIntervals[roomId];
    clearInterval(alienBulletSpawnIntervals[roomId]);
    delete alienBulletSpawnIntervals[roomId];
    return;
  }
};
