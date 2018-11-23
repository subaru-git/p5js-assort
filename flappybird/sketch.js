let bird
let pipes = []
let gravity
let score = 0

function setup() {
  createCanvas(400, 600)
  bird = new Bird()
  gravity = createVector(0, 0.5)
  pipes.push(new Pipe())
}

function draw() {
  background(51)

  if (frameCount % 75 === 0) {
    pipes.push(new Pipe())
  }

  if (keyIsPressed) {
    bird.up()
  }

  bird.update()
  bird.show()

  let hit = false
  pipes = pipes.filter(pipe => {
    if (pipe.hits(bird)) {
      hit = true
    }
    pipe.update()
    pipe.show(pipe.hits(bird))
    if (pipe.x < -pipe.w) {
      return false
    }
    return true
  })

  if (hit) {
    score -= 50
  } else {
    score++
  }
  fill(255, 0, 255);
  textSize(16);
  text(score, width / 2, 25);
  score = constrain(score, 0, score);
}