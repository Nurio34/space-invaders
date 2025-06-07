export class Alien {
  name: string;
  color: string;
  score: number;
  life: number;
  isPassBorder: boolean;
  width: number;
  height: number;
  minX: number;
  maxX: number;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(
    name: string,
    color: string,
    score: number,
    life: number,
    width: number,
    height: number,
    minX: number,
    maxX: number,
    x: number,
    y: number,
    vx: number,
    vy: number
  ) {
    this.name = name;
    this.color = color;
    this.score = score;
    this.life = life;
    this.isPassBorder = false;
    this.width = width;
    this.height = height;
    this.minX = minX;
    this.maxX = maxX;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  move(canvasWidth: number) {
    this.y += this.vy;

    const center = canvasWidth / 2;
    const maxRange = center - this.minX;
    const distanceFromCenter = Math.abs(this.x - center);
    const normalized = distanceFromCenter / maxRange;

    const acc = 0.1 + (1 - normalized) * 0.9;

    // Check and reverse direction if at bounds
    if (this.x >= this.maxX - this.width / 2) {
      // this.x = this.maxX - 1; // Push slightly inward
      this.vx = -Math.abs(this.vx);
    } else if (this.x <= this.minX + this.width / 2) {
      // this.x = this.minX + 1; // Push slightly inward
      this.vx = Math.abs(this.vx);
    }

    this.x += this.vx * acc;
  }
}
