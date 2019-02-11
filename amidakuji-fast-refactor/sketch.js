const resolutionWidth = 10;
const resolutionHeight = 4;
var cells = [];
const rate = 0.6;
var count = 0;

function createHorizontalLine() {
  for (var x = 0; x < width / resolutionWidth; x++) {
    for (var y = 0; y < height / resolutionHeight; y++) {
      if (cells[x][y].left || cells[x][y].right) continue;
      if (x - 1 >= 0 && random(1) > rate) {
        if (cells[x - 1][y].left === null) {
          cells[x][y].setLeft(cells[x - 1][y]);
          cells[x - 1][y].setRight(cells[x][y]);
        }
      } else if (x + 1 < width / resolutionWidth && random(1) > rate) {
        if (cells[x + 1][y].right === null) {
          cells[x][y].setRight(cells[x + 1][y]);
          cells[x + 1][y].setLeft(cells[x][y]);
        }
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(255);
  for (var x = 0; x < width / resolutionWidth; x++) {
    cells[x] = [];
    for (var y = 0; y < height / resolutionHeight; y++) {
      cells[x].push(new cell(x, y, resolutionWidth, resolutionHeight));
    }
  }
}

function trace(start, col) {
  var x = start;
  for (var y = 0; y < height / resolutionHeight; y++) {
    cells[x][y].trace(true, col);
    if (cells[x][y].left !== null) {
      cells[x][y].left.trace(false, col);
      x = cells[x][y].left.x;
    } else if (cells[x][y].right !== null) {
      cells[x][y].right.trace(false, col);
      x = cells[x][y].right.x;
    }
  }
  cells.flat().forEach(cell => {
    cell.draw();
    cell.untrace();
  });
}

function draw() {
  createHorizontalLine();
  for (var i = 0; i < width / resolutionWidth; i++) {
    const c = lerpColor(
      color(0, 0, 255, 100),
      color(255, 255, 255, 100),
      i / (width / resolutionWidth)
    );
    trace(i, c);
  }
  cells.flat().forEach(c => {
    c.initialize();
  });
  console.log(count++, frameRate());
  if (count > 100) {
    noLoop();
  }
}
