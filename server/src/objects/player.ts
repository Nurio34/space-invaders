import { MoveArrayType, VelocityType } from "../types/game/client";

export class Player {
  id: string;
  name: string;
  maxLife: number;
  life: number;
  size: number;
  moveArray: MoveArrayType;
  velocity: VelocityType;
  x: number;
  y: number;
  score: number;
  isShooting: boolean;
  lastShotTime: number;
  shootCooldown: number;

  constructor(
    id: string,
    name: string,
    maxLife: number,
    size: number,
    x: number,
    y: number
  ) {
    this.id = id;
    this.name = name;
    this.maxLife = maxLife;
    this.life = 50;
    this.size = size;
    this.moveArray = [];
    this.velocity = { x: 0, y: 0 };
    this.x = x;
    this.y = y;
    this.score = 0;
    this.isShooting = false;
    this.lastShotTime = 0;
    this.shootCooldown = 100;
  }

  move(canvasWidth: number, canvasHeight: number) {
    if (this.moveArray.includes("right")) {
      this.x += (this.velocity.x * this.size) / 8;
    }
    if (this.moveArray.includes("left")) {
      this.x -= (this.velocity.x * this.size) / 8;
    }
    if (this.moveArray.includes("up")) {
      this.y -= (this.velocity.y * this.size) / 8;
    }
    if (this.moveArray.includes("down")) {
      this.y += (this.velocity.y * this.size) / 8;
    }

    this.x = Math.max(0, Math.min(canvasWidth - this.size, this.x));
    this.y = Math.max(0, Math.min(canvasHeight - this.size, this.y));
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
