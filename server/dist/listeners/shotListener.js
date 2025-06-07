"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shotListener = void 0;
const detectPlayer_1 = require("../utils/detectPlayer");
const bullet_1 = require("../objects/bullet");
const shotListener = (rooms, socket) => {
    socket.on("shot", ({ roomId, socketId }) => {
        const player = (0, detectPlayer_1.detectPlayer)(rooms, roomId, socketId);
        if (!Boolean(player))
            return;
        if (player.isPlayerDead())
            return;
        const { size, x, y } = player;
        const bulletWidth = size / 8;
        const bulletHeight = bulletWidth * 2;
        const newBullet = new bullet_1.Bullet(socketId, size, bulletWidth, bulletHeight, x + size / 2 - bulletWidth / 2, y);
        const room = rooms[roomId];
        room.bullets.push(newBullet);
    });
};
exports.shotListener = shotListener;
