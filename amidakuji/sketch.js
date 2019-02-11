const resolutionWidth = 20;
const resolutionHeight = 4;
var cells = [];
const rate = 0.7;
var count = 0;

function createHorizontialLine() {
  cells.forEach(cell => {
    if (cell.left === null && cell.right === null) {
      if (cell.x - 1 >= 0 && random(1) > rate) {
        const neighbor = cells.find(c => c.x === cell.x - 1 && c.y === cell.y);
        if (neighbor.left === null) {
          cell.setLeft(neighbor);
          neighbor.setRight(cell);
        }
      } else if (cell.x + 1 < width / resolutionWidth && random(1) > rate) {
        const neighbor = cells.find(c => c.x === cell.x + 1 && c.y === cell.y);
        if (neighbor.right === null) {
          cell.setRight(neighbor);
          neighbor.setLeft(cell);
        }
      }
    }
  });
}

function setup() {
  createCanvas(400, 400);
  background(57);
  for (var y = 0; y < height / resolutionHeight; y++) {
    for (var x = 0; x < width / resolutionWidth; x++) {
      cells.push(new cell(x, y, resolutionWidth, resolutionHeight));
    }
  }
}

function trace(start, col) {
  var x = start;
  for (var y = 0; y < height / resolutionHeight; y++) {
    const current = cells.find(c => c.y === y && c.x === x);
    current.trace(true, col);
    if (current.left !== null) {
      current.left.trace(false, col);
      x = current.left.x;
    } else if (current.right !== null) {
      current.right.trace(false, col);
      x = current.right.x;
    }
  }
  cells.forEach(cell => {
    cell.draw();
    cell.untrace();
  });
}

function draw() {
  createHorizontialLine();
  for (var i = 0; i < width / resolutionWidth; i++) {
    const c = lerpColor(
      color(255, 0, 0, 20),
      color(0, 255, 255, 20),
      i / (width / resolutionWidth)
    );
    trace(i, c);
  }
  cells.forEach(c => {
    c.initialize();
  });
  console.log(count++, frameRate());
  if (count > 100) {
    noLoop();
  }
}
