"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveRequestListener = void 0;
const leaveRequestListener = (rooms, socket, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals) => {
    socket.on("leaveRequest", ({ roomId, socketId }) => {
        const room = rooms[roomId];
        if (!room)
            return;
        delete room.players[socketId];
        socket.leave(roomId);
        // Check if room is now empty
        const isRoomEmpty = Object.keys(room.players).length === 0;
        if (isRoomEmpty) {
            // Clean up intervals
            clearInterval(gameLoopIntervals[roomId]);
            clearInterval(alienSpawnIntervals[roomId]);
            clearInterval(alienBulletSpawnIntervals[roomId]);
            delete gameLoopIntervals[roomId];
            delete alienSpawnIntervals[roomId];
            delete alienBulletSpawnIntervals[roomId];
            delete rooms[roomId];
            console.log(`Room ${roomId} deleted`);
            socket.emit("leave");
        }
        else {
            console.log(`Player ${socketId} left room ${roomId}`);
        }
    });
};
exports.leaveRequestListener = leaveRequestListener;
