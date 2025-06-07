"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPlayerPlayerCollision = void 0;
const detectPlayerPlayerCollision = (room) => {
    const playerIds = Object.keys(room.players);
    for (let i = 0; i < playerIds.length; i++) {
        const playerA = room.players[playerIds[i]];
        if (playerA.isPlayerDead())
            continue;
        for (let j = i + 1; j < playerIds.length; j++) {
            const playerB = room.players[playerIds[j]];
            if (playerB.isPlayerDead())
                continue;
            const isColliding = playerA.x < playerB.x + playerB.size &&
                playerA.x + playerA.size > playerB.x &&
                playerA.y < playerB.y + playerB.size &&
                playerA.y + playerA.size > playerB.y;
            if (isColliding) {
                const wasAliveA = playerA.life > 0;
                const wasAliveB = playerB.life > 0;
                playerA.decreaseLife();
                playerB.decreaseLife();
                console.log(`Collision detected between ${playerIds[i]} and ${playerIds[j]}`);
                // Check if any player died due to this collision
                if (wasAliveA && playerA.life <= 0) {
                    console.log(`${playerIds[j]} killed ${playerIds[i]} by collision`);
                    // Optional: increment kills for playerB
                    // playerB.kills = (playerB.kills || 0) + 1;
                }
                if (wasAliveB && playerB.life <= 0) {
                    console.log(`${playerIds[i]} killed ${playerIds[j]} by collision`);
                    // Optional: increment kills for playerA
                    // playerA.kills = (playerA.kills || 0) + 1;
                }
            }
        }
    }
};
exports.detectPlayerPlayerCollision = detectPlayerPlayerCollision;
