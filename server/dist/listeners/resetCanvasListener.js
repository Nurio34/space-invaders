"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCanvasListener = void 0;
const detectPlayer_1 = require("../utils/detectPlayer");
const handlePlayerSize_1 = require("../utils/handlePlayerSize");
const resetCanvasListener = (rooms, socket) => {
    socket.on("resetCanvas", ({ roomId, socketId, width, height }) => {
        const room = rooms[roomId];
        room.canvasSize = { width, height };
        const player = (0, detectPlayer_1.detectPlayer)(rooms, roomId, socketId);
        const playerSize = (0, handlePlayerSize_1.handlePlayerSize)(width);
        player.size = playerSize;
        player.x = width / 2 - player.size / 2;
        player.y = height - playerSize * 2;
    });
};
exports.resetCanvasListener = resetCanvasListener;
