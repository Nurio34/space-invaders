"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectAlienBulletPlayerCollision = void 0;
const detectAlienBulletPlayerCollision = (room) => {
    room.alienBullets = room.alienBullets.filter((bullet) => {
        for (const playerId in room.players) {
            const player = room.players[playerId];
            if (player.isPlayerDead())
                continue;
            const hit = bullet.x < player.x + player.size &&
                bullet.x + bullet.width > player.x &&
                bullet.y < player.y + player.size &&
                bullet.y + bullet.height > player.y;
            if (hit) {
                player.decreaseLife();
                console.log(`Player ${playerId} was hit by an alien bullet.`);
                // Optional: apply damage logic here
                // player.health -= 1;
                // if (player.health <= 0) delete room.players[playerId];
                return false; // Remove the bullet
            }
        }
        return true; // Keep bullet if it hit no player
    });
};
exports.detectAlienBulletPlayerCollision = detectAlienBulletPlayerCollision;
