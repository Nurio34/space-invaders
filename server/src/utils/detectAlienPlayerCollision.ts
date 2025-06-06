import { RoomType } from "../types/game/server";

export const detectAlienPlayerCollision = (room: RoomType) => {
  for (const playerId in room.players) {
    const player = room.players[playerId];
    if (player.isPlayerDead()) continue; // ✅ Just skip this player

    const hitIndex = room.aliens.findIndex((alien) => {
      return (
        player.x < alien.x + alien.width &&
        player.x + player.size > alien.x &&
        player.y < alien.y + alien.height &&
        player.y + player.size > alien.y
      );
    });

    if (hitIndex !== -1) {
      player.decreaseLife();
      console.log(`${playerId} hit by alien`);

      room.aliens.splice(hitIndex, 1);
    }
  }
};
