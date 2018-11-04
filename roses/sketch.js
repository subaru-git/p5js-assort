const resolution = 100
const pitch = 10
let cols
let rows
let roses = []
let angle = 0

function setup() {
  createCanvas(600, 600)
  cols = width / resolution
  rows = height / resolution
  for (let n = 0; n < cols; n++) {
    for (let d = 0; d < rows; d++) {
      const cx = n * resolution + resolution / 2
      const cy = d * resolution + resolution / 2
      roses.push(new Rose(cx, cy, resolution - pitch * 2, n / d))
    }
  }
}

function draw() {
  background(51)
  stroke(255, 100)
  strokeWeight(1)
  for (let i = 0; i < cols; i++) {
    const pos = i * resolution + resolution
    line(pos, 0, pos, height)
    line(0, pos, width, pos)
  }

  roses.forEach(rose => {
    rose.update(angle)
    rose.show()
  });
  angle += 0.01
}