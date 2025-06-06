import { RoomType } from "../types/game/server";

export const aliensMove = (room: RoomType) => {
  const { width: canvasWidth, height: canvasHeight } = room.canvasSize;

  room.aliens = room.aliens.filter((alien) => {
    alien.move(canvasWidth);
    return alien.y < canvasHeight;
  });
};
