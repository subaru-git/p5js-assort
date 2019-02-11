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
    if (this.traced) {
      stroke(this.color);
      strokeWeight(4);
      noFill();
      beginShape();
      if (this.fromup) {
        const beginx = this.x * this.w + this.w / 2;
        const beginy = this.y * this.h;
        vertex(beginx, beginy);
        if (this.right) {
          const beginx = this.x * this.w + this.w / 2;
          const beginy = this.y * this.h + this.h / 2;
          const endx = this.x * this.w + this.w;
          const endy = this.y * this.h + this.h / 2;
          vertex(beginx, beginy);
          vertex(endx, endy);
        } else if (this.left) {
          const beginx = this.x * this.w + this.w / 2;
          const beginy = this.y * this.h + this.h / 2;
          const endx = this.x * this.w;
          const endy = this.y * this.h + this.h / 2;
          vertex(beginx, beginy);
          vertex(endx, endy);
        } else {
          const endx = this.x * this.w + this.w / 2;
          const endy = this.y * this.h + this.h;
          vertex(endx, endy);
        }
      } else {
        if (this.right) {
          const beginx = this.x * this.w + this.w;
          const beginy = this.y * this.h + this.h / 2;
          const endx = this.x * this.w + this.w / 2;
          const endy = this.y * this.h + this.h / 2;
          vertex(beginx, beginy);
          vertex(endx, endy);
        } else if (this.left) {
          const beginx = this.x * this.w;
          const beginy = this.y * this.h + this.h / 2;
          const endx = this.x * this.w + this.w / 2;
          const endy = this.y * this.h + this.h / 2;
          vertex(beginx, beginy);
          vertex(endx, endy);
        }
        const endx = this.x * this.w + this.w / 2;
        const endy = this.y * this.h + this.h;
        vertex(endx, endy);
      }
      endShape();
    }
  }
}
