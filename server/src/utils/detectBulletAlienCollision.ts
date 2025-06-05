import { RoomType } from "../types/game/server";

export const detectBulletAlienCollision = (room: RoomType) => {
  room.bullets = room.bullets.filter((bullet) => {
    const hitIndex = room.aliens.findIndex((alien) => {
      return (
        bullet.x < alien.x + alien.width &&
        bullet.x + bullet.width > alien.x &&
        bullet.y < alien.y + alien.height &&
        bullet.y + bullet.height > alien.y
      );
    });

    if (hitIndex !== -1) {
      room.aliens.splice(hitIndex, 1); // Remove the hit alien
      return false; // Remove the bullet too
    }

    return true; // Keep the bullet
  });
};
