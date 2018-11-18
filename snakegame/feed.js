class Feed {
  constructor(snake, cols, rows, w) {
    const target = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const vec = createVector(x, y)
        if (!snake.body.includes(vec)) {
          target.push(vec)
        }
      }
    }
    if (target.length) {
      this.pos = random(target)
    } else {
      console.log('GAME COMPLETE');
    }
    this.w = w
  }

  show() {
    fill(200, 150, 150)
    noStroke()
    const x = this.pos.x * this.w + this.w / 2
    const y = this.pos.y * this.w + this.w / 2
    ellipse(x, y, this.w - 4, this.w - 4)
  }
}