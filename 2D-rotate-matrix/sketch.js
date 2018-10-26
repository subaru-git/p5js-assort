let angle = 0

function setup() {
  createCanvas(800, 600)
}

// rect
const x = -200
const y = -100
const w = 400
const h = 200
const rect = [
  [x,     y    ],
  [x + w, y    ],
  [x + w, y + h],
  [x,     y + h]
]

function draw() {
  angle += 0.01
  background(100)
  fill(200)
  translate(width / 2, height / 2);
  beginShape()
  for (let i = 0; i < rect.length; i++) {
    const x = rect[i][0] * cos(angle) - rect[i][1] * sin(angle)
    const y = rect[i][0] * sin(angle) + rect[i][1] * cos(angle)
    vertex(x, y)
  }
  endShape()
}