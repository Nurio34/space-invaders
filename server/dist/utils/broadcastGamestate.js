"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastGamestate = void 0;
const broadcastGamestate = (room, roomId, io) => {
    io.to(roomId).emit("gameState", room);
};
exports.broadcastGamestate = broadcastGamestate;
