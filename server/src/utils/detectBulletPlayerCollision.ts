import { RoomType } from "../types/game/server";

export const detectBulletPlayerCollision = (room: RoomType) => {
  room.bullets = room.bullets.filter((bullet) => {
    if (!bullet.id) return true; // skip invalid bullet

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
        const wasAlive = player.life > 0;
        player.decreaseLife();

        if (wasAlive && player.life <= 0) {
          const killer = room.players[bullet.id];
          if (killer) {
            // killer.kills = (killer.kills || 0) + 1;
            console.log(`${bullet.id} killed ${playerId}`);
          }
        }

        hit = true;
        break;
      }
    }

    return !hit;
  });
};
