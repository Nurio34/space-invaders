"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulletsMove = void 0;
const bulletsMove = (room) => {
    room.bullets = room.bullets.filter((bullet) => {
        bullet.move();
        return bullet.y > bullet.height * -1;
    });
};
exports.bulletsMove = bulletsMove;
