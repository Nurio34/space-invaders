"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameLoop = void 0;
const handleEmptyRoom_1 = require("./utils/handleEmptyRoom");
const bulletsMove_1 = require("./utils/bulletsMove");
const aliensMove_1 = require("./utils/aliensMove");
const detectBulletAlienCollision_1 = require("./utils/detectBulletAlienCollision");
const detectBulletPlayerCollision_1 = require("./utils/detectBulletPlayerCollision");
const detectAlienPlayerCollision_1 = require("./utils/detectAlienPlayerCollision");
const broadcastGamestate_1 = require("./utils/broadcastGamestate");
const alienBulletSpawner_1 = require("./utils/alienBulletSpawner");
const alienBulletsMove_1 = require("./utils/alienBulletsMove");
const detectAlienBulletPlayerCollision_1 = require("./utils/detectAlienBulletPlayerCollision ");
const detectAlienBulletAlienCollision_1 = require("./utils/detectAlienBulletAlienCollision ");
const detectAlienPassBorder_1 = require("./utils/detectAlienPassBorder");
const detectPlayerPlayerCollision_1 = require("./utils/detectPlayerPlayerCollision");
const detectBulletAlienBulletCollision_1 = require("./utils/detectBulletAlienBulletCollision");
const alienSpawner_1 = require("./utils/alienSpawner");
const detectAlienAlienCollision_1 = require("./utils/detectAlienAlienCollision");
const gameLoop = (rooms, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals, io, roomId, socketId) => {
    if (gameLoopIntervals[roomId])
        return; // prevent double-start
    gameLoopIntervals[roomId] = setInterval(() => {
        const room = rooms[roomId];
        (0, handleEmptyRoom_1.handleEmptyRoom)(room, gameLoopIntervals, alienSpawnIntervals, alienBulletSpawnIntervals, roomId);
        if (!room)
            return;
        (0, bulletsMove_1.bulletsMove)(room);
        (0, aliensMove_1.aliensMove)(room);
        (0, alienBulletsMove_1.aliensBulletsMove)(room);
        (0, detectBulletAlienCollision_1.detectBulletAlienCollision)(room);
        (0, detectBulletPlayerCollision_1.detectBulletPlayerCollision)(room);
        (0, detectAlienPlayerCollision_1.detectAlienPlayerCollision)(room);
        (0, detectAlienBulletPlayerCollision_1.detectAlienBulletPlayerCollision)(room);
        (0, detectAlienBulletAlienCollision_1.detectAlienBulletAlienCollision)(room);
        (0, detectBulletAlienBulletCollision_1.detectBulletAlienBulletCollision)(room);
        (0, detectAlienAlienCollision_1.detectAlienAlienCollision)(room);
        //! *** detect alien - alien collision, if there, decresae their life by 1 ***
        //! ***********************
        (0, detectAlienPassBorder_1.detectAlienPassBorder)(room);
        (0, detectPlayerPlayerCollision_1.detectPlayerPlayerCollision)(room);
        (0, broadcastGamestate_1.broadcastGamestate)(room, roomId, io);
    }, 1000 / 60);
    alienSpawnIntervals[roomId] = setInterval(() => {
        (0, alienSpawner_1.alienSpawner)(rooms, roomId);
    }, 3000);
    (0, alienSpawner_1.alienSpawner)(rooms, roomId);
    alienBulletSpawnIntervals[roomId] = setInterval(() => {
        (0, alienBulletSpawner_1.alienBulletSpawner)(rooms, roomId);
    }, 3000);
};
exports.gameLoop = gameLoop;
