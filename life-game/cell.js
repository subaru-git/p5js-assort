class Cell {
  constructor(x, y, w) {
    this.x = x
    this.y = y
    this.w = w
    this.survive = false
    this.generation = 0
  }

  birth() {
    this.survive = true
    this.generation = 0
  }

  die() {
    this.survive = false
  }

  show() {
    if (this.survive) {
      this.generation++
      fill(255, 0, 0, 255 * 0.01 * this.generation + 100)
    } else {
      fill(0)
    }
    noStroke()
    rect(this.x * this.w + 1, this.y * this.w + 1, this.w - 2, this.w - 2 )
  }
}