import { Alien } from "../objects/alien";
import { RoomType } from "../types/game/server";

export const alienSpawner = (
  rooms: Record<string, RoomType>,
  roomId: string,
  socketId: string
) => {
  const room = rooms[roomId];
  if (!room) return;

  const { width: canvasWidth } = room.canvasSize;
  const { size: playerSize } = room.players[socketId];

  const alienSize = playerSize / 2;

  const canvasCenter = canvasWidth / 2;

  const maxRangeFromCenter = Math.floor(
    Math.random() * canvasCenter - alienSize + 1
  );
  const minX = Math.max(0, canvasCenter - maxRangeFromCenter);
  const maxX = Math.min(
    canvasWidth - alienSize,
    canvasCenter + maxRangeFromCenter
  );
  let randomX = Math.floor(minX + Math.random() * (maxX - minX + 1));
  const y = alienSize * -1;

  const minSpeed = 1;
  const randomVx = minSpeed + Math.random() * alienSize + 1; // or whatever range you want
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
