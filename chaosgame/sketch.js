let points = []
const pointNum = 10
const percent = 0.9
let current

function setup() {
  createCanvas(600, 600)
  background(0)
  translate(width / 2, height / 2)
  for (let i = 0; i < pointNum; i++) {
    const v = p5.Vector.fromAngle(i * TWO_PI / pointNum)
    v.mult(width / 2 - 50)
    points.push(v)
    stroke(255)
    strokeWeight(1)
    // point(v.x, v.y)
  }
  current = p5.Vector.random2D()
}

function draw() {
  translate(width / 2, height / 2)
  stroke(255, 200)
  strokeWeight(2)
  for (let i = 0; i < 1000; i++) {
    const next = random(points)
    current.x = lerp(current.x, next.x, percent)
    current.y = lerp(current.y, next.y, percent)
    point(current.x, current.y)
  }
}