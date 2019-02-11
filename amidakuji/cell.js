class cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.left = null;
    this.right = null;
    this.traced = false;
    this.fromup = false;
    this.color = color(255, 0, 0);
  }

  setLeft(neighbor) {
    this.left = neighbor;
  }

  setRight(neighbor) {
    this.right = neighbor;
  }

  trace(fromup, col) {
    this.traced = true;
    this.fromup = fromup;
    this.color = col;
  }

  untrace() {
    this.traced = false;
    this.fromup = false;
    this.color = color(255, 0, 0);
  }

  initialize() {
    this.traced = false;
    this.fromup = false;
    this.left = null;
    this.right = null;
    this.color = color(255, 0, 0);
  }

  draw() {
    stroke(255, 0);
    strokeWeight(4);
    const beginx = this.x * this.w + this.w / 2;
    const beginy = this.y * this.h;
    const endx = this.x * this.w + this.w / 2;
    const endy = this.y * this.h + this.h;
    line(beginx, beginy, endx, endy);
    if (this.right) {
      const beginx = this.x * this.w + this.w / 2;
      const beginy = this.y * this.h + this.h / 2;
      const endx = this.x * this.w + this.w;
      const endy = this.y * this.h + this.h / 2;
      line(beginx, beginy, endx, endy);
    }
    if (this.left) {
      const beginx = this.x * this.w;
      const beginy = this.y * this.h + this.h / 2;
      const endx = this.x * this.w + this.w / 2;
      const endy = this.y * this.h + this.h / 2;
      line(beginx, beginy, endx, endy);
    }
    if (this.traced) {
      stroke(this.color);
      strokeWeight(4);
      if (this.fromup) {
        const beginx = this.x * this.w + this.w / 2;
        const beginy = this.y * this.h;
        const endx = this.x * this.w + this.w / 2;
        const endy = this.y * this.h + this.h / 2;
        line(beginx, beginy, endx, endy);
      }
      if (this.right) {
        const beginx = this.x * this.w + this.w / 2;
        const beginy = this.y * this.h + this.h / 2;
        const endx = this.x * this.w + this.w;
        const endy = this.y * this.h + this.h / 2;
        line(beginx, beginy, endx, endy);
      } else if (this.left) {
        const beginx = this.x * this.w;
        const beginy = this.y * this.h + this.h / 2;
        const endx = this.x * this.w + this.w / 2;
        const endy = this.y * this.h + this.h / 2;
        line(beginx, beginy, endx, endy);
      }
      if (!this.fromup || (this.right === null && this.left === null)) {
        const beginx = this.x * this.w + this.w / 2;
        const beginy = this.y * this.h + this.h / 2;
        const endx = this.x * this.w + this.w / 2;
        const endy = this.y * this.h + this.h;
        line(beginx, beginy, endx, endy);
      }
    }
  }
}
