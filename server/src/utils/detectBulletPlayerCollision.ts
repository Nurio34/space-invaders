import { RoomType } from "../types/game/server";

export const detectBulletPlayerCollision = (room: RoomType) => {
  room.bullets = room.bullets.filter((bullet) => {
    let hit = false;

    for (const playerId in room.players) {
      const player = room.players[playerId];

      if (player.isPlayerDead()) continue;

      const collision =
        bullet.x < player.x + player.size &&
        bullet.x + bullet.width > player.x &&
        bullet.y > player.y + player.size / 2 - bullet.height &&
        bullet.y < player.y + player.size;

      if (collision) {
        player.decreaseLife();
        hit = true;
        break; // Stop checking once a hit is found
      }
    }

    return !hit; // ❌ Remove bullet if it hit someone
  });
};
