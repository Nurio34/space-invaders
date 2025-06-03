export class Bullet {
  id: string;
  playerSize: number;
  width: number;
  height: number;
  x: number;
  y: number;
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
  }

  move() {
    this.y = this.y - 5;
  }
}
