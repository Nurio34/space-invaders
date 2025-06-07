"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.velocity = void 0;
const velocity = (minXSpeed, maxXSpeed, minYSpeed, maxYSpeed) => {
    const randomXSpeed = Math.random() * (maxXSpeed - minXSpeed) + minXSpeed;
    const randomDirection = Math.random() < 0.5 ? -1 : 1;
    const vx = randomXSpeed * randomDirection;
    const vy = Math.random() * (maxYSpeed - minYSpeed) + minYSpeed;
    return { vx, vy };
};
exports.velocity = velocity;
