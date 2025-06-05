export class Bullet {
  id: string;
  playerSize: number;
  width: number;
  height: number;
  x: number;
  y: number;
  vy: number;
  score = 0;

  constructor(
    id: string,
    playerSize: number,
    width: number,
    height: number,
    x: number,
    y: number
  ) {
    this.id = id;
    this.playerSize = playerSize;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vy = 0.1;
  }

  move() {
    this.y = this.y - this.height * 2;
  }
}
