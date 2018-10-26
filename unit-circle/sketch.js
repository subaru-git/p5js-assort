let angle = 0
const points = []

function setup() {
  createCanvas(800, 600)
  frameRate(5)
  colorMode(HSB, 100)
}

function draw() {
  angle -= 0.5
  background(255)
  noFill()
  translate(width / 2, height / 2)
  const x = map(cos(angle), -1, 1, -200, 200)
  const y = map(sin(angle), -1, 1, -200, 200)
  points.push(createVector(x, y))
  if (points.length > 5) {
    points.shift()
  }
  for (let i = points.length -1; i >= 0; i--) {
    stroke(i * 10, i * 10, 100)
    strokeWeight((i + 1) * 4)
    point(points[i].x, points[i].y)
  }
}