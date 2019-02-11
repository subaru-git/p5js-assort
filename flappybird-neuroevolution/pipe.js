class Pipe {
  constructor() {
    this.w = 40
    this.x = width
    this.top = random(100, height / 2)
    this.bottom = this.top + 200
  }

  hits(b) {
    if ((b.pos.x > this.x) && (b.pos.x < (this.x + this.w))) {
      if ((b.pos.y < (this.top + b.r)) || (b.pos.y > (this.bottom - b.r))) {
        return true;
      }
    }
    return false;
  }

  update() {
    this.x -= 3
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }

  show(hit) {
    if (hit) {
      fill(255, 0, 0)
    } else {
      fill(200)
    }
    noStroke()
    rect(this.x, 0, this.w, this.top)
    rect(this.x, this.bottom, this.w, height)
  }
}