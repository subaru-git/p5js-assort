const points = [];
const polygon = [];


function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  points.push(createVector(0, 0));
}

function draw() {
  background(200);

  strokeWeight(1);
  stroke(150);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);

  noFill();
  drawPolygon(width / 2, height / 2, 350, 6);
  drawPoint(width / 2, height / 2);

  // noLoop();
}

function drawPolygon(x, y, r, vertexNum) {
  push();
  translate(x, y);

  strokeWeight(2);
  stroke(100, 100, 155);
  beginShape();
  for (let i = 0; i < vertexNum; i++) {
    const px = r * cos(360 * i / vertexNum);
    const py = r * sin(360 * i / vertexNum);
    vertex(px, py);
    polygon.push(createVector(px, py));
  }
  endShape(CLOSE);

  pop();
}

function drawPoint(x, y) {
  push();
  translate(x, y);

  strokeWeight(1);
  stroke(200, 0, 0, 150);
  const p1 = random(polygon);
  const p2 = polygon[(polygon.indexOf(p1) + 1) % polygon.length];
  const current = points[points.length - 1];
  line(current.x, current.y, p1.x, p1.y);
  line(current.x, current.y, p2.x, p2.y);
  const center = createVector((current.x + p1.x + p2.x) / 3, (current.y + p1.y + p2.y) / 3);
  point(center.x, center.y);
  line(current.x, current.y, center.x, center.y);
  line(p1.x, p1.y, center.x, center.y);
  line(p2.x, p2.y, center.x, center.y);
  points.push(center);
  strokeWeight(4);
  stroke(200, 0, 0);
  points.forEach(p => point(p.x, p.y));

  pop();
}