"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPlayer = void 0;
const detectPlayer = (rooms, roomId, socketId) => {
    const room = rooms[roomId];
    const player = room.players[socketId];
    return player;
};
exports.detectPlayer = detectPlayer;
