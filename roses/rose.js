class Rose {
  constructor(cx, cy, w, k) {
    this.cx = cx
    this.cy = cy
    this.w = w
    this.k = k
    this.points = []
  }

  update(angle) {
    const r = (this.w / 2) * cos(this.k * angle)
    const x = r * cos(angle)
    const y = r * sin(angle)
    this.points.push(createVector(x, y))
  }

  show() {
    push()
    translate(this.cx, this.cy)
    stroke(255, 0, 0, 200)
    strokeWeight(1)
    this.points.forEach(p => {
      point(p.x, p.y)
    })
    pop()
  }
}