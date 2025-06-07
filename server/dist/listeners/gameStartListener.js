"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameStartListener = void 0;
const player_1 = require("../objects/player");
const handlePlayerSize_1 = require("../utils/handlePlayerSize");
const gameLoop_1 = require("../gameLoop");
const gameStartListener = (rooms, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals, io, socket) => {
    socket.on("gameStart", ({ roomId, socketId, name, maxPlayers, canvasSize }) => {
        socket.join(roomId);
        // const id = crypto.randomUUID();
        // const botPlayer = new Player(id, "DiffieHellmanGroup", 3, 32, 900, 500);
        if (!rooms[roomId]) {
            rooms[roomId] = {
                id: roomId,
                maxPlayers,
                canvasSize,
                // players: { [id]: botPlayer },
                players: {},
                bullets: [],
                aliens: [],
                alienBullets: [],
            };
        }
        const maxLife = 3;
        const playerSize = (0, handlePlayerSize_1.handlePlayerSize)(canvasSize.width);
        const newPlayer = new player_1.Player(socket.id, name, maxLife, playerSize, canvasSize.width / 2 - playerSize / 2, canvasSize.height - 2 * playerSize);
        rooms[roomId].players[socket.id] = newPlayer;
        (0, gameLoop_1.gameLoop)(rooms, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals, io, roomId, socketId);
    });
};
exports.gameStartListener = gameStartListener;
