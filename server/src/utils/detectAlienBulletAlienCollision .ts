import { RoomType } from "../types/game/server";

export const detectAlienBulletAlienCollision = (room: RoomType) => {
  room.alienBullets = room.alienBullets.filter((bullet) => {
    let hit = false;

    for (let i = 0; i < room.aliens.length; i++) {
      const alien = room.aliens[i];

      const collided =
        bullet.x < alien.x + alien.width &&
        bullet.x + bullet.width > alien.x &&
        bullet.y < alien.y + alien.height &&
        bullet.y + bullet.height > alien.y;

      if (collided) {
        alien.life -= 1;
        if (alien.life <= 0) {
          room.aliens.splice(i, 1);
        }
        hit = true;
        break; // Stop checking more aliens for this bullet
      }
    }

    return !hit; // Remove the bullet if it hit an alien
  });
};
