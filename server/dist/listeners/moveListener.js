"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveListener = void 0;
const detectPlayer_1 = require("../utils/detectPlayer");
const moveListener = (rooms, socket) => {
    socket.on("move", ({ roomId, socketId, x, y }) => {
        const { width: canvasWidth, height: canvasHeight } = rooms[roomId].canvasSize;
        const player = (0, detectPlayer_1.detectPlayer)(rooms, roomId, socketId);
        if (!Boolean(player))
            return;
        if (player.isPlayerDead())
            return;
        player.move(x, y, canvasWidth, canvasHeight);
    });
};
exports.moveListener = moveListener;
