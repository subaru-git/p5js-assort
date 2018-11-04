let current = []
let next = []
const resolution = 10;
let rows
let cols

function setup() {
  createCanvas(800, 600)
  rows = height / resolution
  cols = width / resolution
  for (let i = 0; i < rows; i++) {
    current[i] = []
    next[i] = []
    for (let j = 0; j < cols; j++) {
      current[i][j] = new Cell(j, i, resolution);
      next[i][j] = new Cell(j, i, resolution);
      if (random() < 0.1) {
        current[i][j].birth()
      }
    }
  }
}

function nextGeneration() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let neighbors = []
      for (let x = -1; x <= 1; x++){
        for (let y = -1; y <= 1; y++){
          const trow = i + y
          const tcol = j + x
          if ((0 <= trow && trow < rows) &&
              (0 <= tcol && tcol < cols) &&
              !(x === 0 && y === 0)) {
            neighbors.push(current[trow][tcol])
          }
        }
      }
      let count = 0
      neighbors.forEach(neighbor => {
        if (neighbor.survive) {
          count++
        }
      })

      if (!current[i][j].survive && count === 3) {
        next[i][j].birth()
      } else if (current[i][j].survive && (count < 2 || count > 3)) {
        next[i][j].die()
      } else {
        next[i][j] = current[i][j]
      }
    }
  }
}

function draw() {
  background(51)
  nextGeneration()
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      next[i][j].show();
    }
  }
  current = [...next]
}
