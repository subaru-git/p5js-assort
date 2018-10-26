let angle = 0
const points = []

function setup() {
  createCanvas(800, 600, WEBGL)
  colorMode(HSB, 100)
}

function draw() {
  angle -= 0.5
  // background(51)
  orbitControl()
  noFill()
  // translate(width / 2, height / 2)
  const x = map(cos(angle), -1, 1, -100, 100)
  const y = map(sin(angle), -1, 1, -100, 100)
  const z = map(sin(random(TWO_PI)), -1, 1, -100, 100)
  push()
  stroke(z, z, 100)
  translate(x, y, z)
  sphere(4)
  pop()


  // points.push(createVector(x, y, z))
  // if (points.length > 200) {
  //   points.shift()
  // }
  // for (let i = points.length -1; i >= 0; i--) {
  //   stroke(i * 5, i * 5, 100)
  //   push()
  //   translate(points[i].x, points[i].y, points[i].z)
  //   sphere(4)
  //   pop()
  //   }
}