"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectBulletAlienCollision = void 0;
const detectBulletAlienCollision = (room) => {
    const deadAliens = new Set();
    room.bullets = room.bullets.filter((bullet) => {
        const hitIndex = room.aliens.findIndex((alien) => {
            return (bullet.x < alien.x + alien.width &&
                bullet.x + bullet.width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y);
        });
        if (hitIndex !== -1) {
            const hitAlien = room.aliens[hitIndex];
            hitAlien.life -= 1;
            if (hitAlien.life <= 0) {
                deadAliens.add(hitIndex);
                // ✅ Use bullet.ownerId to get the player and award points
                const player = room.players[bullet.id];
                if (player) {
                    player.score += hitAlien.score;
                }
            }
            return false; // remove bullet
        }
        return true; // keep bullet
    });
    // Remove all dead aliens
    room.aliens = room.aliens.filter((_, index) => !deadAliens.has(index));
};
exports.detectBulletAlienCollision = detectBulletAlienCollision;
