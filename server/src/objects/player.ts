export class Player {
  id: string;
  name: string;
  maxLife: number;
  life: number;
  size: number;
  x: number;
  y: number;
  score: number;

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
    this.life = 10;
    this.size = size;
    this.x = x;
    this.y = y;
    this.score = 0;
  }

  move(x: number, y: number, canvasWidth: number, canvasHeight: number) {
    if (x > canvasWidth - this.size) this.x = canvasWidth - this.size;
    else this.x = x;

    if (y > canvasHeight - this.size) this.y = canvasHeight - this.size;
    else this.y = y;

    if (y < canvasHeight / 2) this.y = canvasHeight / 2;
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
