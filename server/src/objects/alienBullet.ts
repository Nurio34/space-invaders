import { Alien } from "./alien";

export class AlienBullet {
  alien: Alien;
  width: number;
  height: number;
  x: number;
  y: number;
  vy: number;

  constructor(
    alien: Alien,
    width: number,
    height: number,
    x: number,
    y: number,
    vy: number
  ) {
    this.alien = alien;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vy = vy;
  }

  move() {
    this.y += this.vy;
  }
}
