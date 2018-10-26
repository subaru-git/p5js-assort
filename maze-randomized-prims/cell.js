class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.wall = true;
    this.now = false;
    this.stack = false;
  }

  show() {
    noStroke();
    if (this.now) {
      fill(255, 0, 0)
    } else if (this.stack){
      fill(0, 255, 255)
    } else if (this.wall){
      fill(0)
    } else {
      fill(255)
    }
    rect(this.x * this.w + 1, this.y * this.w + 1, this.w - 1, this.w - 1);
  }
}