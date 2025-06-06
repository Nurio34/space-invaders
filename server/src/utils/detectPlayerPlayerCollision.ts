import { RoomType } from "../types/game/server";

export const detectPlayerPlayerCollision = (room: RoomType) => {
  const playerIds = Object.keys(room.players);

  for (let i = 0; i < playerIds.length; i++) {
    const playerA = room.players[playerIds[i]];
    if (playerA.isPlayerDead()) continue;

    for (let j = i + 1; j < playerIds.length; j++) {
      const playerB = room.players[playerIds[j]];
      if (playerB.isPlayerDead()) continue;

      const isColliding =
        playerA.x < playerB.x + playerB.size &&
        playerA.x + playerA.size > playerB.x &&
        playerA.y < playerB.y + playerB.size &&
        playerA.y + playerA.size > playerB.y;

      if (isColliding) {
        playerA.decreaseLife();
        playerB.decreaseLife();
        console.log(
          `Collision detected between ${playerIds[i]} and ${playerIds[j]}`
        );
      }
    }
  }
};
