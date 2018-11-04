class Curve {
  constructor(cx, cy, w, timesX, timesY) {
    this.cx = cx
    this.cy = cy
    this.w = w
    this.timesX = timesX
    this.timesY = timesY
    this.points = []
  }

  update(angle) {
    this.points.push(createVector(cos(angle * this.timesX), sin(angle * this.timesY)))
  }

  show() {
    push()
    translate(this.cx, this.cy)
    stroke(255, 0, 255, 200)
    strokeWeight(1)
    this.points.forEach(p => (
      point(p.x * this.w / 2, p.y * this.w / 2)
    ))
    stroke(255, 0, 255)
    strokeWeight(4)
    const currentX = this.points[this.points.length - 1].x * this.w / 2
    const currentY = this.points[this.points.length - 1].y * this.w / 2
    point(currentX, currentY)
    pop()
  }
}