const points = []
const pointsCount = 2000;
const rate = 100;
const noiseOffset = 100;
let currentPoint = 0;
let t = 0;
let rotateRate = 0
let dir = 1


function setup() {
  createCanvas(800, 600)
  for (let i = 0; i < 5; i++) {
    points[i] = []
    for (let j = 0; j < pointsCount; j++) {
      const ang = map(j, 0, pointsCount, 0, TWO_PI)
      const rad = 200 + map(noise(j * 0.005 + (i * noiseOffset)), 0, 1, -15, 15)
      const x = rad * cos(ang)
      const y = rad * sin(ang)
      points[i].push(createVector(x, y))
    }
  }
}

function ease(start, end, duration) {
  return start + ((end - start) * duration)
}

function draw() {
  background(0)
  translate(width / 2, height / 2)

  const from = currentPoint;
  const to = (currentPoint + 1) % points.length
  rotate(rotateRate * TWO_PI)
  fill(200)
  beginShape()
  const x = ease(points[from][0].x, points[to][0].x, t / rate);
  const y = ease(points[from][0].y, points[to][0].y, t / rate);
  vertex(x, y);
  for (let i = 1; i < points[from].length; i++) {
    const x1 = ease(points[from][i].x, points[to][i].x, t / rate)
    const y1 = ease(points[from][i].y, points[to][i].y, t / rate)
    const x2 = ease(points[from][(i + 1) % points[from].length].x, points[to][(i + 1) % points[from].length].x, t / rate)
    const y2 = ease(points[from][(i + 1) % points[from].length].y, points[to][(i + 1) % points[from].length].y, t / rate)
    const x3 = ease(points[from][(i + 2) % points[from].length].x, points[to][(i + 2) % points[from].length].x, t / rate)
    const y3 = ease(points[from][(i + 2) % points[from].length].y, points[to][(i + 2) % points[from].length].y, t / rate)
    bezierVertex(x1, y1, x2, y2, x3, y3)
  }
  endShape(CLOSE)
  t += dir
  if (t > rate) {
    t = 0;
    currentPoint++
    if (currentPoint >= points.length) {
      currentPoint = 0
    }
  }
  rotateRate += 0.0003
}