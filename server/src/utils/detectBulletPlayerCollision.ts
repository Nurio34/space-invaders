import { RoomType } from "../types/game/server";

export const detectBulletPlayerCollision = (room: RoomType) => {
  room.bullets = room.bullets.filter((bullet) => {
    let hitPlayerId: string | null = null;

    for (const playerId in room.players) {
      const player = room.players[playerId];

      // const hit =
      //   bullet.x < player.x + player.size &&
      //   bullet.x + bullet.width > player.x &&
      //   bullet.y < player.y + player.size &&
      //   bullet.y + bullet.height > player.y;

      const hit =
        bullet.x < player.x + player.size &&
        bullet.x + bullet.width > player.x &&
        bullet.y > player.y + player.size / 2 - bullet.height &&
        bullet.y < player.y + player.size;

      if (hit) {
        hitPlayerId = playerId;
        break; // Stop checking once a hit is found
      }
    }

    if (hitPlayerId) {
      console.log(
        `Player ${hitPlayerId} was hit by a bullet from ${bullet.id}`
      );

      // Optionally notify the hit player
      // io.to(hitPlayerId).emit("playerHit", { by: bullet.id });

      // Optionally apply game logic (health, removal, etc.)
      // room.players[hitPlayerId].health -= 1;

      return false; // Remove the bullet after hit
    }

    return true; // Keep bullet if no one was hit
  });
};
