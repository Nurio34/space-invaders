"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(id, name, maxLife, size, x, y) {
        this.id = id;
        this.name = name;
        this.maxLife = maxLife;
        this.life = 10;
        this.size = size;
        this.x = x;
        this.y = y;
        this.score = 0;
    }
    move(x, y, canvasWidth, canvasHeight) {
        if (x > canvasWidth - this.size)
            this.x = canvasWidth - this.size;
        else
            this.x = x;
        if (y > canvasHeight - this.size)
            this.y = canvasHeight - this.size;
        else
            this.y = y;
        if (y < canvasHeight / 2)
            this.y = canvasHeight / 2;
    }
    decreaseLife() {
        this.life--;
    }
    isPlayerDead() {
        return this.life <= 0;
    }
    revieve() {
        this.score = 0;
        this.life = this.maxLife;
    }
}
exports.Player = Player;
