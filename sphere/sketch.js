
function setup() {
  createCanvas(800, 600, WEBGL)
}

function draw() {
  background(51)
  orbitControl();
  strokeWeight(2)
  for (let i = 0; i < TWO_PI; i += 0.1) {
    for (let j = 0; j < TWO_PI; j += 0.1) {
      const x = map(cos(i) * sin(j), -1, 1, -100, 100)
      const y = map(sin(i) * sin(j), -1, 1, -100, 100)
      const z = map(cos(j), -1, 1, -100, 100)
      const r = map(x, -100, 100, 0, 255);
      const g = map(y, -100, 100, 0, 255);
      const b = map(z, -100, 100, 0, 255);
      stroke(r, g, b)
      point(x, y, z)
    }
  }
}