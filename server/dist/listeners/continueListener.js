"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.continueListener = void 0;
const continueListener = (rooms, socket) => {
    socket.on("continue", ({ roomId, socketId }) => {
        const player = rooms[roomId].players[socketId];
        player.revieve();
    });
};
exports.continueListener = continueListener;
