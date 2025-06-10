import { Bullet } from "../objects/bullet";
import { RoomType } from "../types/game/server";
import { detectPlayer } from "./detectPlayer";

export const createBullet = (room: RoomType, socketId: string) => {
  const player = detectPlayer(room, socketId);

  if (!Boolean(player)) return;

  if (player.isShooting) {
    const now = Date.now();

    if (now - player.lastShotTime >= player.shootCooldown) {
      player.lastShotTime = now;

      const { size, x, y } = player;
      const bulletWidth = size / 8;
      const bulletHeight = bulletWidth * 2;

      const newBullet = new Bullet(
        socketId,
        size,
        bulletWidth,
        bulletHeight,
        x + size / 2 - bulletWidth / 2,
        y
      );

      room.bullets.push(newBullet);
    }
  }
};
