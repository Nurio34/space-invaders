import { AlienBullet } from "../objects/alienBullet";
import { RoomType } from "../types/game/server";

export const alienBulletSpawner = (
  rooms: Record<string, RoomType>,
  roomId: string
) => {
  const aliens = rooms[roomId].aliens;
  if (aliens.length === 0) return;

  const players = rooms[roomId].players;

  if (Object.values(players).every((player) => player.isPlayerDead())) return;

  let minY = 0;
  for (const playerId in players) {
    const player = players[playerId];
    const playerY = player.y;
    minY = Math.max(minY, playerY);
  }

  const alien = aliens[0];
  const { width: alienWidth } = alien;
  const alienBulletWidth = alienWidth / 4;
  const alienBulletHeight = alienBulletWidth;

  const potentiaThreatAliens = aliens.filter((alien) => alien.y < minY);
  if (potentiaThreatAliens.length === 0) return;

  const randomAlien =
    potentiaThreatAliens[
      Math.floor(Math.random() * potentiaThreatAliens.length)
    ];

  const alienBulletX =
    randomAlien.x + randomAlien.width / 2 - alienBulletWidth / 2;
  const alienBulletY = randomAlien.y + randomAlien.height;

  const randomBulletVy = Math.floor(
    randomAlien.height / 4 + (Math.random() * randomAlien.height) / 4
  );

  const newAlienBullet = new AlienBullet(
    randomAlien,
    alienBulletWidth,
    alienBulletHeight,
    alienBulletX,
    alienBulletY,
    randomBulletVy
  );
  rooms[roomId].alienBullets.push(newAlienBullet);
};
