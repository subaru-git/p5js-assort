let angle = 0

function setup() {
  createCanvas(800, 600)
  colorMode(HSB, 255)
}

// projection
const projection = [
  [1, 0, 0],
  [0, 1, 0]
]

// rect
const x = -200
const y = -100
const w = 400
const h = 200
const z = 0
const rect = [
  [x,     y    , z],
  [x + w, y    , z],
  [x + w, y + h, z],
  [x,     y + h, z]
]

function draw() {
  angle += 0.01
  background(100)
  fill(255)
  translate(width / 2, height / 2);

  const n = [1, 1, 0]
  const rotatemat = [
    [cos(angle) + pow(n[0], 2)* (1 - cos(angle)),        n[0] * n[1] * (1 - cos(angle)) - n[2] * sin(angle), n[0] * n[2] * (1 - cos(angle)) + n[1] * sin(angle)],
    [n[1] * n[0] * (1 - cos(angle)) + n[2] * sin(angle), cos(angle) + pow(n[1], 2)* (1 - cos(angle)),        n[1] * n[2] * (1 - cos(angle)) - n[0] * sin(angle)],
    [n[2] * n[0] * (1 - cos(angle)) - n[1] * sin(angle), n[2] * n[1] * (1 - cos(angle)) + n[0] * sin(angle), cos(angle) + pow(n[2], 2)* (1 - cos(angle))       ]
  ]

  var projected = []
  for (var i = 0; i < rect.length; i++) {
    var rotated = matmulPoint(rotatemat, rect[i])
    // rotated = matmul(rotationX, rotated)
    // rotated = matmul(rotationZ, rotated)
    // rotated = matmul(negativetranslatemat, rotated)
    var projected2d = matmul(projection, rotated)
    projected[i] = projected2d
  }

  strokeWeight(1)
  beginShape()
  for (let i = 0; i < projected.length; i++) {
    vertex(projected[i][0], projected[i][1])
  }
  endShape()
  strokeWeight(4)
  point(n[0], n[1], n[2])
  fill(0)
}

function matmulPoint(a, b) {
  var m = [
    [b[0]],
    [b[1]],
    [b[2]]
  ]
  return matmul(a, m)
}
function matmul(a, b) {
  const colsA = a[0].length
  const rowsA = a.length
  const colsB = b[0].length
  const rowsB = b.length
  if (colsA != rowsB) {
    console.log("Columns of A must match rows of B")
    return null;
  }

  var result = []
  for (var i = 0; i < rowsA; i++) {
    result[i] = []
    for (var j = 0; j < colsB; j++) {
      var sum = 0;
      for (var k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j]
      }
      result[i][j] = sum
    }
  }
  return result
}