"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliensBulletsMove = void 0;
const aliensBulletsMove = (room) => {
    const { width: canvasWidth, height: canvasHeight } = room.canvasSize;
    room.alienBullets = room.alienBullets.filter((alienBullet) => {
        alienBullet.move();
        return alienBullet.y < canvasHeight;
    });
};
exports.aliensBulletsMove = aliensBulletsMove;
