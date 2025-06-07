"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePlayerSize = void 0;
const handlePlayerSize = (canvasWidth) => {
    const playerIdealSize = 32;
    const playerSize = Math.max(canvasWidth / 30, playerIdealSize);
    return playerSize;
};
exports.handlePlayerSize = handlePlayerSize;
