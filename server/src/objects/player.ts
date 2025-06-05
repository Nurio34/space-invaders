export class Player {
  id: string;
  name: string;
  size: number;
  x: number;
  y: number;
  score = 0;

  constructor(id: string, name: string, size: number, x: number, y: number) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number, canvasWidth: number, canvasHeight: number) {
    if (x > canvasWidth - this.size) this.x = canvasWidth - this.size;
    else this.x = x;

    if (y > canvasHeight - this.size) this.y = canvasHeight - this.size;
    else this.y = y;

    if (y < canvasHeight / 2) this.y = canvasHeight / 2;
  }
}
