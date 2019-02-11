class Bird {
  constructor(brain) {
    this.pos = createVector(64, height / 2)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)
    this.r = 16
    this.gravity = createVector(0, 0.8)
    this.score = 0
    this.fitness = 0
    if (brain) {
      this.brain = brain
    } else {
      this.brain = this.createBrain()
    }
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  up() {
    this.applyForce(createVector(0, -12))
  }

  update() {
    this.score++
    this.applyForce(this.gravity)
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
    fill(255, 100)
    stroke(255)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }

  mutate() {
    if (random() < 0.1) {
      this.brain = this.createBrain()
    }
  }

  think(pipes) {
    let closest = null
    let closestDist = Infinity
    pipes.forEach(pipe => {
      const d = (pipe.x + pipe.w) - this.pos.x
      if (d < closestDist && d > 0) {
        closest = pipe
        closestDist = d
      }
    })

    let input = []
    input[0] = this.pos.y / innerWidth
    input[1] = closest.top / height
    input[2] = closest.bottom / height
    input[3] = closest.x / width
    input[4] = this.velocity.y / 10

    tf.tidy(() => {
      const xs = tf.tensor2d([input])
      const ys = this.brain.predict(xs)
      let y_values = ys.dataSync();
      if (y_values[0] > y_values[1]) {
        this.up()
      }
    })
  }

  offscreen() {
    return (this.pos.y > height || this.pos.y < 0);
  }

  createBrain() {
    let model = tf.sequential();
    let hidden = tf.layers.dense({
      inputShape: [5],
      units: 8,
      activation: 'sigmoid'
    });
    let output = tf.layers.dense({
      units: 2,
      activation: 'sigmoid'
    });
    model.add(hidden);
    model.add(output);

    const optimizer = tf.train.adam(0.2);
    model.compile({
      optimizer: optimizer,
      loss: 'meanSquaredError'
    })
    return model
  }
}