export class Alien {
  width: number;
  height: number;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(
    width: number,
    height: number,
    x: number,
    y: number,
    vx: number,
    vy: number
  ) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  move() {
    this.y = this.y - this.height;
  }
}
