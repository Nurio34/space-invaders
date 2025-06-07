import { aliens } from "../../gameConfig/aliens";
import { Alien } from "../../objects/alien";
import { RoomType } from "../../types/game/server";
import { position } from "./utils/position";
import { range } from "./utils/range";
import { size } from "./utils/size";
import { velocity } from "./utils/velocity";

export const alienSpawner = (
  rooms: Record<string, RoomType>,
  roomId: string
) => {
  const room = rooms[roomId];

  if (!room) return;

  const {
    name,
    color,
    score,
    life,
    widthParameter,
    ratio,
    minXSpeed,
    maxXSpeed,
    minYSpeed,
    maxYSpeed,
  } = aliens[Math.floor(Math.random() * aliens.length)];

  const { width: canvasWidth } = room.canvasSize;
  const { size: playerSize } = Object.values(room.players)[0];

  const { alienWidth, alienHeight } = size(playerSize, widthParameter, ratio);
  const { minX, maxX } = range(canvasWidth, alienWidth);
  const { x, y } = position(canvasWidth, alienWidth, alienHeight, minX, maxX);
  const { vx, vy } = velocity(minXSpeed, maxXSpeed, minYSpeed, maxYSpeed);

  const newAlien = new Alien(
    name,
    color,
    score,
    life,
    alienWidth,
    alienHeight,
    minX,
    maxX,
    x,
    y,
    vx,
    vy
  );

  room.aliens.push(newAlien);
};
