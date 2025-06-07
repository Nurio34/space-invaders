"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectAlienPassBorder = void 0;
const detectAlienPassBorder = (room) => {
    const canvasHeight = room.canvasSize.height;
    for (const alien of room.aliens) {
        if (alien.y + alien.height >= canvasHeight) {
            if (alien.isPassBorder)
                continue;
            Object.values(room.players).forEach((player) => {
                if (!player.isPlayerDead()) {
                    player.decreaseLife();
                }
            });
            alien.isPassBorder = true;
        }
    }
};
exports.detectAlienPassBorder = detectAlienPassBorder;
