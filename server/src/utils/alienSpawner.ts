import { Alien } from "../objects/alien";
import { RoomType } from "../types/game/server";

export const alienSpawner = (
  rooms: Record<string, RoomType>,
  roomId: string
) => {
  const room = rooms[roomId];
  console.log(rooms);

  if (!room) return;

  const { width: canvasWidth } = room.canvasSize;
  const { size: playerSize } = Object.values(room.players)[0];

  const alienSize = playerSize / 2;

  const canvasCenter = canvasWidth / 2;

  const maxRangeFromCenter = Math.floor(
    Math.random() * (canvasCenter - alienSize + 1)
  );

  const minX = Math.max(0, canvasCenter - maxRangeFromCenter);
  const maxX = Math.min(
    canvasWidth - alienSize,
    canvasCenter + maxRangeFromCenter
  );
  let randomX = Math.floor(minX + Math.random() * (maxX - minX));
  randomX = Math.max(0, Math.min(canvasWidth - alienSize, randomX));
  if (minX >= maxX) {
    randomX = canvasCenter; // fallback spawn
  }

  const y = alienSize * -1;

  const minSpeed = 0.1;
  const randomVx = minSpeed + (Math.random() * alienSize) / 2 + 1; // or whatever range you want
  const randomVy = 1;

  const newAlien = new Alien(
    alienSize,
    alienSize,
    minX,
    maxX,
    randomX,
    y,
    randomVx,
    randomVy
  );

  room.aliens.push(newAlien);
};
