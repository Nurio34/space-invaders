import { RoomType } from "../types/game/server";

export const detectAlienPlayerCollision = (room: RoomType) => {
  for (const playerId in room.players) {
    const player = room.players[playerId];
    if (player.isPlayerDead()) continue;

    const hitIndex = room.aliens.findIndex((alien) => {
      return (
        player.x < alien.x + alien.width &&
        player.x + player.size > alien.x &&
        player.y < alien.y + alien.height &&
        player.y + player.size > alien.y
      );
    });

    if (hitIndex !== -1) {
      const alien = room.aliens[hitIndex];

      player.decreaseLife();
      alien.life -= 1;

      if (alien.life <= 0) {
        room.aliens.splice(hitIndex, 1);

        const player = room.players[playerId];
        player.score += alien.score; // <-- fixed here
      }
    }
  }
};
