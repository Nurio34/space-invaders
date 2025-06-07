"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectListener = void 0;
const disconnectListener = (rooms, socket, io, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals) => {
    socket.on("disconnect", () => {
        for (const roomId in rooms) {
            const room = rooms[roomId];
            if (room.players[socket.id]) {
                console.log(`${room.players[socket.id].id} left the room`);
                delete room.players[socket.id];
                if (Object.keys(room.players).length === 0) {
                    clearInterval(gameLoopIntervals[roomId]);
                    clearInterval(alienSpawnIntervals[roomId]);
                    clearInterval(alienBulletSpawnIntervals[roomId]);
                    delete gameLoopIntervals[roomId];
                    delete alienSpawnIntervals[roomId];
                    delete alienBulletSpawnIntervals[roomId];
                    delete rooms[roomId];
                    console.log(`Room "${roomId}" deleted because it has no players.`);
                }
                else {
                    io.to(roomId).emit("gameState", room);
                }
                break;
            }
        }
    });
};
exports.disconnectListener = disconnectListener;
