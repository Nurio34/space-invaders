"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = void 0;
class Bullet {
    constructor(id, playerSize, width, height, x, y) {
        this.score = 0;
        this.id = id;
        this.playerSize = playerSize;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.vy = 0.1;
    }
    move() {
        this.y = this.y - this.height * 2;
    }
}
exports.Bullet = Bullet;
