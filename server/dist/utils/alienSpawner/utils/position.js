"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.position = void 0;
const position = (canvasWidth, alienWidth, alienHeight, minX, maxX) => {
    const canvasCenter = canvasWidth / 2;
    let randomX = Math.floor(minX + Math.random() * (maxX - minX));
    randomX = Math.max(0, Math.min(canvasWidth - alienWidth, randomX));
    if (minX >= maxX) {
        randomX = canvasCenter; // fallback spawn
    }
    const y = alienHeight * -1;
    return { x: randomX, y };
};
exports.position = position;
