"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alienSpawner = void 0;
const aliens_1 = require("../../gameConfig/aliens");
const alien_1 = require("../../objects/alien");
const position_1 = require("./utils/position");
const range_1 = require("./utils/range");
const size_1 = require("./utils/size");
const velocity_1 = require("./utils/velocity");
const alienSpawner = (rooms, roomId) => {
    const room = rooms[roomId];
    if (!room)
        return;
    const { name, color, score, life, widthParameter, ratio, minXSpeed, maxXSpeed, minYSpeed, maxYSpeed, } = aliens_1.aliens[Math.floor(Math.random() * aliens_1.aliens.length)];
    const { width: canvasWidth } = room.canvasSize;
    const { size: playerSize } = Object.values(room.players)[0];
    const { alienWidth, alienHeight } = (0, size_1.size)(playerSize, widthParameter, ratio);
    const { minX, maxX } = (0, range_1.range)(canvasWidth, alienWidth);
    const { x, y } = (0, position_1.position)(canvasWidth, alienWidth, alienHeight, minX, maxX);
    const { vx, vy } = (0, velocity_1.velocity)(minXSpeed, maxXSpeed, minYSpeed, maxYSpeed);
    const newAlien = new alien_1.Alien(name, color, score, life, alienWidth, alienHeight, minX, maxX, x, y, vx, vy);
    room.aliens.push(newAlien);
};
exports.alienSpawner = alienSpawner;
