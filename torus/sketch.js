
function setup() {
  createCanvas(800, 600, WEBGL)
  cSlider = createSlider(0, 100, 50)
  aSlider = createSlider(0, 100, 50)
}

function draw() {
  background(51)
  orbitControl();
  strokeWeight(2)
  const c = cSlider.value();
  const a = aSlider.value();
  for (let i = 0; i < TWO_PI; i += 0.1) {
    for (let j = 0; j < TWO_PI; j += 0.1) {
      const x = (c + (a * cos(i))) * cos(j)
      const y = (c + (a * cos(i))) * sin(j)
      const z = a * sin(i)

      const r = map(x, -100, 100, 0, 255);
      const g = map(y, -100, 100, 0, 255);
      const b = map(z, -100, 100, 0, 255);
      stroke(r, g, b)
      point(x, y, z)
    }
  }
}