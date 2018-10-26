let angle = 0

function setup() {
  createCanvas(800, 600)
}

function draw() {
  angle += 0.01
  background(100)
  fill(200)
  translate(width / 2, height / 2);
  rotate(angle);
  rect(-200, -100, 400, 200);
}