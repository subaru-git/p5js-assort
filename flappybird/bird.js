class Bird {
  constructor() {
    this.pos = createVector(50, height / 2)
    this.velocity = createVector()
    this.acceleration = createVector()
    this.r = 16
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  up() {
    this.applyForce(createVector(0, -5))
  }

  update() {
    this.applyForce(gravity)
    this.pos.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(4)
    this.acceleration.mult(0)
    if (this.pos.y > height) {
      this.pos.y = height
      this.velocity.mult(0)
    }
  }

  show() {
    fill(255)
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
}