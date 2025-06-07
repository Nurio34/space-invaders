"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketSetup = void 0;
const resetCanvasListener_1 = require("./listeners/resetCanvasListener");
const gameStartListener_1 = require("./listeners/gameStartListener");
const moveListener_1 = require("./listeners/moveListener");
const shotListener_1 = require("./listeners/shotListener");
const disconnectListener_1 = require("./listeners/disconnectListener");
const continueListener_1 = require("./listeners/continueListener");
const leaveRequestListener_1 = require("./listeners/leaveRequestListener");
const rooms = {};
const gameLoopIntervals = {};
const alienSpawnIntervals = {};
const alienBulletSpawnIntervals = {};
const socketSetup = (io) => {
    io.on("connection", (socket) => {
        console.log(`Player connected with id: ${socket.id}`);
        (0, resetCanvasListener_1.resetCanvasListener)(rooms, socket);
        (0, gameStartListener_1.gameStartListener)(rooms, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals, io, socket);
        (0, moveListener_1.moveListener)(rooms, socket);
        (0, shotListener_1.shotListener)(rooms, socket);
        (0, continueListener_1.continueListener)(rooms, socket);
        (0, leaveRequestListener_1.leaveRequestListener)(rooms, socket, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals);
        //! ***
        //! ***
        (0, disconnectListener_1.disconnectListener)(rooms, socket, io, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals);
    });
};
exports.socketSetup = socketSetup;
