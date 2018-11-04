let angle = 0
const resolution = 60;
const pitch = 10
const rate = 0.5
let curves = []
let cols
let rows

function setup() {
  createCanvas(600, 600)
  cols = width / resolution
  rows = height / resolution
  const w = resolution - pitch * 2
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const cx = resolution + x * resolution + resolution / 2
      const cy = resolution + y * resolution + resolution / 2
      curves.push(new Curve(cx, cy, w, x * rate + 1, y * rate + 1))
    }
  }
}

function draw() {
  background(51)
  drawHeading()
  curves.forEach(curve => {
    curve.update(angle)
    curve.show()
  })
  angle += 0.01
  if (angle > TWO_PI) {
    noLoop()
  }
}

function drawCircle(x, y, w, angle) {
    push()
    translate(x, y)
    noFill()
    stroke(255)
    strokeWeight(1)
    ellipse(0, 0, w, w)
    stroke(255)
    strokeWeight(4)
    point(w / 2 * cos(angle), w / 2 * sin(angle))
    pop()
}

function drawHeading() {
  const w = resolution - pitch * 2

  for (let x = 0; x < cols - 1; x++) {
    const cx = resolution + x * resolution + resolution / 2
    const cy = resolution / 2
    const na = angle * (x * rate + 1)
    drawCircle(cx, cy, w, na)
    stroke(255, 100)
    strokeWeight(1)
    const lx = resolution + x * resolution
    line(lx, 0, lx, height)
    stroke(0, 255, 255, 100)
    strokeWeight(1)
    const nx = w / 2 * cos(na) + resolution + x * resolution + resolution / 2
    line(nx, 0, nx, height)
  }
  for (let y = 0; y < rows - 1; y++) {
    const cx = resolution / 2
    const cy = resolution + y * resolution + resolution / 2
    const na = angle * (y * rate + 1)
    drawCircle(cx, cy, w, na)
    stroke(255, 100)
    strokeWeight(1)
    const ly = resolution + y * resolution
    line(0, ly, width, ly)
    stroke(255, 255, 0, 100)
    strokeWeight(1)
    const ny = w / 2 * sin(na) + resolution + y * resolution + resolution / 2
    line(0, ny, width, ny)
  }
}