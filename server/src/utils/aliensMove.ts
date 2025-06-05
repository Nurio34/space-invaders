import { RoomType } from "../types/game/server";

export const aliensMove = (
  room: RoomType,
  canvasWidth: number,
  canvasHeight: number
) => {
  room.aliens = room.aliens.filter((alien) => {
    alien.move(canvasWidth);
    return alien.y < canvasHeight;
  });
};
