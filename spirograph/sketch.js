const R = 250
const r = 51
const p = 200
let angle = 0
let points = []

function setup() {
  createCanvas(1000, 1000)
}

function draw() {
  background(51)
  translate(width / 2, height / 2)
  stroke(255, 100)
  strokeWeight(1)
  noFill()
  line(0, - height / 2, 0, height / 2)
  line(- width / 2, 0, width / 2, 0)
  stroke(255)
  noFill()
  ellipse(0, 0, R * 2, R * 2)
  const xc = (R - r)* cos(-angle)
  const yc = (R - r)* sin(-angle)
  push()
  translate(xc, yc)
  stroke(255)
  strokeWeight(1)
  noFill()
  ellipse(0, 0, r * 2, r * 2)
  const td = (R - r) * angle / r
  const xd = xc + p * cos(td)
  const yd = yc + p * sin(td)
  points.push(createVector(xd, yd))
  pop()
  stroke(255, 0, 0)
  strokeWeight(4)
  points.forEach(p => {
    point(p.x, p.y)
  })
  angle += 0.01
  if (points.length > 10000) {
    points.shift()
  }
}