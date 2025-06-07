"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlienBullet = void 0;
class AlienBullet {
    constructor(alien, width, height, x, y, vy) {
        this.alien = alien;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.vy = vy;
    }
    move() {
        this.y += this.vy;
    }
}
exports.AlienBullet = AlienBullet;
