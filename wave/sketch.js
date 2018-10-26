let angle = 0

function setup() {
  createCanvas(800, 600)
  background(255)
}

function draw() {
  angle += 0.01
  noFill()
  stroke(51)
  strokeWeight(1)
  translate(0, height / 2)
  const x = map(angle, 0, TWO_PI, 0, 800)
  const y = map(sin(angle), -1, 1, -200, 200)
  point(x, y)
  if( angle > width) {
    noLoop()
  }
}