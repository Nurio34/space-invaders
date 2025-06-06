import { RoomType } from "../types/game/server";

export const detectBulletAlienBulletCollision = (room: RoomType) => {
  const playerBullets = room.bullets;
  const alienBullets = room.alienBullets;

  const collidedPlayerBulletIndexes = new Set<number>();
  const collidedAlienBulletIndexes = new Set<number>();

  for (let i = 0; i < playerBullets.length; i++) {
    const pb = playerBullets[i];

    for (let j = 0; j < alienBullets.length; j++) {
      const ab = alienBullets[j];

      const isColliding =
        pb.x < ab.x + ab.width &&
        pb.x + pb.width > ab.x &&
        pb.y < ab.y + ab.height &&
        pb.y + pb.height > ab.y;

      if (isColliding) {
        collidedPlayerBulletIndexes.add(i);
        collidedAlienBulletIndexes.add(j);
        break; // one collision per player bullet
      }
    }
  }

  // Filter out collided bullets
  room.bullets = playerBullets.filter(
    (_, idx) => !collidedPlayerBulletIndexes.has(idx)
  );
  room.alienBullets = alienBullets.filter(
    (_, idx) => !collidedAlienBulletIndexes.has(idx)
  );
};
