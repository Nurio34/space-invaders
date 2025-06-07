"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectBulletAlienBulletCollision = void 0;
const detectBulletAlienBulletCollision = (room) => {
    const playerBullets = room.bullets;
    const alienBullets = room.alienBullets;
    const collidedPlayerBulletIndexes = new Set();
    const collidedAlienBulletIndexes = new Set();
    for (let i = 0; i < playerBullets.length; i++) {
        const pb = playerBullets[i];
        for (let j = 0; j < alienBullets.length; j++) {
            const ab = alienBullets[j];
            const isColliding = pb.x < ab.x + ab.width &&
                pb.x + pb.width > ab.x &&
                pb.y < ab.y + ab.height &&
                pb.y + pb.height > ab.y;
            if (isColliding) {
                collidedPlayerBulletIndexes.add(i);
                collidedAlienBulletIndexes.add(j);
                const player = room.players[pb.id];
                player.score += 2;
                break; // one collision per player bullet
            }
        }
    }
    // Filter out collided bullets
    room.bullets = playerBullets.filter((_, idx) => !collidedPlayerBulletIndexes.has(idx));
    room.alienBullets = alienBullets.filter((_, idx) => !collidedAlienBulletIndexes.has(idx));
};
exports.detectBulletAlienBulletCollision = detectBulletAlienBulletCollision;
