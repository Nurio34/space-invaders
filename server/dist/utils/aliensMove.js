"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliensMove = void 0;
const aliensMove = (room) => {
    const { width: canvasWidth, height: canvasHeight } = room.canvasSize;
    room.aliens = room.aliens.filter((alien) => {
        alien.move(canvasWidth);
        return alien.y < canvasHeight;
    });
};
exports.aliensMove = aliensMove;
