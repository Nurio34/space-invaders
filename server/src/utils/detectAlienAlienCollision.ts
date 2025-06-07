import { RoomType } from "../types/game/server";

export const detectAlienAlienCollision = (room: RoomType) => {
  const aliens = room.aliens;

  for (let i = 0; i < aliens.length; i++) {
    const alienA = aliens[i];

    for (let j = i + 1; j < aliens.length; j++) {
      const alienB = aliens[j];

      const isColliding =
        alienA.x < alienB.x + alienB.width &&
        alienA.x + alienA.width > alienB.x &&
        alienA.y < alienB.y + alienB.height &&
        alienA.y + alienA.height > alienB.y;

      if (isColliding) {
        alienA.life -= 1;
        alienB.life -= 1;
      }
    }
  }

  // Remove dead aliens
  room.aliens = aliens.filter((alien) => alien.life > 0);
};
