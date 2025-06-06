import { RoomType } from "../types/game/server";

export const aliensBulletsMove = (room: RoomType) => {
  const { width: canvasWidth, height: canvasHeight } = room.canvasSize;

  room.alienBullets = room.alienBullets.filter((alienBullet) => {
    alienBullet.move();
    return alienBullet.y < canvasHeight;
  });
};
