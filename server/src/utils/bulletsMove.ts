import { RoomType } from "../types/game/server";

export const bulletsMove = (room: RoomType) => {
  room.bullets = room.bullets.filter((bullet) => {
    bullet.move();
    return bullet.y > bullet.height * -1;
  });
};
