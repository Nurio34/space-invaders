"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmptyRoom = void 0;
const handleEmptyRoom = (room, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals, roomId) => {
    if (!room) {
        clearInterval(gameLoopIntervals[roomId]);
        delete gameLoopIntervals[roomId];
        clearInterval(alienSpawnIntervals[roomId]);
        delete alienSpawnIntervals[roomId];
        clearInterval(alienBulletSpawnIntervals[roomId]);
        delete alienBulletSpawnIntervals[roomId];
        return;
    }
};
exports.handleEmptyRoom = handleEmptyRoom;
