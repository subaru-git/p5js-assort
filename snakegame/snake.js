class Snake {
  constructor(x, y, w) {
    this.w = w
    this.body = []
    this.body.push(createVector(x, y))
    this.direction = createVector(-1, 0)
    this.col = color(200, 200, 200, 200)
  }

  move() {
    const top = this.body[0].copy().add(this.direction)
    this.body.pop()
    this.body = [top, ...this.body]
  }

  turn(x, y) {
    const next = this.body[0].copy().add(createVector(x, y))
    const count = this.body.filter(b => (b.x === next.x && b.y === next.y))
    if (count.length === 0) {
      this.direction = createVector(x, y)
    }
  }

  eat(feed) {
    const next = this.body[0].copy().add(this.direction)
    if (feed.pos.x === next.x && feed.pos.y === next.y) {
      this.body = [next, ...this.body]
      return true
    }
    return false
  }

  edges(cols, rows) {
    const top = this.body[0]
    const count = this.body.filter(b => (top.x === b.x && top.y === b.y))
    if (top.x < 0 || cols <= top.x || top.y < 0 || rows <= top.y || count.length > 1) {
      this.col = color(255, 0, 0)
      return true
    }
    return false
  }

  show() {
    fill(this.col)
    noStroke()
    this.body.forEach(b => {
      const x = b.x * this.w
      const y = b.y * this.w
      rect(x, y, this.w, this.w)
    });
  }
}