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

  move(dx: number) {
    this.x += dx;
  }
}
